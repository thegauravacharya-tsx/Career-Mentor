"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";

interface LoginGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

export function LoginGateModal({ open, onOpenChange, title, description }: LoginGateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[24px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-900">
            <Lock className="w-6 h-6" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">{title}</DialogTitle>
          <DialogDescription className="text-slate-500 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Link href="/login" className="w-full">
            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
              Sign In to Continue
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}