import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/trpcClient";
export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
