"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Info } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { DropzoneOptions } from "react-dropzone";
import { PartialMetadata } from "@/types/metadata";
import { CredenzaClose, CredenzaFooter } from "@/components/ui/vaul";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { uploadData } from "@/actions/upload";

export const formSchema = z.object({
  cover: z.string(),
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.string(),
  identifiers: z.array(z.string().min(1)).nonempty("specify identifier"),
  totalPages: z.number(),
  language: z.string().min(1),
});

export default function UploadForm({
  file,
  metadata,
  ref,
}: {
  file: File;
  metadata: PartialMetadata;
  ref: React.Ref<HTMLFormElement>;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [previewURL, setURL] = useState("");

  const dropZoneConfig = {
    maxSize: 1024 * 1024 * 4,
    multiple: false,
    accept: {
      "image/*": ["png", "jpg", "jpeg", "webp"],
    },
  } satisfies DropzoneOptions;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: metadata.title,
      author: metadata.author,
      year: metadata.year,
      cover: metadata.coverUrl,
      language: metadata.language,
      identifiers: metadata.identifiers,
      totalPages: 120,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const cover = await (await fetch(previewURL)).blob();
      await uploadData({
        book: file,
        coverBlob: cover,
        metadata: {
          ...values,
          publisher: metadata.publisher,
          rights: metadata.rights,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    setURL(metadata.coverUrl);
  }, []);
  return (
    <Form {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto text-foreground"
      >
        <FormField
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(e) => {
                    if (e) {
                      if (e.length > 0) {
                        const url = URL.createObjectURL(e[0]);
                        setURL(url);
                      } else {
                        setURL(metadata.coverUrl);
                      }
                    }
                    setFiles(e);
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    {...field}
                    id="fileInput"
                    className="outline-dashed outline-1 outline-muted-foreground/50"
                  >
                    {(files && files.length > 0 && previewURL.length > 0) ||
                    metadata.coverUrl ? (
                      <img
                        className="aspect-video w-10/12 mx-auto p-3 object-contain "
                        src={previewURL}
                      />
                    ) : (
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className=" w-10 h-10" />
                        <p className="mb-1 text-sm ">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs ">
                          {dropZoneConfig.accept["image/*"].join(" , ")}
                        </p>
                      </div>
                    )}
                  </FileInput>
                  <FileUploaderContent className="flex-wrap">
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem
                          removeFile={() => setFiles([])}
                          key={i}
                          index={i}
                        >
                          <span className="break-all w-[200px] md:w-full truncate h-fit py-2">
                            {file.name}
                          </span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title"
                      type="text"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhone doe"
                      type=""
                      {...field}
                      disabled
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2012"
                      type="number"
                      disabled
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="identifiers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>identifier</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="-----"
                      disabled
                      type="text"
                      className="truncate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="totalPages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pages</FormLabel>
                  <FormControl>
                    <Input placeholder="0" disabled type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>language</FormLabel>
                  <FormControl>
                    <Input placeholder="en" disabled type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <CredenzaFooter>
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

          <Button
            tabIndex={1}
            type="submit"
            size={"sm"}
            className={cn(
              "cursor-pointer min-w-[6cw]",
              form.formState.isSubmitSuccessful
                ? "bg-green-500 text-foreground"
                : ""
            )}
            // disabled={
            //   form.formState.isSubmitting || form.formState.isSubmitSuccessful
            // }
          >
            {form.formState.isSubmitting ? (
              <Spinner className="bg-secondary" size={"sm"} />
            ) : form.formState.isSubmitSuccessful ? (
              <p>Successful</p>
            ) : (
              <p>Upload</p>
            )}
          </Button>
        </CredenzaFooter>
      </form>
    </Form>
  );
}
