import { Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ProgressCard() {
  return (
    <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 bg-green-100 text-green-700 rounded-lg">
                    <Zap className="w-4 h-4 fill-current" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Assessment Progress</h3>
        </div>
        <div className="text-right">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">82%</span>
            <p className="text-xs text-slate-400 font-medium">Completion</p>
        </div>
      </div>

      {/* Visual Chart Graphic (Circle Representation) */}
      <div className="flex gap-6 items-center">
         {/* Using CSS for a custom overlapping bubble chart look */}
         <div className="relative w-32 h-32 flex-shrink-0">
            <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 translate-x-2" />
            <div className="absolute inset-0 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl z-10">
                Hi-Tech
            </div>
            <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs shadow-lg z-20 border-4 border-white">
                Soft
            </div>
         </div>

         <div className="flex-1 space-y-5">
            <SkillBar label="Technical Skills" value={78} color="bg-indigo-600" />
            <SkillBar label="Soft Skills" value={92} color="bg-lime-400" />
            <SkillBar label="Leadership" value={45} color="bg-slate-900" />
         </div>
      </div>
    </div>
  );
}

function SkillBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{label}</span>
                <span className="text-slate-400">{value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}