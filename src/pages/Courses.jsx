import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COURSE_API_URL = import.meta.env.VITE_COURSE_API_URL;
const BATCH_API_URL = import.meta.env.VITE_BATCH_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchLoading, setBatchLoading] = useState(true);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(COURSE_API_URL, {
          headers: {
            Authorization: `token ${API_TOKEN}`,
          },
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
          headers: {
            Authorization: `token ${API_TOKEN}`,
          },
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
        
        {/* ---------------- COURSES SECTION ---------------- */}
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
                className="p-6 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="flex-1">

                  {course.image && (
                    <img
                      src={`${BASE_URL}${course.image}`}
                      alt={course.title}
                      className="w-full h-40 object-cover mb-4 rounded"
                    />
                  )}

                  {course.category && (
                    <Badge className="mb-4 bg-slate-100 text-slate-900 hover:bg-slate-200 font-medium">
                      {course.category}
                    </Badge>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-slate-900">{course.title}</h3>

                  <p className="text-sm text-slate-600 mb-6">{course.short_introduction}</p>

                  <div className="flex gap-4 text-xs text-slate-500">
                    {course.paid_course ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                        Free
                      </span>
                    )}
                    {course.enable_certification== 1 && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
                        Certificate
                      </span>
                    )}
                    {course.paid_certificate==1  && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                        Paid Certificate
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6">
                  Enroll Now
                </Button>
              </Card>
            ))}
        </div>


        {/* ---------------- BATCHES SECTION ---------------- */}
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
                className="p-6 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="flex-1">

                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {batch.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4">{batch.description}</p>

                  <div className="text-sm text-slate-600 space-y-1 mb-6">
                    <p><strong>Start:</strong> {batch.start_date}</p>
                    <p><strong>End:</strong> {batch.end_date}</p>
                    <p><strong>Time:</strong> {batch.start_time} - {batch.end_time}</p>
                    <p><strong>Mode:</strong> {batch.medium}</p>
                  </div>

                  <div className="flex gap-4 text-xs text-slate-500">
                    {batch.paid_batch ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6">
                  Join Batch
                </Button>
              </Card>
            ))}
        </div>

      </div>
    </div>
  );
}
