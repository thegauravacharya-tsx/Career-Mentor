import { TrendingUp, Activity } from "lucide-react";

export function SkillLevelCard() {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
         <div className="p-2 bg-slate-50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-slate-900" />
         </div>
      </div>
      <div className="mt-auto relative z-10">
         <h3 className="text-slate-500 text-sm font-medium mb-1">Avg. Skill Level</h3>
         <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">8.5</span>
            <span className="text-sm text-slate-400">/10</span>
         </div>
         <div className="mt-3 flex items-center gap-1.5">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-bold">+12%</span>
            <span className="text-[10px] text-slate-400">vs last month</span>
         </div>
      </div>
      {/* Background Sparkline Decoration */}
      <svg className="absolute bottom-0 right-0 w-24 h-16 text-slate-50 fill-current opacity-50" viewBox="0 0 100 50" preserveAspectRatio="none">
         <path d="M0 50 L0 30 Q 25 10 50 25 T 100 10 L 100 50 Z" />
      </svg>
    </div>
  );
}

export function ActivityCard() {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 h-full flex flex-col">
       <div className="flex justify-between items-start mb-4">
         <div className="p-2 bg-slate-50 rounded-xl">
            <Activity className="w-5 h-5 text-slate-900" />
         </div>
      </div>
      <div>
         <h3 className="text-slate-500 text-sm font-medium mb-1">Quizzes Taken</h3>
         <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-slate-900">12</span>
            <span className="text-sm text-slate-400">Total</span>
         </div>
         {/* Dot Matrix Visualization */}
         <div className="flex justify-between gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                    <div className={`w-2 h-2 rounded-full ${i > 3 ? 'bg-blue-500' : 'bg-slate-100'}`} />
                    <div className={`w-2 h-2 rounded-full ${i === 6 ? 'bg-indigo-500' : 'bg-slate-100'}`} />
                    <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-lime-400' : 'bg-slate-100'}`} />
                </div>
            ))}
         </div>
      </div>
    </div>
  )
}