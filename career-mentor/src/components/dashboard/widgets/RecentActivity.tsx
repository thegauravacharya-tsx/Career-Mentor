import { ArrowUpRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActivityItem {
    id: string;
    role: string;
    match: string;
    date: Date;
}

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  
  // Helper to format "2 days ago" style
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    return "Today";
  };

  return (
    <div className="bg-[#1A1A1A] p-8 rounded-[32px] text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
                <History className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-lg">Recent Results</h3>
        </div>
        <Link href="/dashboard/history">
            <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-8 text-xs cursor-pointer">
                View All
            </Button>
        </Link>
      </div>

      <div className="space-y-4 relative z-10">
        {activities.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm">
                No recent activity found.
            </div>
        ) : (
            activities.map((item) => (
                <Link key={item.id} href={`/results/${item.id}`}>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer border border-white/5">
                        <div>
                            <p className="font-bold text-sm truncate max-w-[150px] sm:max-w-xs">{item.role}</p>
                            <p className="text-xs text-white/40">{timeAgo(item.date)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-blue-300">{item.match}</span>
                            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </Link>
            ))
        )}
      </div>
    </div>
  );
}