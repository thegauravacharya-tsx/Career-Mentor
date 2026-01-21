"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState(""); // Feedback message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      } else {
        setStatus("success");
        setEmail(""); // Clear input on success
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to connect. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden text-slate-900">
      
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F5F5_1px,transparent_1px),linear-gradient(to_bottom,#F5F5F5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100" />
      </div>

      <main className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center pt-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-300 transition-colors cursor-default">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[12px] font-semibold tracking-wide text-slate-600">Launching Officially Soon!</span>
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] text-slate-900 mb-6 leading-[1.05]">
            Every Big Idea <br /> 
            <span className="text-slate-400">starts with a list.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed mb-16 font-medium tracking-tight">
            Build momentum before launch. Join the exclusive waitlist to secure your early access spot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-[520px] pt-10"
        >
          {status === "success" ? (
            <div className="flex items-center justify-center h-16 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 font-medium animate-in fade-in zoom-in shadow-sm">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" /> You're on the list!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative group">
                <div className="relative flex items-center bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-within:ring-4 focus-within:ring-slate-100 focus-within:border-slate-300">
                    
                    {/* Icon */}
                    <div className="pl-4 text-slate-400">
                        <Mail className="w-5 h-5 mr-2" />
                    </div>

                    {/* Input */}
                    <Input 
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-4 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all rounded-xl"
                        required
                    />

                    {/* Button */}
                    <Button 
                        disabled={status === "loading"}
                        className="ml-2 h-12 px-8 rounded-full bg-slate-900 hover:bg-black text-white font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-80 cursor-pointer"
                    >
                        {status === "loading" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Join <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>
                {/* Error Message Display */}
                {status === "error" && (
                    <p className="absolute -bottom-8 left-0 w-full text-center text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                        {message}
                    </p>
                )}
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}