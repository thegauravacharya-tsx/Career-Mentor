// src/components/RecommendationCard.tsx
"use client";

import { useState } from 'react';
import { Recommendation } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
};

export default function RecommendationCard({ data }: { data: Recommendation }) {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className={`${getMatchColor(data.matchScore)} px-3 py-1`}>
                            {data.matchScore}% Match
                        </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {data.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow">
                        {data.overview.substring(0, 120)}...
                    </p>

                    {/* Footer */}
                    <div className="bg-slate-50 -mx-6 -mb-6 p-4 border-t border-slate-100 mt-auto">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why it fits:</p>
                        <p className="text-sm text-slate-700 italic">"{data.matchReason}"</p>
                    </div>
                </div>
            </DialogTrigger>

            {/* Modal Detail View */}
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-slate-900 flex items-center gap-4">
                        {data.title}
                        <Badge variant="secondary" className="text-lg">
                            {data.type}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 py-6">
                    
                    {/* Overview */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Overview</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {data.overview}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="text-sm text-slate-500 mb-1">Difficulty</div>
                            <div className="font-bold text-slate-900">{data.difficulty}</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="text-sm text-slate-500 mb-1">Future Demand</div>
                            <div className="font-bold text-slate-900">{data.futureScope}</div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}