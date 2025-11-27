import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
              Transform Your Business with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                Practical AI Solutions
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Expert research, consulting, and training to help organizations adopt artificial intelligence 
              responsibly and effectively. Bridge the gap between AI possibility and practical implementation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById('courses');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-base font-semibold group"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="outline" 
                className="border-white/30 text-slate-900 hover:bg-white/10 px-8 py-6 text-base font-semibold"
              >
                Contact Us
              </Button>
            </div>
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
      {/* Feature Cards Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-2 border-slate-100 hover:border-slate-900 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Training</h3>
            <p className="text-slate-600 leading-relaxed">
              Hands-on AI courses designed for executives, educators, and teams looking to build practical skills.
            </p>
          </Card>

          <Card className="p-8 border-2 border-slate-100 hover:border-slate-900 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Strategic Consulting</h3>
            <p className="text-slate-600 leading-relaxed">
              Guide your organization through secure AI implementation with our expert consulting services.
            </p>
          </Card>

          <Card className="p-8 border-2 border-slate-100 hover:border-slate-900 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔬</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Research Driven</h3>
            <p className="text-slate-600 leading-relaxed">
              Cutting-edge research on AI governance and economic impact to inform better decisions.
            </p>
          </Card>
        </div>
      </div>

    </div>
  );
}