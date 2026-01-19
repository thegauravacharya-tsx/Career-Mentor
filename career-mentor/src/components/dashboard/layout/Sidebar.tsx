"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  History, 
  UserCircle, 
  Sparkles, 
  LogOut,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function Sidebar({ userId }: { userId: string }) {
  const pathname = usePathname();
  const [hasSavedItems, setHasSavedItems] = useState(false);

  // Check if user has saved items to conditionally render the Saved link
  useEffect(() => {
    fetch('/api/user/sidebar-stats')
      .then(res => res.json())
      .then(data => setHasSavedItems(data.hasSavedItems))
      .catch(err => console.error(err));
  }, []);

  return (
    <aside className="w-[280px] bg-[#111111] text-white flex flex-col h-screen fixed left-0 top-0 z-40 p-6 border-r border-white/5 font-sans">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Sparkles className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="font-bold text-xl tracking-tight">CareerPath</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        
        {/* Dashboard */}
        <Link href={`/dashboard/${userId}`}>
            <div className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
            pathname === `/dashboard/${userId}` ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}>
            <LayoutDashboard className={cn("w-5 h-5", pathname === `/dashboard/${userId}` ? "text-blue-400" : "text-slate-500 group-hover:text-white")} />
            <span className="text-[15px]">Dashboard</span>
            </div>
        </Link>

        {/* History */}
        <Link href="/dashboard/history">
            <div className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
            pathname === "/dashboard/history" ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}>
            <History className={cn("w-5 h-5", pathname === "/dashboard/history" ? "text-blue-400" : "text-slate-500 group-hover:text-white")} />
            <span className="text-[15px]">Assessment History</span>
            </div>
        </Link>

        {/* Saved Items (Conditional) */}
        {hasSavedItems && (
            <Link href="/dashboard/saved">
                <div className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
                pathname === "/dashboard/saved" ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}>
                <Bookmark className={cn("w-5 h-5", pathname === "/dashboard/saved" ? "text-blue-400" : "text-slate-500 group-hover:text-white")} />
                <span className="text-[15px]">Saved Assessments</span>
                </div>
            </Link>
        )}

        {/* Profile Settings */}
        <Link href="/dashboard/profile">
            <div className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
            pathname === "/dashboard/profile" ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}>
            <UserCircle className={cn("w-5 h-5", pathname === "/dashboard/profile" ? "text-blue-400" : "text-slate-500 group-hover:text-white")} />
            <span className="text-[15px]">Profile Settings</span>
            </div>
        </Link>

      </nav>

      {/* Logout */}
      <div className="mb-6">
         <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
         >
            <LogOut className="w-5 h-5" />
            <span className="text-[15px]">Sign Out</span>
         </button>
      </div>

      {/* Pro Card */}
      <div className="bg-gradient-to-br from-[#1F1F1F] to-[#111111] p-5 rounded-[24px] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none" />
        <div className="relative z-10">
            <h4 className="font-bold text-sm mb-1 text-white">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Unlock advanced AI mapping.
            </p>
            <Button size="sm" className="w-full bg-[#2A2A2A] hover:bg-[#333] border border-white/5 text-white text-xs h-8 rounded-lg">
                Upgrade Now
            </Button>
        </div>
      </div>

    </aside>
  );
}