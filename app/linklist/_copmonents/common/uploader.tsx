"use client";

import { useCallback, useState, useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button, Card, CardContent } from "@/components/index";

export const Uploader = () => {
  const [files, setFiles] = useState<
    Array<{
      id: string;
      file: File;
      uploading: boolean;
      progress: number;
      key?: string;
      isDeleting: boolean;
      error: boolean;
      objectUrl?: string;
    }>
  >([]);

  const removeFile = (fileId: string) => {
    console.log("removeFile", fileId);
  };

  const uploadFile = async (file: File) => {
    setFiles((prevFiles) => prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f)));

    try {
      // 1. Get presigned URL
      console.log(files);
      // 2. Upload file to S3
    } catch {
      toast.error("Something went wrong");
      // Set erorrs to state
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

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const toomanyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files");

      const fileSizetoBig = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large");

      if (toomanyFiles) toast.error("Too many files selected, max is 5");

      if (fileSizetoBig) toast.error("File size exceeds 5mb limit");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
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

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {files.map(({ id, file, uploading, progress, isDeleting, error, objectUrl }) => {
            return (
              <div key={id} className="flex flex-col gap-1">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={objectUrl} alt={file.name} className="w-full h-full object-cover" />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile(id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                  {uploading && !isDeleting && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white font-medium text-lg">{progress}%</div>
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                      <div className="text-white font-medium">Error</div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate px-1">{file.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
