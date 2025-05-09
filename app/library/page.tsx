/* eslint-disable @next/next/no-img-element */
import NewBookSkeleton from "@/components/blocks/add-book";
export default function Page() {
  return (
    <section className="grid grid-rows-[1fr_auto] min-h-svh gap-4">
      <div className="bg-primary w-full min-h-[90svh] md:min-h-[60svh]">
        hello
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
        <NewBookSkeleton />
      </div>
    </section>
  );
}
