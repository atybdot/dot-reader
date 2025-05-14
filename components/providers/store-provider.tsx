import { fileStore } from "@/lib/store";
import { Provider } from "jotai";
import React from "react";

function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={fileStore}>{children}</Provider>;
}

export default StoreProvider;
