import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "This training completely changed how our teams think about automation. We moved from theory to real workflows in weeks.",
    name: "Ananya Sharma",
    role: "Head of Operations",
    company: "FinTech Startup",
  },
  {
    quote:
      "The most practical AI program we've attended. No hype—just clear frameworks and hands-on implementation.",
    name: "Rohit Mehta",
    role: "CTO",
    company: "SaaS Company",
  },
  {
    quote:
      "Our non-technical teams finally feel confident using AI tools. The ROI was immediate.",
    name: "Priya Nair",
    role: "HR Director",
    company: "Enterprise Org",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const handleNavigation = (newDirection) => {
    if (animating) return; // Prevent rapid navigation during animation
    setAnimating(true);
    setDirection(newDirection);

    setTimeout(() => {
      setIndex((prevIndex) => {
        const nextIndex =
          newDirection === "right"
            ? (prevIndex + 1) % testimonials.length
            : (prevIndex - 1 + testimonials.length) % testimonials.length;
        return nextIndex;
      });
      setAnimating(false);
    }, 500); // Duration matches the CSS animation
  };

  const t = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-6 overflow-hidden">
        {/* Left Chevron Button */}
        <button
          onClick={() => handleNavigation("left")}
          className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border-slate-300 border-2 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all"
          aria-label="Previous Testimonial"
          disabled={animating}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Testimonial Card with Animation */}
        <div
          className={`flex-1 transition-transform duration-500 ${
            animating
              ? direction === "right"
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <Card className="p-8 md:p-10 border-2 border-slate-100 hover:border-slate-900 transition-all duration-300 bg-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Quote className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-lg md:text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-lg text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-600 font-medium">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={() => handleNavigation("right")}
          className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border-slate-300 border-2 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all"
          aria-label="Next Testimonial"
          disabled={animating}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Buttons - Only visible on mobile */}
      <div className="flex md:hidden justify-between mt-6">
        <button
          onClick={() => handleNavigation("left")}
          className="flex items-center justify-center w-10 h-10 rounded-full border-slate-300 border-2 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all"
          aria-label="Previous Testimonial"
          disabled={animating}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleNavigation("right")}
          className="flex items-center justify-center w-10 h-10 rounded-full border-slate-300 border-2 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all"
          aria-label="Next Testimonial"
          disabled={animating}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex md:hidden justify-center mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNavigation(i > index ? "right" : "left")}
            className={`w-3 h-3 mx-1 rounded-full transition-all ${
              i === index
                ? "bg-slate-900 scale-125"
                : "bg-slate-400 hover:bg-slate-600"
            }`}
            disabled={animating}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}