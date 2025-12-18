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

  /* -------------------------------------------------- */
  /* ENV DEBUG */
  /* -------------------------------------------------- */
  useEffect(() => {
    console.log('🟦 ENV CHECK');
    console.log('BASE_URL:', BASE_URL);
    console.log('API_TOKEN exists:', !!API_TOKEN);
  }, []);

  /* -------------------------------------------------- */
  /* HERO SETTINGS FETCH */
  /* -------------------------------------------------- */
  useEffect(() => {
    const fetchHeroSettings = async () => {
      console.log('🟨 Fetching Hero Settings...');

      try {
        const response = await fetch(
          `${BASE_URL}/api/method/frappe.client.get?doctype=Memoric%20Settings&name=Memoric%20Settings`,
          { headers: { Authorization: `token ${API_TOKEN}` } }
        );

        console.log('🟨 Hero API status:', response.status);

        const data = await response.json();
        console.log('🟨 Hero API response:', data);

        if (!data?.message) {
          console.error('❌ Hero Settings message is missing');
          setLoading(false);
          return;
        }

        setHeroData(data.message);
        console.log('🟩 Hero Settings stored:', data.message);

        if (data.message.hero_batch) {
          console.log('🟦 hero_batch found:', data.message.hero_batch);
          fetchBatchDetails(data.message.hero_batch);
        } else {
          console.warn('⚠️ No hero_batch set');
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Hero Settings fetch failed:', error);
        setLoading(false);
      }
    };

    fetchHeroSettings();
  }, []);

  /* -------------------------------------------------- */
  /* BATCH FETCH */
  /* -------------------------------------------------- */
  const fetchBatchDetails = async (batchName) => {
    console.log('🟨 Fetching Batch:', batchName);

    try {
      const response = await fetch(
        `${BASE_URL}/api/method/frappe.client.get?doctype=LMS%20Batch&name=${batchName}`,
        { headers: { Authorization: `token ${API_TOKEN}` } }
      );

      console.log('🟨 Batch API status:', response.status);

      const data = await response.json();
      console.log('🟨 Batch API response:', data);

      if (!data?.message) {
        console.error('❌ Batch message missing');
        return;
      }

      setBatchDetails(data.message);
      console.log('🟩 Batch stored:', data.message);
    } catch (error) {
      console.error('❌ Batch fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------- */
  /* LOADING */
  /* -------------------------------------------------- */
  if (loading) {
    console.log('⏳ Loading state...');
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
        <span className="text-white/60 text-sm">Loading announcement…</span>
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* PRIORITY: BATCH */
  /* -------------------------------------------------- */
  if (batchDetails) {
    console.log('🎯 Rendering BATCH announcement');
    return (
      <div className="relative w-full">
        <Card className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold">
            {batchDetails.title}
          </h3>
        </Card>
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* PRIORITY: GIF */
  /* -------------------------------------------------- */
  if (heroData?.hero_gifimage) {
    console.log('🎞 Rendering GIF');
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Card className="h-full flex items-center justify-center">
          <img
            src={`${BASE_URL}${heroData.hero_gifimage}`}
            alt="Hero GIF"
            className="w-full h-full object-contain"
          />
        </Card>
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* FALLBACK */
  /* -------------------------------------------------- */
  console.log('⚠️ Rendering FALLBACK');
  return (
    <Card className="h-64 flex items-center justify-center">
      <div className="text-white">Coming Soon</div>
    </Card>
  );
}
