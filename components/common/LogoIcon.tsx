// components/LogoIcon.tsx
import { BookOpenCheck } from "lucide-react";

export default function LogoIcon() {
  return (
    <div className="flex items-center gap-2 select-none">
      <BookOpenCheck className="w-7 h-7 text-indigo-600" />
      <span className="text-2xl font-extrabold text-indigo-700 tracking-wide">
        Kidztory
      </span>
    </div>
  );
}
