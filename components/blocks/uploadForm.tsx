"use client";
import React, { useState } from "react";
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
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { DropzoneOptions } from "react-dropzone";

const formSchema = z.object({
  cover: z.string(),
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number(),
  isbn: z.string().min(1),
  pages: z.number(),
  language: z.string().min(1),
});

export default function UploadForm({
  file,
  ref,
}: {
  file: File;
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
      title: file?.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto text-muted-foreground"
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
                    {files && files.length > 0 && previewURL.length > 0 ? (
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
              <FormDescription>Cover for the book</FormDescription>
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
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>identifier</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="-----"
                      disabled
                      type="text"
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
              name="pages"
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
      </form>
    </Form>
  );
}
