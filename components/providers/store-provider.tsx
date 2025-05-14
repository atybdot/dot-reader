import { store } from "@/lib/store";
import { Provider } from "jotai";
import React from "react";

function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
