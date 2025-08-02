
import Navbar from "@/components/common/Navbar";
import React from "react";

export default function UserPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}