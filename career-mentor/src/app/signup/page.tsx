"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.type === "text" && e.target.placeholder === "Full Name" ? "name" : e.target.type]: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value});
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value});
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/dashboard'
        });
      } else {
        const data = await response.json();
        alert(data.message || "Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Join thousands of students planning their future with AI guidance."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
                <User className="w-[18px] h-[18px]" />
            </div>
            <Input 
                onChange={handleNameChange}
                value={formData.name}
                placeholder="Full Name" 
                required
                className="h-12 bg-white border-slate-200 pl-11 rounded-xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all shadow-sm" 
            />
        </div>

        {/* Email */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
            <Mail className="w-[18px] h-[18px]" />
          </div>
          <Input 
            type="email" 
            onChange={handleEmailChange}
            value={formData.email}
            placeholder="Email address" 
            required
            className="h-12 bg-white border-slate-200 pl-11 rounded-xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all shadow-sm" 
          />
        </div>

        {/* Password */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
            <Lock className="w-[18px] h-[18px]" />
          </div>
          <Input 
            type={showPassword ? "text" : "password"} 
            onChange={handlePasswordChange}
            value={formData.password}
            placeholder="Password" 
            required
            className="h-12 bg-white border-slate-200 pl-11 pr-10 rounded-xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all shadow-sm" 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0F172A] hover:bg-[#020617] text-white rounded-xl font-semibold text-[15px] tracking-[-0.01em] shadow-[0_4px_12px_rgba(15,23,42,0.15)] transition-all active:scale-[0.98] mt-2 disabled:opacity-70"
        >
          {isLoading ? "Creating Account..." : "Get Started"}
        </Button>
      </form>

      {/* Social Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-widest font-semibold">
            <span className="bg-[#F8FAFC] px-3 text-slate-400">
              Or sign up with
            </span>
        </div>
      </div>

      {/* Google Button */}
      <div className="mb-8">
        <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="text-[15px] font-medium text-slate-700">Continue with Google</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-[14px] text-slate-500 font-normal">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-slate-900 hover:text-black transition-colors ml-0.5">
                Sign in
            </Link>
        </p>
      </div>
    </AuthLayout>
  );
}