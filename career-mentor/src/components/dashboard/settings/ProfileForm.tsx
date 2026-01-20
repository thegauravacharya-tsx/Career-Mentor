"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Router
import { Camera, Loader2, Save, ChevronDown, Check } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { phoneCodes } from "@/lib/data/phone-codes";
import { countryList } from "@/lib/data/country-list";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type ProfileFormData = {
    firstName: string;
    lastName: string;
    phoneDialCode: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipCode: string;
};

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);

  // Split name safely
  const splitName = (user.name || "").split(" ");
  const initialFirst = splitName[0] || "";
  const initialLast = splitName.slice(1).join(" ") || "";
  
  const { register, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
        firstName: initialFirst,
        lastName: initialLast,
        phoneDialCode: "+977",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "US", 
        city: user.city || "",
        zipCode: user.zipCode || "",
    }
  });

  const watchedDialCode = watch("phoneDialCode");
  const activePhoneData = phoneCodes.find(c => c.dial_code === watchedDialCode) || phoneCodes[0];

  const watchedCountryCode = watch("country");
  const activeCountryData = countryList.find(c => c.code === watchedCountryCode) || countryList[0];

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
        const res = await fetch("/api/user/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error("Failed to update");

        setIsSaved(true);
        router.refresh(); // REFRESHES SERVER DATA (Critical for View Page update)
        setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
        alert("Something went wrong saving your profile.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-slate-100 pb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Information</h2>
        
        <div className="flex items-center gap-2 h-8">
            {isLoading && (
                <span className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </span>
            )}
            {isSaved && (
                <span className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Save className="w-3.5 h-3.5" /> Saved successfully
                </span>
            )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Avatar (Visual only for now unless upload logic added) */}
        <div className="mb-14 flex items-center gap-8">
            <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="text-2xl bg-slate-900 text-white">
                        {user.name?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div>
                <h3 className="font-semibold text-slate-900">Profile Picture</h3>
                <p className="text-sm text-slate-500 mb-4">Your avatar is managed via Google.</p>
            </div>
        </div>

        {/* --- FORM GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* First Name */}
            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">First Name</Label>
                <Input 
                    {...register("firstName")}
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-base px-4"
                />
            </div>

            {/* Last Name */}
            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">Last Name</Label>
                <Input 
                    {...register("lastName")}
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-base px-4"
                />
            </div>

            {/* Email */}
            <div className="space-y-3 md:col-span-2">
                <Label className="text-[15px] font-medium text-slate-700">Email Address</Label>
                <Input 
                    defaultValue={user.email || ""} 
                    disabled
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed text-base px-4"
                />
            </div>

            {/* Phone Number */}
            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">Country Code</Label>
                <Popover open={openPhone} onOpenChange={setOpenPhone}>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline" 
                            role="combobox" 
                            aria-expanded={openPhone} 
                            className="h-12 w-full justify-between bg-slate-50 border-slate-200 rounded-xl hover:bg-slate-100 px-4"
                        >
                            <div className="flex items-center gap-3">
                                <ReactCountryFlag countryCode={activePhoneData.code} svg style={{ width: '1.5em', height: '1.5em' }} />
                                <span className="text-base">{activePhoneData.dial_code}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Search code..." />
                            <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                    <ScrollArea className="h-72">
                                        {phoneCodes.map((country) => (
                                            <CommandItem
                                                key={`phone-${country.code}`}
                                                value={country.label}
                                                onSelect={() => {
                                                    setValue("phoneDialCode", country.dial_code);
                                                    setOpenPhone(false);
                                                }}
                                                className="flex items-center gap-3 cursor-pointer"
                                            >
                                                <ReactCountryFlag countryCode={country.code} svg style={{ width: '1.2em', height: '1.2em' }} />
                                                <span className="flex-1 text-sm">{country.label}</span>
                                                <span className="text-slate-400 text-xs">{country.dial_code}</span>
                                                {watchedDialCode === country.dial_code && <Check className="ml-auto h-4 w-4 text-blue-600" />}
                                            </CommandItem>
                                        ))}
                                    </ScrollArea>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">Phone Number</Label>
                <Input 
                    {...register("phoneNumber")}
                    placeholder="000 000 000" 
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-base px-4"
                />
            </div>

            {/* Country */}
            <div className="space-y-3 md:col-span-2">
                <Label className="text-[15px] font-medium text-slate-700">Country</Label>
                <Popover open={openCountry} onOpenChange={setOpenCountry}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={openCountry} className="h-12 w-full justify-between bg-slate-50 border-slate-200 rounded-xl hover:bg-slate-100 px-4">
                            <div className="flex items-center gap-3">
                                <ReactCountryFlag countryCode={activeCountryData.code} svg style={{ width: '1.5em', height: '1.5em' }} />
                                <span className="text-base font-normal">{activeCountryData.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                    <ScrollArea className="h-72">
                                        {countryList.map((country) => (
                                            <CommandItem
                                                key={`country-${country.code}`}
                                                value={country.label}
                                                onSelect={() => {
                                                    setValue("country", country.code);
                                                    setOpenCountry(false);
                                                }}
                                                className="flex items-center gap-3 cursor-pointer"
                                            >
                                                <ReactCountryFlag countryCode={country.code} svg style={{ width: '1.2em', height: '1.2em' }} />
                                                <span className="flex-1 text-sm">{country.label}</span>
                                                {watchedCountryCode === country.code && <Check className="ml-auto h-4 w-4 text-blue-600" />}
                                            </CommandItem>
                                        ))}
                                    </ScrollArea>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {/* City */}
            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">City</Label>
                <Input 
                    {...register("city")}
                    placeholder="San Francisco" 
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-base px-4"
                />
            </div>

            {/* Zip Code */}
            <div className="space-y-3">
                <Label className="text-[15px] font-medium text-slate-700">Zip Code</Label>
                <Input 
                    {...register("zipCode")}
                    placeholder="94105" 
                    className="h-12 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-base px-4"
                />
            </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex justify-end gap-4 border-t border-slate-100 pt-8">
            <Button type="button" variant="ghost" className="h-12 rounded-xl text-slate-500 hover:text-slate-900 text-[15px]">
                Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-12 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 text-[15px]">
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </div>

      </form>
    </div>
  );
}