"use client";

import { useCallback, useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button, Card, CardContent } from "@/components/index";
import { IS3File } from "@linklist/_interfaces/file.interface";
import { UploaderFilesList } from "./uploader-files-list";

export const Uploader = () => {
  const [files, setFiles] = useState<Array<IS3File>>([]);

  const uploadFile = async (file: File) => {
    setFiles((prevFiles) => prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f)));

    try {
      // 1. Get presigned URL ==> our API route
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");

        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.file === file ? { ...f, uploading: false, progress: 0, error: true } : f)),
        );

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();
      console.log("Presigned URL:", presignedUrl, "Key:", key);

      // 2. Upload file to S3
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setFiles((prevFiles) =>
              prevFiles.map((f) => (f.file === file ? { ...f, progress: Math.round(percentComplete), key: key } : f)),
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            // 3. File fully uploaded - set progress to 100
            const fileUrl = presignedUrl.split("?")[0];

            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === file ? { ...f, progress: 100, uploading: false, error: false, fileUrl } : f,
              ),
            );

            toast.success("File uploaded successfully");
            console.log("file", file.name, "uploaded to S3 with key:", key);
            console.log("link to access:", fileUrl, "todo: save this to database");

            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = (error) => {
          console.log(error);
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);

      // Set errors to state
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, uploading: false, progress: 0, error: true } : f)),
      );
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({
          id: uuidv4(),
          file,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);

      console.log("uploadFiles", acceptedFiles);
      acceptedFiles.forEach(uploadFile);
    }
  };

  const onDropRejected = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      // todo: handle multiple errors!
      console.log("onDropRejected");
      fileRejection.forEach((rej) => console.log(rej.errors));

      // not the best way to handle it, but works
      const toomanyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files");
      const fileSizetoBig = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large");

      if (toomanyFiles) toast.error("Too many files selected, max is 5");
      if (fileSizetoBig) toast.error("File size exceeds 5mb limit");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5, // 5mb todo: make configurable, move to common
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      files.forEach((file) => {
        if (file.objectUrl) {
          URL.revokeObjectURL(file.objectUrl);
        }
      });
    };
  }, [files]);

  return (
    <>
      <Card
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
          isDragActive ? "border-primary bg-primary/10 border-solid" : "border-border hover:border-primary",
        )}
      >
        <CardContent className="flex items-center justify-center h-full w-full">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center">Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center gap-y-3">
              <p>Drag 'n' drop some files here, or click to select files</p>
              <Button>Select Files</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {files.length > 0 && <UploaderFilesList files={files} />}
    </>
  );
};
