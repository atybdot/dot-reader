"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LaptopMinimalIcon} from "lucide-react"
import { SunIcon } from "@/components/ui/icons/sun"
import { MoonIcon } from "@/components/ui/icons/moon"
export function ThemeSwitcher() {
  const { theme, setTheme, themes} = useTheme()
  const [idx, setIdx] = React.useState(0);
  const active = "bg-foreground text-background hover:bg-foreground/80";
  const icon = theme === "system" ? <LaptopMinimalIcon/> : theme === "dark" ? <MoonIcon/> : <SunIcon/>
  return (
          <Button
            size={"icon"}
            type="button"
            data-theme-value={theme}
            variant={"outline"}
            className={cn(themes[idx]===theme ? active : null)}
            onClick={() => {
              console.log(idx,themes[idx])
              if (idx < themes.length - 1){
                setIdx((p)=>p+1)
              } else {
                setIdx(0)
              }
                setTheme(themes[idx])
            }}
          >
            {icon}
          </Button>
  );
}
