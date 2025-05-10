"use client";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <header
      className={`top-0 left-0 right-0 z-50 bg-muted backdrop-blur-sm transition-transform duration-300 border-b w-full`}
    >
      <div className="flex items-center justify-between w-full px-8 py-1">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg">dot-reader</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          <Suspense fallback={<div>loading...</div>}>
            <SignedOut>
              <Button asChild size={"sm"}>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
