"use client";
import { AuthProvider } from "@/context/useAuth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../provider/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
