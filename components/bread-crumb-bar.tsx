"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useUrlPath } from "@/hooks/use-url-path";
import { BookPlusIcon } from "lucide-react";
import { Button } from "./ui/button";

function BreadcrumbBar() {
  const { pathFragments } = useUrlPath();
  return (
    <div className="py-2 mt-3 px-4 flex justify-between items-center">
      <Breadcrumb className="font-mono">
        <BreadcrumbList>
          {pathFragments.map((path, idx) => {
            return (
              <>
                <BreadcrumbItem key={idx + path.name}>
                  <BreadcrumbLink
                    href={path.href}
                    className={
                      idx === pathFragments.length - 1
                        ? "text-foreground underline underline-offset-4"
                        : ""
                    }
                  >
                    {path.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!(idx >= pathFragments.length - 1) ? (
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                ) : null}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Button className="inline-flex gap-x-2 h-fit py-1" size={"sm"}>
        <BookPlusIcon className="" />
        <p>New Book</p>
      </Button>
    </div>
  );
}

export default BreadcrumbBar;
