import Theme from "./theme-provider";
import UrlStateProvider from "./url-state-provider";
import AuthProvider from "./auth-provider";
import StoreProvider from "./store-provider";
import QueryProvider from "./query-provider";
function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <QueryProvider>
        <UrlStateProvider>
          <StoreProvider>
            <Theme>{children}</Theme>
          </StoreProvider>
        </UrlStateProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default Providers;
