import Providers from "@/components/resuseable/Provider";
import "./globals.css"
import Navbar from "@/components/common/Navbar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}