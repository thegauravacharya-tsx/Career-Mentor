import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InsightsCard() {
  return (
    <div className="bg-[#111111] p-8 rounded-[32px] text-white shadow-2xl h-full flex flex-col justify-between relative overflow-hidden group">
      
      <div className="flex justify-between items-start z-10 relative">
        <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Gemini AI Insights</span>
            </div>
            <h3 className="text-2xl font-bold leading-tight">Career Trajectory <br/> Prediction</h3>
        </div>
        <Button variant="outline" className="h-9 px-3 rounded-full bg-white/10 border-transparent text-white hover:bg-white/20 text-xs">
            View Report
        </Button>
      </div>

      {/* CSS-Only Bar Chart Visualization */}
      <div className="flex items-end gap-4 h-32 mt-6 z-10 relative">
         <div className="flex-1 flex flex-col justify-end gap-2 group/bar">
            <div className="w-full bg-lime-400/20 h-[40%] rounded-t-lg relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-lime-400 h-0 group-hover/bar:h-full transition-all duration-700" />
            </div>
            <span className="text-[10px] text-white/40 text-center">Role Fit</span>
         </div>
         <div className="flex-1 flex flex-col justify-end gap-2 group/bar">
            <div className="w-full bg-indigo-500/20 h-[85%] rounded-t-lg relative overflow-hidden">
                 <div className="absolute bottom-0 w-full bg-indigo-500 h-full" />
            </div>
            <span className="text-[10px] text-white/40 text-center">Salary</span>
         </div>
         <div className="flex-1 flex flex-col justify-end gap-2 group/bar">
            <div className="w-full bg-blue-500/20 h-[60%] rounded-t-lg relative overflow-hidden">
                 <div className="absolute bottom-0 w-full bg-blue-500 h-full" />
            </div>
            <span className="text-[10px] text-white/40 text-center">Demand</span>
         </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}