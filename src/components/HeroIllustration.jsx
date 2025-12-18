import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Sparkles } from 'lucide-react';

const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function HeroIllustration() {
  const [heroData, setHeroData] = useState(null);
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const HERO_URL = `${BASE_URL}/api/method/memoric_frappe.api.memoric_settings.get_hero_announcement`

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          HERO_URL,
          {
            headers: {
              "Authorization": `token ${API_TOKEN}`,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              "Pragma": "no-cache",
            },
            cache: "no-store",
          }
        );
        const data = await response.json();
        setHeroData(data.message);
        console.log('Hero Settings Data:', data.message);

        if (data.message?.hero_batch) {
          fetchBatchDetails(data.message.hero_batch);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching hero settings:', error);
        setLoading(false);
      }
    };

    fetchHeroSettings();
  }, []);

  const fetchBatchDetails = async (batchName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/method/frappe.client.get?doctype=LMS%20Batch&name=${batchName}`,
        {
          headers: {
            "Authorization": `token ${API_TOKEN}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      setBatchDetails(data.message);
    } catch (error) {
      console.error('Error fetching batch details:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 blur-3xl animate-pulse" />
        </div>
        <span className="text-white/60 text-sm">Loading announcement…</span>
      </div>
    );
  }

  /* ---------------- GIF only ---------------- */
  if (!batchDetails && heroData?.hero_gifimage) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center p-4">
          <img
            src={`${BASE_URL}${heroData.hero_gifimage}`}
            alt="Announcement visual"
            className="w-full h-full object-contain"
          />
        </Card>
      </div>
    );
  }

  /* ---------------- Announcement ---------------- */
  if (batchDetails) {
    return (
      <div className="relative w-full">
        {/* Announcement badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="
            bg-white/10 backdrop-blur-sm
            border border-white/20
            text-white
            px-3 py-1
            text-xs font-medium
            shadow-lg
            flex items-center gap-1.5
          ">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Batch Announcement
          </Badge>

        </div>
        {/* subtle glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <Card className="
          mt-4
          bg-white/10 backdrop-blur-sm
          border border-white/20
          rounded-2xl
          shadow-xl
          overflow-hidden
        ">
          <div className="
            absolute top-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-blue-400 to-purple-400
          " />
          <div className="p-4 md:p-6 space-y-4">
            {/* Title */}
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white leading-snug">
              {batchDetails.title}
            </h3>

            {/* Description */}
            {batchDetails.description && (
              <p className="text-xs md:text-sm text-slate-300 line-clamp-2">
                {batchDetails.description}
              </p>
            )}

            {/* Info */}
            <div className="grid gap-3 text-xs md:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(batchDetails.start_date)} – {formatDate(batchDetails.end_date)}
              </div>

              {batchDetails.start_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatTime(batchDetails.start_time)} – {formatTime(batchDetails.end_time)} {batchDetails.timezone}
                </div>
              )}

              {batchDetails.seat_count && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {batchDetails.seat_count} seats announced
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
    <Card className="h-64 md:h-80 lg:h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center">
      <div className="text-center text-white">
        <h3 className="text-xl font-bold">Coming Soon</h3>
        <p className="text-sm text-slate-300">New announcements on the way</p>
      </div>
    </Card>
  );
}