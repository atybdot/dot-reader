"use client";
import BreadcrumbBar from "@/components/bread-crumb-bar";
export default function Page() {
  return (
    <section className=" min-h-svh grid grid-rows-[auto_1fr] w-full">
      <BreadcrumbBar />
      <div className="w-1/3 m-auto"></div>
    </section>
  );
}
