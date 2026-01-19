import { Zap } from "lucide-react";

export function ClarityChart({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="flex justify-between items-start z-10">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-amber-500 fill-current" />
                <h3 className="font-bold text-slate-900">Clarity Score</h3>
            </div>
            <p className="text-4xl font-bold text-slate-900 tracking-tighter">
                {score}<span className="text-2xl text-slate-400">%</span>
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                +5% this week
            </span>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="absolute bottom-[-20px] right-[-20px] md:static md:mt-8 flex justify-center">
        <div className="relative w-48 h-48">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="24"
                    fill="transparent"
                    className="text-slate-100"
                />
                {/* Progress Circle */}
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="24"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-1000 ease-out"
                />
            </svg>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold text-slate-900">{score}</span>
            </div>
        </div>
      </div>
    </div>
  );
}