import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="w-full text-slate-900 relative overflow-hidden">

      {/* Hero Section with Gradient Background */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20 relative">
        {/* Accent blur circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 relative z-10">

          {/* Left Text */}
          <div className="flex-1 text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">AI Training & Consulting</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Organization by
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                Strengthening AI capabilities
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              AI literacy and fluency training to build practical, internal skills for automation that works. Bridge the gap between AI possibility and practical implementation.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex-1">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full h-80 md:h-96 flex items-center justify-center">
              <div className="text-white/60 font-semibold text-center px-4">
                [Hero Illustration]
              </div>
            </Card>
          </div>

        </div>
      </div>
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8 md:mb-12">
         Testimonials
        </h2>
        <Testimonials className="max-w-4xl mx-auto px-6 py-12 space-y-8" />
      </div>
    </div>
  );
}