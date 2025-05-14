import { NuqsAdapter } from "nuqs/adapters/next/app";
function UrlStateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

export default UrlStateProvider;
