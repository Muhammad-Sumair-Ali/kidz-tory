"use client"
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

export default function LogoIcon() {
  return (
    <>
    <Link href={"/"}>
      <div className="flex items-center gap-1 select-none">
        <BookOpenCheck className="w-7 h-7 text-indigo-600 -mb-1.5" />
        <span className="text-2xl font-extrabold text-indigo-700 tracking-wide">
          Kidztory
        </span>
      </div>
    </Link>
    </>
  );
}
