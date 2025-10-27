import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/index";
import { IS3File } from "@linklist/_interfaces/file.interface";

export const UploaderFilesList = ({ files }: { files: Array<IS3File> }) => {
  const removeFile = (fileId: string) => {
    console.log("removeFile", fileId);
  };

  return (
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
  );
};
