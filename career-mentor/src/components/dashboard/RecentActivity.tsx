import { ArrowUpRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentActivity() {
  const history = [
    { id: 1, role: "UX Designer", match: "92%", date: "2 days ago" },
    { id: 2, role: "Product Manager", match: "88%", date: "1 week ago" },
    { id: 3, role: "Frontend Dev", match: "75%", date: "1 month ago" },
  ];

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
        <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-8 text-xs">
            View All
        </Button>
      </div>

      <div className="space-y-4 relative z-10">
        {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer border border-white/5">
                <div>
                    <p className="font-bold text-sm">{item.role}</p>
                    <p className="text-xs text-white/40">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-blue-300">{item.match}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}