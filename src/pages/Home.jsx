import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Testimonials from "../components/Testimonials";
import HeroIllustration from "../components/HeroIllustration";
import logo from "../assets/MemoricAILogo.svg";

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
          <div className="lg:hidden space-y-6">
            {/* Text Content */}
            <div className="text-white space-y-5 text-center">
              {/* MOBILE LOGO */}
              <div className="flex justify-center mb-2">
                <img
                  src={logo}
                  alt="Memoric AI"
                  className="h-32 sm:h-40 w-auto object-contain drop-shadow-2xl rounded-xl"
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold leading-tight px-2">
                <span className="block font-semibold">Transform Your Organization</span>
                <span className="block text-slate-300 font-medium text-base my-1">by</span>
                <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Strengthening AI Capabilities
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto px-4">
                AI literacy and fluency training to build core understanding and practical skills for automation that works. Bridge the gap between AI possibility and hands-on implementation.
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="w-full flex items-center justify-center">
              <HeroIllustration />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-12 items-center">
            {/* Left Side - Logo and Text - ALL CENTERED */}
            <div className="text-white space-y-5 xl:space-y-6 text-center">
              {/* DESKTOP LOGO - BIG - CENTERED */}
              <div className="flex justify-center mb-2">
                <img
                  src={logo}
                  alt="Memoric AI"
                  className="h-48 xl:h-56 2xl:h-64 w-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
              
              <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-tight">
                Transform Your Organization by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                  Strengthening AI Capabilities
                </span>
              </h1>

              <p className="text-base xl:text-lg text-slate-300 leading-relaxed">
                AI literacy and fluency training to build core understanding and practical skills for automation that works. Bridge the gap between AI possibility and hands-on implementation.
              </p>
            </div>

            {/* Right Side - Hero Illustration - Flexible Height */}
            <div className="w-full flex items-center justify-center">
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