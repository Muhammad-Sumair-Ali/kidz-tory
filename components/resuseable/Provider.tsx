"use client";
import { AuthProvider } from "@/context/useAuth";
import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        <AuthProvider>
       {children}
        </AuthProvider>
      </SessionProvider>
  );
}