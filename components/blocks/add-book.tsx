"use client";
import {
  AlertCircleIcon,
  BookPlusIcon,
  FileUpIcon,
  PaperclipIcon,
  PlusCircleIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

export default function Component() {
  const maxSize = 10 * 1024 * 1024; // 10MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: "image/*",
  });

  const file = files[0];
  return (
    <div className="min-h-[400px] bg-muted rounded border-dashed border-2">
      <div className="flex flex-col gap-2 my-auto h-full justify-center">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className={cn(
            "hover:bg-accent data-[dragging=true]:bg-accent has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center h-full p-4 transition-colors has-disabled:pointer-events-none has-disabled:hidden has-[input:focus]:ring-[3px]",
            "cursor-pointer has-disabled:cursor-not-allowed text-muted-foreground"
          )}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={Boolean(file)}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <PlusCircleIcon className="size-9 stroke-[1.2] mb-1" />
            <p className="mb-1.5 text-sm font-medium">New Book</p>
            <p className="text-muted-foreground text-xs">
              Drag & drop or click to browse
            </p>
            <p className="ext-muted-foreground text-xs">
              max. {formatBytes(maxSize)}
            </p>
          </div>
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        {/* File list */}
        {file && (
          <div className="space-y-2 h-full text-muted-foreground">
            <div
              key={file.id}
              className="flex items-center flex-col gap-2 px-4 py-2 justify-center h-full"
            >
              <BookPlusIcon
                className="stroke-[1.5] size-12 shrink-0 opacity-60"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm text-center hyphens-auto break-all px-4 font-medium">
                  {file.file.name}
                </p>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <Button
                  size="sm"
                  className="rounded-sm text-sm px-3 py-1 flex items-center justify-center gap-1 text-destructive-foreground/80 cursor-pointer"
                  aria-label="Remove file"
                >
                  <FileUpIcon className="size-4" />
                  <p>Upload</p>
                </Button>
                <Button
                  size="sm"
                  variant={"destructive"}
                  className="rounded-sm text-sm px-3 py-1 flex items-center justify-center gap-1 text-destructive-foreground/80 cursor-pointer"
                  onClick={() => removeFile(files[0]?.id)}
                  aria-label="Remove file"
                >
                  <Trash2Icon className="size-4" />
                  <p>Remove</p>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
Component.displayName = "AddBook";
