import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Testimonials from "../components/Testimonials";
import HeroIllustration from "../components/HeroIllustration";

export default function Home() {
  return (
    <div className="w-full text-slate-900 relative overflow-hidden">

      {/* Hero Section with 3:1 ratio and proper mobile spacing */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                    pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 relative">
        {/* Accent blur circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

            {/* Left Text - Takes 2 columns on desktop (66.66%) */}
            <div className="lg:col-span-2 text-white space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 
                            bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-xs md:text-sm font-medium">AI Training & Consulting</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold lg:font-bold leading-tight text-white">
                {/* Mobile layout */}
                <span className="block lg:hidden text-center">
                  <span className="block font-semibold">Transform Your Organization</span>
                  <span className="block text-slate-300 font-medium text-base sm:text-lg my-1">by</span>
                  <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Strengthening AI Capabilities
                  </span>
                </span>

                {/* Desktop layout */}
                <span className="hidden lg:block">
                  Transform Your Organization by
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                    Strengthening AI Capabilities
                  </span>
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed 
              max-w-2xl pr-0 lg:pr-8 text-center lg:text-left mx-auto lg:mx-0">
                AI literacy and fluency training to build core understanding and practical skills for automation that works. Bridge the gap between AI possibility and hands-on implementation.
              </p>

            </div>

            {/* Right Illustration - Takes 1 column on desktop (33.33%) */}
            <div className="lg:col-span-1 w-full">
              <HeroIllustration />
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 md:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 
                       text-center mb-8 md:mb-12">
            Testimonials
          </h2>
          <Testimonials />
        </div>
      </div>
    </div>
  );
}