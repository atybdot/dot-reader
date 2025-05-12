"use client";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
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
import { filesAtom } from "@/atoms/files.atom";
import UploadForm from "./blocks/uploadForm";
import { extractMetadata } from "@/utils/extractMetadata";

import UploadFormSkeleton from "./skeletons/upload-form.skeleton";
import { Skeleton } from "./ui/skeleton";
import { PartialMetadata } from "@/types/metadata";

function UploadDialog() {
  const [open, setOpen] = useAtom(uploadDialogAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>();
  const [mtd, setMtd] = useState<PartialMetadata>();

  useEffect(() => {
    (async function () {
      if (files) {
        if (files.length > 0) {
          setLoading(true);
          const mtd = await extractMetadata(files[0]);
          setMtd(mtd);
          setLoading(false);
          console.log(mtd);
        }
      }
    })();
    () => {
      setFiles(null);
    };
  }, [files]);

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
          {!loading ? (
            mtd && <UploadForm ref={formRef} metadata={mtd} />
          ) : (
            <UploadFormSkeleton />
          )}
        </CredenzaBody>
        <CredenzaFooter>
          {!loading ? (
            <CredenzaClose asChild>
              <Button
                onClick={() => {}}
                variant={"destructive"}
                size={"sm"}
                className="cursor-pointer opacity-50 hover:opacity-90 transition-all ease-in-out duration-150"
              >
                <p>Cancel</p>
              </Button>
            </CredenzaClose>
          ) : (
            <Skeleton className="w-3/12 h-10" />
          )}
          {!loading ? (
            <Button
              tabIndex={1}
              type="submit"
              size={"sm"}
              className="cursor-pointer"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <p>Upload</p>
            </Button>
          ) : (
            <Skeleton className="w-3/12 h-10" />
          )}
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

export default UploadDialog;
