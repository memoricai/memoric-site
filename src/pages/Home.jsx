import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Testimonials from "../components/Testimonials";
import HeroIllustration from "../components/HeroIllustration";

export default function Home() {
  return (
    <div className="w-full text-slate-900 relative overflow-hidden">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                    pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 relative">
        {/* Accent blur circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Text Content */}
            <div className="text-white space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 
                            bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">AI Training & Consulting</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                <span className="block font-semibold">Transform Your Organization</span>
                <span className="block text-slate-300 font-medium text-lg my-1">by</span>
                <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Strengthening AI Capabilities
                </span>
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto px-4">
                AI literacy and fluency training to build core understanding and practical skills for automation that works. Bridge the gap between AI possibility and hands-on implementation.
              </p>
            </div>

            {/* Image - Give it more height on mobile */}
            <div className="w-full h-[350px] sm:h-[400px]">
              <HeroIllustration />
            </div>
          </div>

          {/* Desktop Layout - 1:1 ratio */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 
                            bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">AI Training & Consulting</span>
              </div>

              <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
                Transform Your Organization by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                  Strengthening AI Capabilities
                </span>
              </h1>

              <p className="text-lg xl:text-xl text-slate-300 leading-relaxed">
                AI literacy and fluency training to build core understanding and practical skills for automation that works. Bridge the gap between AI possibility and hands-on implementation.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[380px] xl:h-[420px]">
              <HeroIllustration />
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      {/* <div className="py-12 md:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 
                       text-center mb-8 md:mb-12">
            Testimonials
          </h2>
          <Testimonials />
        </div>
      </div> */}
    </div>
  );
}