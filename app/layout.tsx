import Providers from "@/components/resuseable/Provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster position="top-center" />

          {children}
        </Providers>
      </body>
    </html>
  );
}
