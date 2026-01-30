import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const HERO_API_URL = import.meta.env.VITE_HERO_API_URL;

export default function HeroIllustration() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(HERO_API_URL, {
          headers: {
            Authorization: `token ${API_TOKEN}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          cache: "no-store",
        });

        const data = await response.json();
        setHeroData(data.message);
      } catch (error) {
        console.error("Error fetching hero settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSettings();
  }, []);

  const batchDetails = heroData?.batch;

  // Parse images - support both single image and array
  const images = React.useMemo(() => {
    if (!heroData?.hero_gifimage) return [];

    // If it's already an array (from slideshow or API)
    if (Array.isArray(heroData.hero_gifimage)) {
      return heroData.hero_gifimage.map(img => {
        // Handle both absolute and relative paths
        if (img.startsWith('http')) return img;
        return img.startsWith('/') ? `${BASE_URL}${img}` : `${BASE_URL}/${img}`;
      });
    }

    // If it's a comma-separated string
    if (typeof heroData.hero_gifimage === 'string' && heroData.hero_gifimage.includes(',')) {
      return heroData.hero_gifimage.split(',').map(img => {
        const trimmed = img.trim();
        if (trimmed.startsWith('http')) return trimmed;
        return trimmed.startsWith('/') ? `${BASE_URL}${trimmed}` : `${BASE_URL}/${trimmed}`;
      });
    }

    // Single image
    const img = heroData.hero_gifimage;
    if (img.startsWith('http')) return [img];
    return img.startsWith('/') ? [`${BASE_URL}${img}`] : [`${BASE_URL}/${img}`];
  }, [heroData]);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const d = new Date();
    d.setHours(h, m);
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 blur-3xl animate-pulse" />
        </div>
        <span className="text-white/60 text-sm">Loading announcement…</span>
      </div>
    );
  }

  /* ---------------- Image Gallery/Carousel ---------------- */
  if (!batchDetails && images.length > 0) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <Card className="w-full aspect-[4/3] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-0">
          <div className="relative w-full h-full group">
            {/* Main Image Container */}
            <div className="absolute inset-0 flex justify-center items-center p-2 sm:p-4 md:p-6">
              <img
                key={images[currentImageIndex]} 
                src={images[currentImageIndex]} 
                alt={`Announcement ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900/20 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900/20 to-transparent" />
            </div>

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-full p-2 sm:p-2.5 opacity-80 hover:opacity-100 transition-all duration-300 border border-white/50 shadow-xl z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-full p-2 sm:p-2.5 opacity-80 hover:opacity-100 transition-all duration-300 border border-white/50 shadow-xl z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'bg-white w-6 sm:w-8 shadow-lg'
                          : 'bg-white/60 hover:bg-white/80 w-1.5 sm:w-2'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- Announcement ---------------- */
  if (batchDetails) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Announcement badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 text-xs font-medium shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Batch Announcement
          </Badge>
        </div>

        {/* Subtle glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <Card className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400" />
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white leading-snug">
              {batchDetails.title}
            </h3>

            {batchDetails.description && (
              <p className="text-xs md:text-sm text-slate-300 line-clamp-2">
                {batchDetails.description}
              </p>
            )}

            <div className="grid gap-3 text-sm md:text-base text-slate-300">
              <div className="grid gap-3 text-xs md:text-sm text-slate-300">
               <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm md:text-base">
                  {formatDate(batchDetails.start_date)} – {formatDate(batchDetails.end_date)}
                </span>
              </div>

              {batchDetails.start_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    {formatTime(batchDetails.start_time)} – {formatTime(batchDetails.end_time)} {batchDetails.timezone}
                  </span>
                </div>
              )}

              {batchDetails.seat_count && (
                <div className="flex items-center gap-2">
                   <Users className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    {batchDetails.seat_count} seats announced
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- Fallback ---------------- */
  return (
    <Card className="w-full max-w-2xl mx-auto aspect-[4/3] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center">
      <div className="text-center text-white">
        <h3 className="text-xl font-bold">Coming Soon</h3>
        <p className="text-sm text-slate-300">New announcements on the way</p>
      </div>
    </Card>
  );
}