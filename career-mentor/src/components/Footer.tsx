import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <div className="bg-white pt-10">
      <footer className="w-full bg-[#050505] py-12 md:py-20 px-4 md:px-6 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 font-sans">
          
          {/* Card 1: Main CTA */}
          <div className="md:col-span-7 bg-[#111111] rounded-[32px] p-8 md:p-12 flex flex-col justify-between min-h-[340px] border border-white/5 hover:border-white/10 transition-colors">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
                Need guidance?
              </h2>
              <h2 className="text-3xl md:text-4xl font-medium text-white/60 tracking-tight">
                Start your career path today
              </h2>
            </div>

            {/* Pill Action Bar */}
            <div className="bg-[#1A1A1A] p-2 pr-2 pl-3 rounded-full flex items-center justify-between border border-white/5 mt-8 md:mt-0 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg" />
                <span className="text-sm font-medium text-white">Start analysis with AI</span>
              </div>
              <Link href="/assessment">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 h-10 font-medium text-sm transition-all">
                  Get Started
                  </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Focus Areas */}
          <div className="md:col-span-5 bg-[#111111] rounded-[32px] p-8 md:p-12 flex flex-col border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-2xl font-medium text-white mb-10 leading-snug">
              Are you planning your <br />
              future education?
            </h3>
            
            <div className="mt-auto">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Focus areas</p>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-white/80">
                  <span>Career Analysis</span>
                  <span>Skill Mapping</span>
                  <span>Market Data</span>
                  <span>University Logic</span>
              </div>
            </div>
          </div>

          {/* Card 3: Links (Bottom Left) */}
          <div className="md:col-span-7 bg-[#111111] rounded-[32px] p-8 md:p-12 flex flex-col justify-between border border-white/5 min-h-[300px]">
            <div className="space-y-2">
              <h3 className="text-2xl font-medium text-white">Check out these links</h3>
              <h3 className="text-2xl font-medium text-white/60">before you go</h3>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white mb-1">Home</span>
                  <Link href="/#" className="text-sm text-white/50 hover:text-white transition-colors">About</Link>
                  <Link href="/methodology" className="text-sm text-white/50 hover:text-white transition-colors">Services</Link>
              </div>
              <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white mb-1">Contact</span>
                  <Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact us</Link>
              </div>
              <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-white mb-1">Waitlist</span>
                  <Link href="/waitlist" className="text-sm text-white/50 hover:text-white transition-colors">Waitlist</Link>
              </div>
            </div>

            <div className="mt-12 text-[11px] text-white/30">
              © Copyright {new Date().getFullYear()}, All Rights Reserved
            </div>
          </div>

          {/* Right Column Wrapper */}
          <div className="md:col-span-5 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4 h-[140px]">
                  <Link href="#" className="bg-[#111111] rounded-[24px] border border-white/5 flex items-center justify-center text-white hover:bg-[#1A1A1A] transition-colors group">
                      <Twitter className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </Link>
                  <Link href="#" className="bg-[#111111] rounded-[24px] border border-white/5 flex items-center justify-center text-white hover:bg-[#1A1A1A] transition-colors group">
                      <Linkedin className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </Link>
                  <Link href="#" className="bg-[#111111] rounded-[24px] border border-white/5 flex items-center justify-center text-white hover:bg-[#1A1A1A] transition-colors group">
                      <Instagram className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </Link>
              </div>
              <div className="bg-[#111111] rounded-[32px] border border-white/5 flex-1 flex items-center justify-center min-h-[144px]">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                      CareerPath.AI
                  </h2>
              </div>
          </div>

        </div>
      </footer>
    </div>
  );
}