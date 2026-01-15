"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <nav className="w-full max-w-[1000px] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 pl-3 flex items-center justify-between transition-all">
        
        {/* Left: Brand */}
        <Link href="/home" className="flex items-center gap-2 pr-4">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="translate-y-[1px]">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 hidden sm:block">CareerPath</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/methodology">Methodology</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
            <div className="hidden md:block w-px h-5 bg-slate-200 mx-1" />
            
            {/* Point to SignUp Page */}
            <Link href="/signup">
                <Button className="h-9 px-5 text-[13px] bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm transition-all hover:shadow-md">
                    Get Started
                </Button>
            </Link>
        </div>

      </nav>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href}>
            <Button variant="ghost" className="h-8 px-4 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                {children}
            </Button>
        </Link>
    )
}