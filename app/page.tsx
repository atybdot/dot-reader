import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-content-center min-h-svh w-full gap-2">
      <p className="text-center">Home</p>
      <Button asChild size={"sm"}>
        <Link href={"/library"}> go to library</Link>
      </Button>
    </div>
  );
}
