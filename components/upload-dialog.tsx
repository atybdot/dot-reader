"use client";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/vaul";
import { Button } from "./ui/button";
import { uploadDialogAtom } from "@/atoms/upload-dialog.atom";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { filesAtom } from "@/atoms/files.atom";
import UploadForm from "./blocks/uploadForm";

function UploadDialog() {
  const [open, setOpen] = useAtom(uploadDialogAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Credenza
      open={files && files.length > 0 ? open : false}
      // open={open}
      onOpenChange={(open) => {
        setFiles([]);
        setOpen(open);
      }}
    >
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add New book</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody
          asChild
          className="min-h-44 overflow-scroll sm:overflow-auto"
        >
          {files && <UploadForm file={files[0]} ref={formRef} />}
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            type="submit"
            size={"sm"}
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => formRef.current?.requestSubmit()}
          >
            <UploadIcon className="opacity-80" />
            <p>Upload</p>
          </Button>
          <CredenzaClose asChild>
            <Button
              onClick={() => {}}
              variant={"destructive"}
              size={"sm"}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trash2Icon className="opacity-80" />
              <p>Cancel</p>
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

export default UploadDialog;
