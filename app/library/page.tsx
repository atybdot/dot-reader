/* eslint-disable @next/next/no-img-element */
"use client";
import { uploadDialogAtom } from "@/atoms/upload-dialog.atom";
import AddNewBook from "@/components/blocks/add-book";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSetAtom } from "jotai";
export default function Page() {
  const openDialog = useSetAtom(uploadDialogAtom);
  return (
    <section className="grid grid-rows-[1fr_auto] min-h-svh gap-4">
      <div className="bg-primary w-full min-h-[90svh] md:min-h-[60svh] flex items-center justify-center">
        <Button variant={"secondary"} onClick={() => openDialog(true)}>
          Open Dialog
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row min-h-9/12 gap-2">
        {Array(0)
          .fill("_")
          .map((item, idx) => (
            <img
              alt="lorem image"
              src={`https://picsum.photos/400/600.webp?random=${idx}`}
              key={idx}
              className="font-mono h-full object-contain bg-muted w-full"
            />
          ))}
        <AddNewBook />
      </div>
    </section>
  );
}
