"use client";
import { CloudUploadIcon } from "lucide-react";

import { useAtom, useSetAtom } from "jotai";
import { uploadDialogAtom } from "@/atoms/upload-dialog.atom";

import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { DropzoneOptions } from "react-dropzone";
import { filesAtom } from "@/atoms/files.atom";

export default function Component() {
  const openUploadDialog = useSetAtom(uploadDialogAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const dropZoneConfig = {
    accept: {
      "application/epub+zip": [".epub"],
    },
    maxSize: 1024 * 1024 * 50,
    multiple: false,
    onDropAccepted(files, event) {
      console.log(files);
    },
  } satisfies DropzoneOptions;
  return (
    <FileUploader
      value={files}
      onValueChange={(e) => {
        setFiles(e);
        openUploadDialog(true);
      }}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-muted rounded-lg p-2 text-muted-foreground"
    >
      <FileInput
        id="fileInput"
        className="outline-dashed outline-1 outline-foreground/50"
      >
        <div className="flex items-center justify-center flex-col p-8 w-full ">
          <CloudUploadIcon className="text-gray-500 w-10 h-10" />
          <p className="mb-1 text-sm ">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs ">
            {dropZoneConfig.accept["application/epub+zip"]
              .join(" , ")
              .replaceAll(".", "")}
          </p>
        </div>
      </FileInput>
    </FileUploader>
  );
}
Component.displayName = "AddBook";
