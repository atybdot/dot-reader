import BreadcrumbBar from "@/components/bread-crumb-bar";

"use client";
import AddNewBook from "@/components/blocks/add-book";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function Page() {
  return (
    <section className=" min-h-svh grid grid-rows-[auto_1fr] w-full">
      <BreadcrumbBar />
      <div className="w-1/3 m-auto"></div>
    </section>
  );
}
