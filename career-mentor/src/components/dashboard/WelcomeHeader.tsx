"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeHeader({ userName }: { userName: string }) {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString("en-US", { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    }));
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Career Overview
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Welcome back, {userName}
        </p>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-2 pl-6 pr-2 rounded-full border border-slate-200 shadow-sm">
        <span className="text-sm font-medium text-slate-500 hidden sm:block min-w-[100px] text-right">
          {dateStr}
        </span>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-slate-100 relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>
      </div>
    </div>
  );
}