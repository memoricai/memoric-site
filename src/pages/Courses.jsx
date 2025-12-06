import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COURSE_API_URL = import.meta.env.VITE_COURSE_API_URL;
const BATCH_API_URL = import.meta.env.VITE_BATCH_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LMS_COURSE_URL = import.meta.env.VITE_LMS_COURSE_URL;
const LMS_BATCH_URL = import.meta.env.VITE_LMS_BATCH_URL;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchLoading, setBatchLoading] = useState(true);

  // ⭐ Date Formatter
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ⭐ Time Formatter
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

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(COURSE_API_URL, {
          headers: { Authorization: `token ${API_TOKEN}` },
        });
        const data = await res.json();
        setCourses(data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch Batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(BATCH_API_URL, {
          headers: { Authorization: `token ${API_TOKEN}` },
        });
        const data = await res.json();
        setBatches(data.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
      } finally {
        setBatchLoading(false);
      }
    };
    fetchBatches();
  }, []);

  if (loading || batchLoading)
    return (
      <div className="text-center py-20 text-slate-500">
        <div className="animate-pulse">Loading content...</div>
      </div>
    );

  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-6">

        {/* COURSES SECTION */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">Our Courses</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Master AI with Expert-Led Training
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Practical courses designed to help you implement AI effectively.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {courses
            .filter((course) => course.published === 1)
            .map((course) => (
              <Card
                key={course.name}
                className="p-0 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden h-full"
              >
                {/* Image Section */}
                <div className="w-full h-48 overflow-hidden">
                  {course.image ? (
                    <img
                      src={`${BASE_URL}${course.image}`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-lg font-bold text-center px-4"
                      style={{
                        background: `linear-gradient(180deg, #cba3f5 0%, #000000 100%)`,
                      }}
                    >
                      {course.title}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <div className="flex-grow">

                    {/* ⭐ Category */}
                    {course.category && (
                      <Badge className="mb-3 bg-slate-100 text-slate-900 hover:bg-slate-200 font-medium">
                        {course.category}
                      </Badge>
                    )}

                    <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {course.short_introduction}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.paid_course ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                        Paid – {course.course_price ? `₹${course.course_price}` : "Contact us"}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                        Free
                      </span>
                    )}

                    {course.enable_certification === 1 && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
                        Certificate
                      </span>
                    )}

                    {course.paid_certificate === 1 && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                        Paid Certificate
                      </span>
                    )}
                  </div>

                  <a
                    href={`${LMS_COURSE_URL}?course=${course.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 cursor-pointer">
                      Enroll Now
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
        </div>

        {/* BATCHES SECTION */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">Upcoming Batches</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">
            Join a Live Batch
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Attend instructor-led live classes and interactive sessions.
          </p>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {batches
            .filter((batch) => batch.published === 1)
            .map((batch) => (
              <Card
                key={batch.name}
                className="p-6 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white h-full"
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">
                    {batch.title}
                  </h3>

                  {/* ⭐ Seats Left */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                      {batch.seat_count ? `${batch.seat_count} Seats` : "Unlimited Seats"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {batch.description}
                  </p>

                  {/* ⭐ Updated Detailed Block */}
                  <div className="text-sm text-slate-600 space-y-3 mb-2 bg-slate-50 p-4 rounded-lg">

                    {/* Date Range */}
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth="2" d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(batch.start_date)} – {formatDate(batch.end_date)}</span>
                    </div>

                    {/* Time Range */}
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatTime(batch.start_time)} – {formatTime(batch.end_time)}</span>
                    </div>

                    {/* Timezone */}
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-18v18m9-9H3" />
                      </svg>
                      <span className="font-medium">{batch.timezone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Price Badge */}
                <div className="mb-4">
                  {batch.paid_batch ? (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                      {(() => {
                        if (!batch.amount) return "Paid - Contact us";

                        let symbol = "";
                        if (batch.currency === "INR") symbol = "₹";
                        else if (batch.currency === "USD") symbol = "$";
                        else symbol = batch.currency ? batch.currency + " " : "";

                        return `Paid - ${symbol}${batch.amount}`;
                      })()}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                      Free
                    </span>
                  )}
                </div>

                <a
                  href={`${LMS_BATCH_URL}?batch=${batch.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 cursor-pointer">
                    Join Batch
                  </Button>
                </a>
              </Card>
            ))}
        </div>

      </div>
    </div>
  );
}
