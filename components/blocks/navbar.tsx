"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "./theme-switcher";
import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/tmp.auth.atom";
// import VaulDrawer from "./drawer"
// import { useAtom } from "jotai"
// import { drawerAtom } from "@/atoms/drawer.atom"

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName = "User" }: NavbarProps) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const isLoggedIn = useAtomValue(authAtom);
  const [visible, setVisible] = useState(true);
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollThreshold = 10; // Minimum scroll amount to trigger navbar visibility change

      // Determine if we should show or hide the navbar
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const hasScrolledPastThreshold =
        Math.abs(prevScrollPos - currentScrollPos) > scrollThreshold;

      if (hasScrolledPastThreshold) {
        setVisible(isScrollingUp);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      // className={`top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-transform duration-300 border-b w-full ${
      //   visible ? "fixed translate-y-0" : "-translate-y-full"
      // }`}
      className={`top-0 left-0 right-0 z-50 bg-muted backdrop-blur-sm transition-transform duration-300 border-b w-full`}
    >
      <div className="flex items-center justify-between w-full px-8 py-1">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className=" font-mono text-lg font-light">dot-reader</span>
        </Link>
        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <ThemeSwitcher />

          {/* User authentication */}
          {isLoggedIn ? (
            <Avatar className="rounded">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                alt={userName}
              />
              <AvatarFallback>
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="default" size={"sm"} asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Mobile menu trigger */}
          {/* <div className="md:hidden">
          <VaulDrawer/>
          </div> */}
        </div>
      </div>
    </header>
  );
}
