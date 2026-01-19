import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteAccountCard() {
  return (
    <div className="bg-[#F8FAFC] border border-slate-200 p-8 md:p-10 rounded-[32px]">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Account</h3>
      
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600 leading-relaxed">
            After making a deletion request, you will have <strong>6 months</strong> to restore this account before data is permanently wiped from our servers.
        </p>
      </div>

      <p className="text-slate-500 text-sm mb-6 max-w-2xl leading-relaxed">
        To permanently erase your CareerPath account, click the button below. This implies that you won't have access to your assessment history, saved jobs, and personal career roadmap.
        <br/><br/>
        There is no reversing this action.
      </p>

      <div className="flex justify-end">
        <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 h-11 px-6 rounded-xl font-medium shadow-none">
            Delete Account
        </Button>
      </div>
    </div>
  );
}