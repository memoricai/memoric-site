import React from 'react';
import { Card } from "@/components/ui/card";
import { Brain, Zap, Shield, Star } from 'lucide-react';

export default function TrainingModules() {
    const modules = [
        {
            id: 1,
            icon: Brain,
            title: "AI LITERACY",
            color: "cyan",
            description: "Build foundational understanding of AI concepts, applications, and how AI solves real business problems."
        },
        {
            id: 2,
            icon: Zap,
            title: "AI FLUENCY",
            color: "purple",
            description: "Develop hands-on skills with AI tools and gain confidence to choose and implement them effectively."
        },
        {
            id: 3,
            icon: Shield,
            title: "RESPONSIBLE AI",
            color: "green",
            description: "Learn ethical AI practices, governance frameworks, and how to deploy AI responsibly in your organization."
        },
        {
            id: 4,
            icon: Star,
            title: "AI LEADERSHIP",
            color: "amber",
            description: "Lead AI transformation initiatives, build AI strategy, and drive organizational change with confidence."
        }
    ];

    const colorClasses = {
        cyan: {
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
            icon: "text-cyan-500",
            hover: "hover:border-cyan-500"
        },
        purple: {
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            icon: "text-purple-500",
            hover: "hover:border-purple-500"
        },
        green: {
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            icon: "text-green-500",
            hover: "hover:border-green-500"
        },
        amber: {
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            icon: "text-amber-500",
            hover: "hover:border-amber-500"
        }
    };

    return (
        <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-slate-900 mb-3 md:mb-4 lg:mb-6 tracking-tight">
                        Training Modules
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 
                      max-w-3xl mx-auto px-2 italic font-medium">
                        Master AI literacy, fluency, and ethical use to lead in the AI world.
                    </p>
                </div>

                {/* Learning Roadmap Label */}
                <div className="text-center mb-4 md:mb-6">
                    <span className="text-sm md:text-base font-semibold text-slate-700">
                        Learning Roadmap
                    </span>
                </div>

                {/* Learning Roadmap Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14 lg:mb-16">
                    {modules.map((module, index) => (
                        <React.Fragment key={module.id}>
                            <div className={`
                                group flex items-center gap-2 px-4 py-2 rounded-full
                                border-2 transition-all duration-300 ease-out
                                transform hover:-translate-y-1 hover:scale-105
                                hover:shadow-lg
                                ${colorClasses[module.color].bg}
                                ${colorClasses[module.color].border}
                                ${colorClasses[module.color].hover}
                            `}>

                                <module.icon className={`
                                    w-4 h-4 md:w-5 md:h-5 
                                    ${colorClasses[module.color].icon}
                                    transition-transform duration-300
                                    group-hover:scale-125 group-hover:rotate-6
                                `} />

                                <span className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide">
                                    {module.title}
                                </span>
                            </div>

                            {index < modules.length - 1 && (
                                <div className="hidden sm:block w-6 md:w-8 h-0.5 bg-slate-300" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    <a
                        href="#corporate-training"
                        className="group w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 
                        bg-cyan-500 text-white font-bold text-sm md:text-base
                        rounded-xl shadow-lg
                        transition-all duration-300 ease-out
                        hover:bg-cyan-600 hover:-translate-y-1 hover:shadow-2xl
                        active:scale-95 text-center"
                    >
                        Explore Corporate Training
                    </a>

                    <a
                        href="#individual-courses"
                        className="group w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 
                        bg-purple-600 text-white font-bold text-sm md:text-base
                        rounded-xl shadow-lg
                        transition-all duration-300 ease-out
                        hover:bg-purple-700 hover:-translate-y-1 hover:shadow-2xl
                        active:scale-95 text-center"
                    >
                        View Individual Courses
                    </a>
                </div>

            </div>
        </div>
    );
}