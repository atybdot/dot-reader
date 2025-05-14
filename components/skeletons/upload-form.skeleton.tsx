import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function UploadFormSkeleton() {
  return (
    <div className="w-full h-full space-y-4 max-w-3xl mx-auto">
      <Skeleton className=" outline-muted-foreground/50 aspect-video w-full" />

      <div className="grid grid-cols-12 gap-4 h-10">
        <Skeleton className="col-span-full" />
      </div>

      <div className="grid grid-cols-12 gap-4 h-10">
        <Skeleton className="col-span-6" />
        <Skeleton className="col-span-6" />
      </div>

      <div className="grid grid-cols-12 gap-4 h-10">
        <Skeleton className="col-span-4" />
        <Skeleton className="col-span-4" />
        <Skeleton className="col-span-4" />
      </div>
    </div>
  );
}

export default UploadFormSkeleton;
