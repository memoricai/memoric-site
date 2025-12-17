import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LMS_BATCH_URL = import.meta.env.VITE_LMS_BATCH_URL;

export default function HeroIllustration() {
  const [heroData, setHeroData] = useState(null);
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Memoric Settings
  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/method/frappe.client.get?doctype=Memoric%20Settings&name=Memoric%20Settings`,
          {
            headers: { Authorization: `token ${API_TOKEN}` }
          }
        );
        const data = await response.json();
        setHeroData(data.message);

        // If hero_batch exists, fetch batch details
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

  // Fetch specific batch details
  const fetchBatchDetails = async (batchName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/method/frappe.client.get?doctype=LMS%20Batch&name=${batchName}`,
        {
          headers: { Authorization: `token ${API_TOKEN}` }
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

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative text-white/60 text-lg">Loading...</div>
      </div>
    );
  }

  // Render GIF if no batch but GIF exists
  if (!batchDetails && heroData?.hero_gifimage) {
    return (
      <div className="relative w-full h-80 md:h-96">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <Card className="relative h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={`${BASE_URL}${heroData.hero_gifimage}`}
            alt="Hero Animation"
            className="w-full h-full object-contain p-4"
          />
        </Card>
      </div>
    );
  }

  // Render batch details if available
  if (batchDetails) {
    return (
      <div className="relative w-full h-80 md:h-96">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative h-full flex items-center justify-center p-4">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-lg w-full">
            <Badge className="mb-4 bg-blue-400/20 text-blue-200 border-blue-300/30 px-3 py-1.5 text-sm">
              {batchDetails.paid_batch ? '💎 PREMIUM COURSE' : '🎓 FREE COURSE'}
            </Badge>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {batchDetails.title}
            </h3>
            
            <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">
              {batchDetails.description || 'Transform your skills with expert-led training'}
            </p>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(batchDetails.start_date)} – {formatDate(batchDetails.end_date)}</span>
              </div>

              {batchDetails.start_time && (
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatTime(batchDetails.start_time)} – {formatTime(batchDetails.end_time)} {batchDetails.timezone}</span>
                </div>
              )}

              {batchDetails.seat_count && (
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{batchDetails.seat_count} seats available</span>
                </div>
              )}
            </div>

            {batchDetails.published === 1 && (
              <a
                href={`${LMS_BATCH_URL}?batch=${batchDetails.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-4 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Enroll Now →
                </Button>
              </a>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Fallback if neither batch nor GIF
  return (
    <div className="relative w-full h-80 md:h-96">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <Card className="relative h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
          <p className="text-slate-300">Exciting courses on the way!</p>
        </div>
      </Card>
    </div>
  );
}