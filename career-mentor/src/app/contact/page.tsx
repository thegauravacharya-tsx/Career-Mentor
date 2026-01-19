"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactCountryFlag from "react-country-flag";
import { Check, ChevronDown, User, Mail, MessageSquare, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { phoneCodes } from "@/lib/data/phone-codes";
// UI
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Validation ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  countryDialCode: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message limit is 500 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openPhoneCode, setOpenPhoneCode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryDialCode: "+977",
      terms: false,
    },
  });

  const selectedDialCode = watch("countryDialCode");
  const selectedPhoneCountry = phoneCodes.find(c => c.dial_code === selectedDialCode) || phoneCodes[0];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed");

      setIsSuccess(true);
      reset();
      setValue("countryDialCode", "+1"); 
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
            
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-4 uppercase tracking-wider">
                    Contact Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                    Let's Get In Touch.
                </h1>
                <p className="text-slate-500">
                    Or just reach out manually to <a href="mailto:hello@careerpath.ai" className="text-blue-600 font-medium hover:underline">hello@careerpath.ai</a>
                </p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm"
            >
                {/* Visual Fix: Increased gap from space-y-6 to space-y-8 */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                {...register("name")}
                                placeholder="Enter your full name..." 
                                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all rounded-xl" 
                            />
                        </div>
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                {...register("email")}
                                type="email"
                                placeholder="Enter your email address..." 
                                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all rounded-xl" 
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone Number</label>
                        <div className="flex gap-3">
                            
                            {/* Phone Code Combobox */}
                            <Popover open={openPhoneCode} onOpenChange={setOpenPhoneCode}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openPhoneCode}
                                        className="h-12 w-[110px] justify-between bg-slate-50 border-slate-200 text-slate-900 rounded-xl hover:bg-slate-100 px-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ReactCountryFlag 
                                                countryCode={selectedPhoneCountry.code} 
                                                svg 
                                                style={{ width: '1.2em', height: '1.2em' }} 
                                            />
                                            <span>{selectedPhoneCountry.dial_code}</span>
                                        </div>
                                        <ChevronDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search country..." />
                                        <CommandList>
                                            <CommandEmpty>No country found.</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-72">
                                                    {phoneCodes.map((country) => (
                                                        <CommandItem
                                                            key={`${country.code}-${country.dial_code}`}
                                                            value={country.label} 
                                                            onSelect={() => {
                                                                setValue("countryDialCode", country.dial_code);
                                                                setOpenPhoneCode(false);
                                                            }}
                                                            className="flex items-center gap-3 cursor-pointer"
                                                        >
                                                            <ReactCountryFlag 
                                                                countryCode={country.code} 
                                                                svg 
                                                                style={{ width: '1.2em', height: '1.2em' }} 
                                                            />
                                                            <span className="flex-1">{country.label}</span>
                                                            <span className="text-slate-400 text-sm">{country.dial_code}</span>
                                                            {selectedDialCode === country.dial_code && (
                                                                <Check className="ml-auto h-4 w-4 text-blue-600" />
                                                            )}
                                                        </CommandItem>
                                                    ))}
                                                </ScrollArea>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            
                            <div className="relative flex-1">
                                <Input 
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="(555) 000-0000" 
                                    className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all rounded-xl" 
                                />
                            </div>
                        </div>
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Message</label>
                        <div className="relative">
                            <Textarea 
                                {...register("message")}
                                placeholder="Enter your main text here..." 
                                className="min-h-[140px] bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all rounded-xl resize-none p-4" 
                            />
                            <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
                                {watch("message")?.length || 0}/500
                            </div>
                        </div>
                        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox"
                                id="terms"
                                {...register("terms")}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-blue-600 checked:bg-blue-600 focus:ring-2 focus:ring-blue-600/20"
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                        </div>
                        <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none">
                            I hereby agree to the <a href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</a> terms.
                        </label>
                    </div>
                    {errors.terms && <p className="text-xs text-red-500 mt-0">{errors.terms.message}</p>}

                    <Button 
                        disabled={isSubmitting}
                        className="w-full h-12 bg-[#0F172A] hover:bg-[#020617] text-white rounded-xl font-semibold text-[15px] shadow-lg transition-all active:scale-[0.98]"
                    >
                        {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Submit Form →"}
                    </Button>

                    {isSuccess && (
                        <p className="text-center text-sm text-green-600 font-medium bg-green-50 py-2 rounded-lg">
                            Thank you! We'll be in touch shortly.
                        </p>
                    )}
                </form>
            </motion.div>

            <div className="mt-20">
                <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-6 uppercase tracking-wider">
                    Reach Out To Us
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us A Message.</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Live Chat</h3>
                        <p className="text-sm text-slate-500 mb-4">Speak to our team quickly.</p>
                        <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">Start Chat</a>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Submit Help Ticket</h3>
                        <p className="text-sm text-slate-500 mb-4">We're available to help via email.</p>
                        <a href="mailto:support@careerpath.ai" className="text-sm font-semibold text-purple-600 hover:underline">support@careerpath.ai</a>
                    </div>
                </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}