import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ userName, userImage }: { userName: string, userImage?: string | null }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, {userName}</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">{today}</p>
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

        {/* Notifications */}
        <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

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