"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react"
export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const active = "bg-foreground text-background hover:bg-foreground/80";
  return (
    <div className="flex items-center rounded-xs w-fit border border-foreground/10">
      {themes.map((val: string, idx: number) => {
        const icon = val === "system" ? <LaptopMinimalIcon className="size-3" /> : val === "dark" ? <MoonIcon className="size-3" /> : <SunIcon className="size-3" />

        return (
          <Button
            key={idx + val}
            size={"icon"}
            type="button"
            data-theme-value={val}
            className={cn(
              val === theme ? active : null
            )}
            onClick={() => {
              setTheme(val);
            }}
          >
            {icon}
          </Button>
        );
      })}
    </div>
  );
}
