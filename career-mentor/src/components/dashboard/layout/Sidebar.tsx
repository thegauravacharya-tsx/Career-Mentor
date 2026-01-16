"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  History, 
  UserCircle, 
  LifeBuoy, 
  Sparkles, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: History, label: "Assessment History", href: "/dashboard/history" },
  { icon: UserCircle, label: "Profile Settings", href: "/dashboard/profile" },
  { icon: LifeBuoy, label: "Help & Support", href: "/contact" },
];

export function Sidebar({ userId }: { userId: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#111111] text-white flex flex-col h-screen fixed left-0 top-0 z-40 p-6 border-r border-white/5">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Sparkles className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="font-bold text-xl tracking-tight">CareerPath</span>
      </div>

      {/* Primary CTA */}
      <Link href="/assessment">
        <Button className="w-full bg-white text-black hover:bg-slate-200 font-semibold rounded-xl h-12 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
          <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
          Start Assessment
        </Button>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          // Quick fix for dynamic dashboard route active state
          const dynamicHref = item.href === "/dashboard" ? `/dashboard/${userId}` : item.href;
          
          return (
            <Link key={item.label} href={dynamicHref}>
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}>
                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-white"}`} />
                <span className="text-[15px]">{item.label}</span>
              </div>
            </Link>
          );
        })}
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
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-lg mb-1">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Unlock advanced AI career mapping and detailed reports.
            </p>
            <Button size="sm" className="w-full bg-[#2A2A2A] hover:bg-[#333] border border-white/5 text-white text-xs h-9 rounded-xl">
                Upgrade Now
            </Button>
        </div>
      </div>

    </aside>
  );
}