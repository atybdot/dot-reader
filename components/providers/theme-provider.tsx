"use client"
import {ThemeProvider} from "next-themes"
export default function Theme({children}:Readonly<{
  children: React.ReactNode;
}>){
  return <ThemeProvider defaultTheme="dark" enableSystem={true}>
    {children}
  </ThemeProvider>
}
