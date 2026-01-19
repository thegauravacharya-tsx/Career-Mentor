import Link from "next/link";
import { Star } from "lucide-react";

export function UpgradeBtn() {
  return (
    <Link href="/pricing" className="block w-full group">
      <div className="flex items-center gap-3 bg-[#FFC857] hover:bg-[#FFD275] transition-all p-1.5 pr-6 rounded-full shadow-[0_4px_20px_rgba(255,200,87,0.2)] cursor-pointer">
        
        {/* Dark Circle with Star */}
        <div className="w-10 h-10 bg-[#1A202C] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Star className="w-5 h-5 text-[#FFC857] fill-current" />
        </div>

        {/* Text */}
        <span className="font-bold text-[#1A202C] text-sm tracking-tight">
          Upgrade to Pro
        </span>
        
      </div>
    </Link>
  );
}