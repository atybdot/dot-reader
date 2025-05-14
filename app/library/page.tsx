"use client";
import AddNewBook from "@/components/blocks/add-book";

import { Button } from "@/components/ui/button";
import { logBucks } from "@/actions/upload";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function Page() {
  const [file, setFile] = useState<File>();
  return (
    <section className=" min-h-svh flex items-center justify-center">
      <div className="w-1/3 m-auto">
        <AddNewBook />
      </div>
    </section>
  );
}
