import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({ label, value, subValue, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-center h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl">
            <Icon className="w-6 h-6 text-slate-700" />
        </div>
        {trend === 'up' && (
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">High</span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 font-medium text-sm mb-1">{label}</h3>
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
            <span className="text-sm text-slate-400 font-medium">{subValue}</span>
        </div>
      </div>
    </div>
  );
}