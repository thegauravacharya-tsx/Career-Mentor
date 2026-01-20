"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <nav className="w-full max-w-[1200px] bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 pl-4 flex items-center justify-between transition-all">
        
        {/* Left: Brand */}
        <Link href="/home" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"/></svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 hidden sm:block">CareerPath</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NavLink href="/methodology">Methodology</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
            
            {isLoading ? (
               <div className="w-20 h-9 bg-slate-100 rounded-lg animate-pulse" />
            ) : session ? (
              // --- AUTHENTICATED STATE ---
              // FIX: Removed Dropdown, kept only Dashboard Button
              <Link href="/dashboard">
                  <Button className="h-9 px-4 text-[13px] bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm cursor-pointer">
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                      Dashboard
                  </Button>
              </Link>
            ) : (
              // --- GUEST STATE ---
              <>
                <div className="hidden md:block w-px h-5 bg-slate-200 mx-1" />
                <Link href="/login">
                    <Button variant="ghost" className="h-9 px-4 text-[13px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="h-9 px-4 text-[13px] bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm cursor-pointer">
                        Get Started
                    </Button>
                </Link>
              </>
            )}
        </div>

      </nav>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href}>
            <Button variant="ghost" className="h-8 px-4 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer">
                {children}
            </Button>
        </Link>
    )
}