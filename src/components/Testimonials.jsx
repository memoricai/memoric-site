import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const TESTIMONIAL_API_URL = import.meta.env.VITE_TESTIMONIALS_API_URL;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${TESTIMONIAL_API_URL}`,
          {
            headers: {
              Authorization: `token ${API_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setTestimonials(result.data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleNavigation = (newDirection) => {
    if (animating || testimonials.length === 0) return;
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
    }, 500);
  };

  if (loading) {
    return (
      <div className="relative max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse flex items-center justify-center gap-6">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="flex-1 h-64 bg-slate-200 rounded-2xl"></div>
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No testimonials available at the moment.
      </div>
    );
  }

  const t = testimonials[index];

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8">
        {/* Left Chevron */}
        <button
          onClick={() => handleNavigation("left")}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full 
                     border-2 border-slate-300 text-slate-600 
                     hover:text-slate-900 hover:border-slate-900 
                     transition-all duration-300 disabled:opacity-50"
          aria-label="Previous Testimonial"
          disabled={animating}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Testimonial Card */}
        <div className="flex-1 overflow-hidden">
          <div
            className={`transition-all duration-500 ${
              animating
                ? direction === "right"
                  ? "translate-x-full opacity-0"
                  : "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <Card className="p-8 lg:p-10 border-2 border-slate-100 hover:border-slate-900 
                           transition-all duration-300 bg-white shadow-lg">
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                {/* Avatar/Quote Icon */}
                <div className="flex-shrink-0">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center ${
                      t.avatar ? "hidden" : "flex"
                    }`}
                  >
                    <Quote className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {t.quote && (
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      "{t.quote}"
                    </h4>
                  )}
                  <p className="text-base lg:text-lg text-slate-700 italic mb-6 leading-relaxed">
                    "{t.content}"
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <h5 className="font-bold text-lg text-slate-900">{t.author}</h5>
                    <p className="text-sm text-slate-600 font-medium mt-1">
                      {t.role}
                      {t.company && ` · ${t.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Chevron */}
        <button
          onClick={() => handleNavigation("right")}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full 
                     border-2 border-slate-300 text-slate-600 
                     hover:text-slate-900 hover:border-slate-900 
                     transition-all duration-300 disabled:opacity-50"
          aria-label="Next Testimonial"
          disabled={animating}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div
          className={`transition-all duration-500 ${
            animating
              ? direction === "right"
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <Card className="p-6 border-2 border-slate-100 hover:border-slate-900 
                         transition-all duration-300 bg-white shadow-lg">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Avatar/Quote Icon */}
              <div className="flex-shrink-0">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center ${
                    t.avatar ? "hidden" : "flex"
                  }`}
                >
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div>
                {t.quote && (
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    "{t.quote}"
                  </h4>
                )}
                <p className="text-sm text-slate-700 italic mb-4 leading-relaxed">
                  "{t.content}"
                </p>
                <div className="border-t border-slate-100 pt-4">
                  <h5 className="font-bold text-base text-slate-900">{t.author}</h5>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {t.role}
                    {t.company && ` · ${t.company}`}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-between items-center mt-6 px-4">
          <button
            onClick={() => handleNavigation("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full 
                       border-2 border-slate-300 text-slate-600 
                       hover:text-slate-900 hover:border-slate-900 
                       transition-all duration-300"
            aria-label="Previous Testimonial"
            disabled={animating}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!animating) {
                    setDirection(i > index ? "right" : "left");
                    handleNavigation(i > index ? "right" : "left");
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index
                    ? "bg-slate-900 w-6"
                    : "bg-slate-300 hover:bg-slate-500"
                }`}
                disabled={animating}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleNavigation("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full 
                       border-2 border-slate-300 text-slate-600 
                       hover:text-slate-900 hover:border-slate-900 
                       transition-all duration-300"
            aria-label="Next Testimonial"
            disabled={animating}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}