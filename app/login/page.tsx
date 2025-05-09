"use client"

import { authAtom } from "@/atoms/tmp.auth.atom"
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page(){
  const setLogin = useSetAtom(authAtom)
  const router = useRouter()
  useEffect(()=>{
    setLogin(true)
    router.replace("/")
  },[])
  return <div></div>
}
