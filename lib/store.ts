import { filesAtom } from "@/atoms/files.atom";
import { createStore } from "jotai";

export const fileStore = createStore()
fileStore.set(filesAtom,[])