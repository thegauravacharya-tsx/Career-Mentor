import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function StartAssessmentCard() {
  return (
    <div className="bg-[#D1FAE5] p-8 rounded-[32px] flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Abstract Shapes simulating the 'Flux' image style */}
      <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#10B981] rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute bottom-[-10px] left-[-10px] w-24 h-24 bg-[#34D399] rounded-full opacity-30" />

      <div className="relative z-10">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#059669]">
            <Sparkles className="w-6 h-6 fill-current" />
        </div>
        <h3 className="text-2xl font-bold text-[#064E3B] mb-2 leading-tight">
            Discover your <br/> next move.
        </h3>
        <p className="text-[#065F46] text-sm mb-6 opacity-80">
            Take the AI assessment to unlock new career paths.
        </p>
      </div>

      <Link href="/assessment" className="relative z-10">
        <Button className="w-full rounded-xl bg-[#064E3B] hover:bg-[#065F46] text-white font-semibold h-12 shadow-lg shadow-[#064E3B]/20">
            Start Now <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}