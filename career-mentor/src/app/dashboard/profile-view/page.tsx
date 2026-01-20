import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit2, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";

export default async function ProfileViewPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {/* Sidebar */}
      <Sidebar userId={session.user.id} />

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 pt-12 max-w-[1000px] mx-auto">
            
            {/* Profile Header Card */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden relative mb-8">
                {/* Cover Photo */}
                <div className="h-48 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    
                    {/* Edit Button (Top Right) */}
                    <Link href="/dashboard/profile" className="absolute top-6 right-6">
                        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md rounded-xl h-10 px-4">
                            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                    </Link>
                </div>

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-end -mt-12 gap-6 mb-6">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg bg-white">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-3xl font-bold">
                                {user.name?.[0] || "U"}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="mb-2 flex-1">
                            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-slate-500">Member since {new Date().getFullYear()}</span>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 font-medium">
                                    Free Plan
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                        
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-900 text-lg">Contact Information</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-slate-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                                        <p className="text-slate-900 font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-slate-500">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                                        <p className="text-slate-900 font-medium">Not set</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-900 text-lg">Location & Security</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-slate-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                                        <p className="text-slate-900 font-medium">San Francisco, US</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-green-600">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-slate-900 font-medium">Verified</p>
                                            <CheckBadge />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </main>
      </div>
    </div>
  );
}

function CheckBadge() {
    return (
        <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}