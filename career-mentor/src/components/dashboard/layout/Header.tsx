"use client";

import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/context/NotificationContext";
import { cn } from "@/lib/utils";

export function Header({ userName, userImage }: { userName: string, userImage?: string | null }) {
  const [dateStr, setDateStr] = useState("");
  const { unreadCount, notifications, markAllAsRead } = useNotifications();

  // fix: calculate date only on client
  useEffect(() => {
    setDateStr(new Date().toLocaleDateString("en-US", { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    }));
  }, []);

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, {userName}</h1>
        {/* Render date only when available */}
        <p className="text-slate-500 text-sm font-medium mt-1 min-h-[20px]">
            {dateStr}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
                placeholder="Search assessments..." 
                className="pl-10 h-11 w-[280px] bg-white border-transparent shadow-sm rounded-2xl focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400" 
            />
        </div>

        {/* Notification */}
        <Popover>
            <PopoverTrigger asChild>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors relative outline-none">
                    <Bell className={cn("w-5 h-5 transition-colors", unreadCount > 0 ? "text-slate-800" : "text-slate-400")} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-in zoom-in duration-300" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[380px] p-0 rounded-2xl shadow-xl border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={markAllAsRead} 
                            className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2"
                        >
                            Mark all read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                            <Bell className="w-8 h-8 text-slate-200 mb-2" />
                            <p className="text-sm text-slate-500">No notifications yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {notifications.map((note) => (
                                <div key={note.uniqueId} className={cn("p-4 flex gap-3 transition-colors", !note.isRead ? "bg-blue-50/30" : "bg-white")}>
                                    <div className={cn("mt-1 w-2 h-2 rounded-full flex-shrink-0", !note.isRead ? "bg-blue-500" : "bg-transparent")} />
                                    <div>
                                        <h5 className={cn("text-sm font-medium mb-0.5", !note.isRead ? "text-slate-900" : "text-slate-600")}>
                                            {note.title}
                                        </h5>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {note.message}
                                        </p>
                                        <span className="text-[10px] text-slate-400 mt-2 block">
                                            {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>

        {/* Profile */}
        <div className="pl-2">
            <Avatar className="h-11 w-11 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage src={userImage || ""} />
                <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold">
                    {userName[0]}
                </AvatarFallback>
            </Avatar>
        </div>
      </div>
    </header>
  );
}