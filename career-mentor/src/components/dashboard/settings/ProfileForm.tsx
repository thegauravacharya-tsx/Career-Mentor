"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Camera, Loader2, Save, ChevronDown, Check } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { phoneCodes } from "@/lib/data/phone-codes";
import { countryList } from "@/lib/data/country-list";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [openPhone, setOpenPhone] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        phoneDialCode: "+1",
        phoneNumber: "",
        country: "US", 
        city: "",
        zipCode: "",
    }
  });

  const watchedDialCode = watch("phoneDialCode");
  const activePhoneData = phoneCodes.find(c => c.dial_code === watchedDialCode) || phoneCodes[0];

  const watchedCountryCode = watch("country");
  const activeCountryData = countryList.find(c => c.code === watchedCountryCode) || countryList[0];

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Updated Data:", data);
    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
        
        {/* Avatar Section */}
        <div className="mb-12 flex items-center gap-8">
            <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="text-2xl bg-slate-900 text-white">
                        {user.name?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-slate-600">
                    <Camera className="w-4 h-4" />
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-slate-900">Profile Picture</h3>
                <p className="text-sm text-slate-500 mb-4">PNG, JPG up to 5MB</p>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" size="sm" className="rounded-xl border-slate-200 h-9 text-xs">
                        Upload New
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 h-9 text-xs">
                        Delete
                    </Button>
                </div>
            </div>
        </div>

        {/*  FORM GRID  */}
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
        <div className="mt-12 flex justify-end gap-4 border-t border-slate-100 pt-8">
            <Button type="button" variant="ghost" className="h-11 rounded-xl text-slate-500 hover:text-slate-900">
                Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200">
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </div>

      </form>
    </div>
  );
}