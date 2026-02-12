import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SETTINGS_URL = import.meta.env.VITE_MEMORIC_SETTINGS_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

export default function CorporateTraining() {
  const [trainingModules, setTrainingModules] = useState([]);
  const [ctDescription, setCtDescription] = useState("");

  useEffect(() => {
    fetch(`${SETTINGS_URL}`, {
      headers: {
        "Authorization": `token ${API_TOKEN}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        const modules = res?.data?.modules || [];

        const formatted = modules.map((m, idx) => ({
          id: idx + 1,
          title: m.module,
          level: m.level,
          description: m.description
        }));

        setTrainingModules(formatted);
        setCtDescription(res?.data?.ct_description || "");
      })
      .catch((err) => console.error("Corporate Training API Error:", err));
  }, []);


  return (
    <div className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-slate-900 mb-3 md:mb-4 tracking-tight">
            Corporate Training Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-700 
                      max-w-4xl mx-auto px-2 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: ctDescription }} />{" "}
            <a href="#contact" className="text-blue-600 hover:text-blue-800 font-semibold italic">
              Contact Us
            </a>{" "}
            for more details.
          </p>
        </div>

        {/* Training Modules Grid */}
        <div
          className={`grid gap-5 md:gap-6 ${trainingModules.length <= 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {trainingModules.map((module) => (
            <Card
              key={module.id}
              className="flex flex-col rounded-xl border-2 border-slate-200
                       bg-white shadow-sm hover:border-slate-900 hover:shadow-lg
                       transition-all duration-300 p-4 md:p-5 gap-0"
            >
              {/* Card Header */}
              <div className="mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                  {module.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 italic">
                  {module.level}
                </p>
              </div>

              {/* Card Content */}
              <div
                className="text-xs md:text-sm text-slate-700 leading-relaxed
                [&_ol]:pl-5
                [&_li[data-list='bullet']]:list-disc
                [&_li[data-list='ordered']]:list-decimal
                [&_li]:ml-4
                [&_li]:mb-1
                [&_ol>li::marker]:font-bold
              [&_ol>li::marker]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: module.description }}
              />

            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
