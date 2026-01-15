import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand & Copy */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="w-4 h-4 bg-slate-900 rounded-[2px]" />
            <span className="font-semibold text-sm tracking-tight text-slate-900">CareerPath.AI</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CareerPath Inc. All rights reserved.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-slate-900 transition-colors">Cookies</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <SocialIcon href="https://twitter.com" icon={<Twitter className="w-4 h-4" />} />
          <SocialIcon href="https://linkedin.com" icon={<Linkedin className="w-4 h-4" />} />
          <SocialIcon href="https://github.com" icon={<Github className="w-4 h-4" />} />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
    >
      {icon}
    </Link>
  );
}