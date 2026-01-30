import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BATCH_API_URL = import.meta.env.VITE_BATCH_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const LMS_BATCH_URL = import.meta.env.VITE_LMS_BATCH_URL;

export default function Courses() {
  const [batches, setBatches] = useState([]);
  const [batchLoading, setBatchLoading] = useState(true);

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(timeStr) {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function getBatchStartDateTime(batch) {
    if (!batch.start_date || !batch.start_time) return null;
    return new Date(`${batch.start_date}T${batch.start_time}`);
  }

  function getDurationInDays(startDate, endDate) {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays + 1;
  }


  function cleanCourseTitle(title) {
    if (!title) return "";
    return title.replace(/\s*-\s*#.*$/, "").trim();
  }

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(BATCH_API_URL, {
          headers: { Authorization: `token ${API_TOKEN}` },
        });
        const data = await res.json();
        setBatches(data.message);
      } catch (err) {
        console.error("Error fetching batches:", err);
      } finally {
        setBatchLoading(false);
      }
    };
    fetchBatches();
  }, []);

  if (batchLoading)
    return (
      <div className="text-center py-12 md:py-20 text-slate-500">
        <div className="animate-pulse text-sm md:text-base">Loading content...</div>
      </div>
    );

  const now = new Date();
  const filteredBatches = batches.filter((batch) => {
    if (batch.custom_show_on_site !== 1) return false;
    const batchStart = getBatchStartDateTime(batch);
    if (!batchStart) return false;
    return batchStart > now;
  });

  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-slate-900 mb-3 md:mb-4 lg:mb-6 tracking-tight">
            Individual Courses
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Practical courses designed to help you implement AI effectively.
          </p>
        </div>

        {/* Courses Grid */}
        {filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {filteredBatches.map((batch) => {
              const instructors = batch.instructors || [];
              return (
                <Card
                  key={batch.name}
                  className="flex flex-col h-full rounded-xl border-2 border-slate-100
                           bg-white shadow-sm hover:border-slate-900 hover:shadow-xl
                           transition-all duration-300"
                >
                  {/* Main Content */}
                  <div className="flex flex-col gap-3 md:gap-4 px-4 md:px-5 flex-grow">

                    {/* Title */}
                    <h3 className="text-center text-base sm:text-lg md:text-xl font-bold 
                                 text-slate-900 leading-snug ">
                      {cleanCourseTitle(batch.title)}
                    </h3>

                    {/* Duration · Mode · Price */}
                    <div className="flex flex-wrap items-center justify-center 
                                  gap-x-2 gap-y-1 text-xs md:text-sm text-slate-700">
                      <span className="font-semibold text-slate-900 underline">
                        {getDurationInDays(batch.start_date, batch.end_date)} day
                        {getDurationInDays(batch.start_date, batch.end_date) > 1 ? "s" : ""}
                      </span>
                      <span>·</span>
                      <span className="font-semibold text-slate-900">
                        {batch?.paid_batch ? "Paid Certified Course" : "Free Course"}
                      </span>

                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col items-center gap-1.5 text-xs md:text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700 flex-shrink-0"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth="2"
                            d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-slate-700">
                          {formatDate(batch.start_date)} – {formatDate(batch.end_date)}
                        </span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="flex flex-col gap-2 md:gap-3 border border-slate-200 
                                  rounded-lg bg-slate-50 p-2 md:p-3 text-xs md:text-sm">

                      <div>
                        <div className="font-semibold text-slate-900">
                          Course Outline
                        </div>
                        <div className="text-slate-600 leading-relaxed line-clamp-3">
                          {batch.description || "Brief description of the course"}
                        </div>
                      </div>

                      <div className="text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-900">Instructor:</span>{" "}
                        {instructors?.length > 0 ? (
                          instructors.map((inst, idx) => (
                            <span key={inst.id}>
                              {inst.full_name}
                              {inst.bio ? `, ${inst.bio}` : ""}
                              {idx < instructors.length - 1 ? " | " : ""}
                            </span>
                          ))
                        ) : (
                          "Instructor details coming soon"
                        )}
                      </div>

                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-900">Prerequisite:</span>{" "}
                        {batch.custom_prerequisite || "None"}
                      </div>

                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-900">Seats:</span>{" "}
                        {batch.seat_count || "Unlimited"}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="px-4 md:px-5 pt-0">
                    {batch.published === 1 ? (
                      <Link to={`/enroll/${batch.name}`} className="block">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 ...">
                          Details & Enrollment
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className="w-full py-3 md:py-4 text-sm md:text-base rounded-lg
                                 bg-slate-200 text-slate-500 font-semibold cursor-not-allowed"
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 md:py-10 text-slate-500 text-sm md:text-base">
            No courses available at the moment.
          </div>
        )}

      </div>
    </div>
  );
}