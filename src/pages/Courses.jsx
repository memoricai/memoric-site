import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// const COURSE_API_URL = import.meta.env.VITE_COURSE_API_URL;
const BATCH_API_URL = import.meta.env.VITE_BATCH_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
// const LMS_COURSE_URL = import.meta.env.VITE_LMS_COURSE_URL;
const LMS_BATCH_URL = import.meta.env.VITE_LMS_BATCH_URL;

export default function Courses() {
  // const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  // const [loading, setLoading] = useState(true);
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

  function getBatchStartDateTime(batch) {
    if (!batch.start_date || !batch.start_time) return null;
    return new Date(`${batch.start_date}T${batch.start_time}`);
  }

  function getDurationInDays(startDate, endDate) {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset time to avoid timezone issues
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Inclusive count
    return diffDays + 1;
  }


  // // Fetch Courses
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const res = await fetch(COURSE_API_URL, {
  //         headers: { Authorization: `token ${API_TOKEN}` },
  //       });
  //       const data = await res.json();
  //       setCourses(data.data);
  //     } catch (err) {
  //       console.error("Error fetching courses:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  // Fetch Batches
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
      <div className="text-center py-20 text-slate-500">
        <div className="animate-pulse">Loading content...</div>
      </div>
    );

  // // ✅ Course filters
  // const filteredCourses = courses.filter(
  //   (course) => course.published === 1
  // );

  // ✅ Batch filters (FUTURE DATE + TIME CHECK)
  const now = new Date();

  const filteredBatches = batches.filter((batch) => {
    if (batch.custom_show_on_site !== 1) return false;
    const batchStart = getBatchStartDateTime(batch);
    if (!batchStart) return false;

    return batchStart > now;
  });

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
        {filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredBatches.map((batch) => {
              const instructors = batch.instructors || [];
              return (
                <Card
                  key={batch.name}
                  className="flex flex-col h-full
             rounded-xl border-2 border-slate-100
             bg-white shadow-sm
             hover:border-slate-900 hover:shadow-xl
             transition-all duration-300"
                >
                  {/* ===== Main Content ===== */}
                  <div className="flex flex-col gap-4 px-5 flex-grow">

                    {/* ===== Title ===== */}
                    <h3 className="text-center text-xl font-bold sm:text-base font-bold text-slate-900 leading-snug">
                      {batch.title}
                    </h3>

                    {/* ===== Duration · Mode · Price ===== */}
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-700">
                      <span className="font-semibold text-slate-900 underline">
                        {getDurationInDays(batch.start_date, batch.end_date)} day
                        {getDurationInDays(batch.start_date, batch.end_date) > 1 ? "s" : ""}
                      </span>
                      <span>·</span>
                      <span>{batch.medium || "Online"} course</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="font-semibold text-slate-900">
                        {batch.paid_batch
                          ? `${batch.currency === "INR" ? "₹" : "$"}${batch.amount}`
                          : "Free"}
                      </span>
                    </div>

                    {/* ===== Date & Time ===== */}
                    <div className="flex flex-col items-center gap-1 text-xs text-slate-600">

                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-slate-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeWidth="2"
                            d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-slate-700">
                          {formatDate(batch.start_date)} – {formatDate(batch.end_date)}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-slate-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {formatTime(batch.start_time)} – {formatTime(batch.end_time)} {batch.timezone}
                        </span>
                      </div>
                    </div>

                    {/* ===== Details Box ===== */}
                    <div className="flex flex-col gap-3
                    border border-slate-200 rounded-lg
                    bg-slate-50 p-4 text-xs">

                      <div>
                        <div className="font-semibold text-slate-900 mb-0.5">
                          Course Outline
                        </div>
                        <div className="text-slate-600 leading-relaxed line-clamp-3">
                          {batch.description || "Brief description of the course"}
                        </div>
                      </div>

                      <div className="text-slate-600">
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

                  {/* ===== CTA ===== */}
                  <div className="p-4 py-0">
                    {batch.published === 1 ? (
                      <a
                        href={`${LMS_BATCH_URL}?batch=${batch.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          className="w-full bg-slate-900 hover:bg-slate-800
                     text-white font-semibold py-4
                     rounded-lg shadow-md hover:shadow-lg
                     transition-all duration-300"
                        >
                          Enroll Now
                        </Button>
                      </a>
                    ) : (
                      <Button
                        disabled
                        className="w-full py-4 rounded-lg
                   bg-slate-200 text-slate-500
                   font-semibold cursor-not-allowed"
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </Card>


              )
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500 mb-20">
            No courses available at the moment.
          </div>
        )}

        {/* BATCHES SECTION */}
        {/* <div className="text-center mb-12">
          <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">Upcoming Batches</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">
            Join a Live Batch
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Attend instructor-led live classes and interactive sessions.
          </p>
        </div> */}

        {/* Batches Grid */}
        {/* {filteredBatches.length > 0 ? ( */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBatches.map((batch) => {
              const isBusinessBatch = batch.custom_is_business_batch === 1;
              return (
                <Card
                  key={batch.name}
                  className="p-6 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white h-full"
                >
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2 min-h-[3.5rem]">
                      {batch.title}
                    </h3>

                    {/* ⭐ Seats Left */}
        {/* <div className="mb-3 min-h-[2rem]">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                        {batch.seat_count ? `${batch.seat_count} Seats` : "Unlimited Seats"}
                      </span>
                    </div> */}

        {/* <p className="text-sm text-slate-600 mb-4 line-clamp-2 min-h-[2.75rem]">
                      {batch.description || "\u00A0"}
                    </p> */}


        {/* ⭐ Updated Detailed Block */}
        {/* <div className="text-sm text-slate-600 space-y-3 bg-slate-50 p-4 rounded-lg"> */}

        {/* Date Range */}
        {/* <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth="2" d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(batch.start_date)} – {formatDate(batch.end_date)}</span>
                      </div> */}

        {/* Time Range */}
        {/* <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatTime(batch.start_time)} – {formatTime(batch.end_time)}</span>
                      </div> */}

        {/* Timezone */}
        {/* <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-18v18m9-9H3" />
                        </svg>
                        <span className="font-medium">{batch.timezone || "\u00A0"}</span>
                      </div>
                    </div>
                  </div> */}

        {/* Price Badge */}
        {/* <div>
                    {isBusinessBatch ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-900 border border-slate-300">
                          Corporate
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {batch.paid_batch ? (
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                            {(() => {
                              if (!batch.amount) return "Paid - Contact us";
                              let symbol = batch.currency === "INR" ? "₹" : batch.currency === "USD" ? "$" : "";
                              return `Paid - ${symbol}${batch.amount}`;
                            })()}
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                            Free
                          </span>
                        )}

                        {batch.certification === 1 && (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
                            Certificate
                          </span>
                        )}
                      </div>
                    )} */}


        {/* {isBusinessBatch ? (
                      <a href="#contact">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 cursor-pointer">
                          Contact Us
                        </Button>
                      </a>
                    ) : (
                      <a
                        href={`${LMS_BATCH_URL}?batch=${batch.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 cursor-pointer">
                          Join Batch
                        </Button>
                      </a>
                    )}

                  </div>
                </Card>
              );
})}
          </div> */}
        {/* ) : ( */}
        {/* <div className="text-center py-10 text-slate-500"> */}
        {/* No upcoming batches at the moment. */}
        {/* </div> */}
        {/* )} */}

      </div>
    </div>
  );
}
