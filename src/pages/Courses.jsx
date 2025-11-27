import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users } from "lucide-react";

const API_URL = import.meta.env.VITE_COURSE_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL, {
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

  if (loading)
    return (
      <div className="text-center py-20 text-slate-500">
        <div className="animate-pulse">Loading courses...</div>
      </div>
    );

  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">Our Courses</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Master AI with Expert-Led Training
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Practical courses designed to help you implement AI effectively in your organization
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.name}
              className="p-6 flex flex-col border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="flex-1">
                {/* Category Badge */}
                {course.category && (
                  <Badge className="mb-4 bg-slate-100 text-slate-900 hover:bg-slate-200 font-medium">
                    {course.category}
                  </Badge>
                )}
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-slate-900 leading-snug">
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {course.short_introduction}
                </p>

                {/* Course Meta */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>12 Modules</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>8 Weeks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>Beginner</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6">
                {course.paid_course
                  ? `Enroll Now • $${course.course_price}`
                  : "Enroll Now • Free"}
              </Button>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}