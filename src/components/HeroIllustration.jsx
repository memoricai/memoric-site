import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';

const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const HERO_API_URL = import.meta.env.VITE_HERO_API_URL;

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.aac', '.flac', '.m4a', '.oga'];

function isVideo(url) {
  return VIDEO_EXTENSIONS.some(ext => url.toLowerCase().includes(ext));
}

function isAudio(url) {
  return AUDIO_EXTENSIONS.some(ext => url.toLowerCase().includes(ext));
}

function resolveUrl(raw) {
  const trimmed = typeof raw === 'string' ? raw.trim() : '';
  if (!trimmed) return '';
  if (trimmed.startsWith('http')) return trimmed;
  return trimmed.startsWith('/') ? `${BASE_URL}${trimmed}` : `${BASE_URL}/${trimmed}`;
}

/* ---------- Global mute button (top-right corner) ---------- */
function MuteButton({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-all duration-200 shadow-lg"
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
}

/* ---------- Audio-only slide ---------- */
function AudioSlide({ src, active, muted }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  return (
    <div
      style={{ display: active ? 'flex' : 'none' }}
      className="flex-col items-center justify-center gap-4 w-full h-full"
    >
      {/* Visual waveform placeholder */}
      <div className="flex items-end gap-1 h-16">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-300 ${
              active && !muted ? 'bg-blue-400 animate-pulse' : 'bg-white/30'
            }`}
            style={{
              height: `${20 + Math.sin((i / 19) * Math.PI * 3) * 30 + 10}px`,
              animationDelay: `${i * 60}ms`,
              animationDuration: `${600 + (i % 5) * 120}ms`,
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
        <Music className="w-4 h-4 text-blue-400" />
        <span>Audio</span>
      </div>

      <audio ref={audioRef} src={src} loop muted={muted} />
    </div>
  );
}

/* ---------- Single video slide ---------- */
function VideoSlide({ src, active, muted, onEnded }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted={muted}
      loop={!onEnded}
      playsInline
      onEnded={onEnded}
      className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
      style={{ display: active ? 'block' : 'none' }}
    />
  );
}

/* ---------- Single image slide ---------- */
function ImageSlide({ src, active }) {
  return (
    <img
      src={src}
      alt="Announcement"
      className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
      style={{ display: active ? 'block' : 'none' }}
    />
  );
}

/* ---------- Unified slide dispatcher ---------- */
function Slide({ src, active, muted, onEnded }) {
  if (isVideo(src)) return <VideoSlide src={src} active={active} muted={muted} onEnded={onEnded} />;
  if (isAudio(src)) return <AudioSlide src={src} active={active} muted={muted} />;
  return <ImageSlide src={src} active={active} />;
}

/* ---------- Slide type badge ---------- */
function SlideTypeBadge({ src }) {
  if (isVideo(src)) {
    return (
      <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        Video
      </div>
    );
  }
  if (isAudio(src)) {
    return (
      <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1.5">
        <Music className="w-3 h-3 text-blue-400" />
        Audio
      </div>
    );
  }
  return null;
}

/* ---------- Dot indicator ---------- */
function SlideDot({ src, active, onClick, index }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
      className={`transition-all duration-300 rounded-full ${
        active
          ? 'bg-white w-6 sm:w-8 h-1.5 sm:h-2 shadow-lg'
          : isVideo(src)
          ? 'bg-red-400/80 hover:bg-red-300 w-1.5 sm:w-2 h-1.5 sm:h-2'
          : isAudio(src)
          ? 'bg-blue-400/80 hover:bg-blue-300 w-1.5 sm:w-2 h-1.5 sm:h-2'
          : 'bg-white/60 hover:bg-white/80 w-1.5 sm:w-2 h-1.5 sm:h-2'
      }`}
    />
  );
}

export default function HeroIllustration() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Start muted — browsers block autoplay with sound; user can unmute
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(HERO_API_URL, {
          headers: {
            Authorization: `token ${API_TOKEN}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
          cache: 'no-store',
        });
        const data = await response.json();
        setHeroData(data.message);
      } catch (error) {
        console.error('Error fetching hero settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroSettings();
  }, []);

  const media = useMemo(() => {
    const raw = heroData?.hero_gifimage;
    if (!raw) return [];
    let list = [];
    if (Array.isArray(raw)) {
      list = raw;
    } else if (typeof raw === 'string' && raw.includes(',')) {
      list = raw.split(',');
    } else if (typeof raw === 'string') {
      list = [raw];
    }
    return list.map(resolveUrl).filter(Boolean);
  }, [heroData]);

  const batchDetails = heroData?.batch;

  /* Auto-advance: images 5s, audio 10s, videos wait for onEnded */
  useEffect(() => {
    if (media.length <= 1) return;
    const current = media[currentIndex];
    if (isVideo(current)) return; // video/audio advance via onEnded / timeout

    const duration = isAudio(current) ? 10000 : 5000;
    const timer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % media.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, media]);

  const next = () => setCurrentIndex(prev => (prev + 1) % media.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + media.length) % media.length);



  const formatDate = dateStr => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  };

  const formatTime = timeStr => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const d = new Date();
    d.setHours(h, m);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
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

  /* ---------------- Media carousel ---------------- */
  if (!batchDetails && media.length > 0) {
    const currentSrc = media[currentIndex];
    const currentIsVideo = isVideo(currentSrc);

    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <Card className="w-full aspect-[4/3] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-0">
          <div className="relative w-full h-full">

            {/* Slides */}
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6">
              {media.map((src, idx) => (
                <Slide
                  key={src}
                  src={src}
                  active={idx === currentIndex}
                  muted={muted}
                  /* Only pass onEnded for video slides that should auto-advance */
                  onEnded={isVideo(src) ? next : undefined}
                />
              ))}
            </div>

            {/* Edge gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900/20 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900/20 to-transparent" />
            </div>

            {/* Slide type badge (top-left) */}
            <SlideTypeBadge src={currentSrc} />

            {/* Mute / unmute button — only shown on video slides */}
            {currentIsVideo && (
              <MuteButton muted={muted} onToggle={() => setMuted(m => !m)} />
            )}

            {/* Nav controls */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-full p-2 sm:p-2.5 opacity-80 hover:opacity-100 transition-all duration-300 border border-white/50 shadow-xl z-20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={next}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-full p-2 sm:p-2.5 opacity-80 hover:opacity-100 transition-all duration-300 border border-white/50 shadow-xl z-20"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
                  {media.map((src, idx) => (
                    <SlideDot
                      key={idx}
                      src={src}
                      active={idx === currentIndex}
                      index={idx}
                      onClick={() => setCurrentIndex(idx)}
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

  /* ---------------- Batch announcement ---------------- */
  if (batchDetails) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 text-xs font-medium shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Batch Announcement
          </Badge>
        </div>

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

            <div className="grid gap-3 text-xs md:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{formatDate(batchDetails.start_date)} – {formatDate(batchDetails.end_date)}</span>
              </div>

              {batchDetails.start_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{formatTime(batchDetails.start_time)} – {formatTime(batchDetails.end_time)} {batchDetails.timezone}</span>
                </div>
              )}

              {batchDetails.seat_count && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>{batchDetails.seat_count} seats announced</span>
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