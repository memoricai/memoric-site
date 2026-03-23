import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";
import useSettingsStore from "../store/useSettingsStore";

const buildImageUrl = (img) => {
  if (!img) return "";

  if (img.startsWith("http")) return img;

  return img.startsWith("/")
    ? `${import.meta.env.VITE_BASE_URL}${img}`
    : `${import.meta.env.VITE_BASE_URL}/${img}`;
};


function TeamCard({ name, role, description, avatar }) {
  return (
    <Card className="
      p-5 md:p-6 lg:p-8
      flex flex-col items-center gap-3 md:gap-4
      border-2 border-slate-100
      hover:border-slate-900 hover:shadow-xl
      transition-all duration-300
    ">
      {/* Avatar */}
      <div className="flex justify-center">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-inner"
        />
      </div>

      {/* Name + Role */}
      <div className="text-center space-y-1">
        <h4 className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight">
          {name}
        </h4>
        <p className="text-sm font-medium text-slate-600">{role}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Description from Frappe */}
      <div
        className="
          w-full max-w-md
          text-xs sm:text-sm text-slate-600 leading-relaxed text-left
          [&_ul]:space-y-3
          [&_li]:leading-relaxed
          [&_li]:pl-1
          [&_li::marker]:text-slate-900
          [&_li::marker]:font-semibold
          [&_ol]:pl-5
          [&_li[data-list='bullet']]:list-disc
          [&_li[data-list='ordered']]:list-decimal
          [&_li]:ml-4
          [&_li]:mb-1
          [&_ol>li::marker]:font-bold
          [&_ol>li::marker]:text-slate-900
        "
        dangerouslySetInnerHTML={{ __html: description }}
      />



    </Card>
  );
}


export default function About() {
  const { settings, team, loading, fetchSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const mission = settings?.our_mission ?? "";
  const coreValues = settings?.core_values ?? [];

  if (loading && !settings) {
    return (
      <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-48 mx-auto" />
            <div className="h-40 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 
                    space-y-10 md:space-y-14 lg:space-y-20">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-slate-900 mb-3 md:mb-4 lg:mb-6 tracking-tight">
            About Us
          </h2>
        </div>

        {/* Mission */}
        <section>
          <div className="flex justify-center">
            <Card className="p-5 md:p-8 lg:p-10 bg-gradient-to-br from-slate-900 to-slate-800 
                           text-white shadow-2xl max-w-4xl border-0 w-full">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg 
                              flex items-center justify-center flex-shrink-0">
                  <Icons.Target className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Mission</h2>
              </div>
              <div
                className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mission }}
              />
            </Card>

          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
               mb-6 md:mb-8 lg:mb-12 text-slate-900 px-2">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {coreValues.map((value, idx) => {
              const IconComponent = Icons[value.icon] || Icons.HelpCircle;

              return (
                <Card
                  key={idx}
                  className={`
                    p-5 md:p-6 lg:p-8 text-center border-2 border-slate-100 
                    hover:border-slate-900 hover:shadow-xl transition-all duration-300
                    ${idx === coreValues.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
                  `}
                >

                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-slate-900 rounded-lg 
                        flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <h4 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 mb-2 md:mb-3">
                    {value.core_value}
                  </h4>

                  <div
                    className="prose prose-sm max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: value.description }}
                  />
                </Card>
              );
            })}
          </div>
        </section>


        {/* Leadership */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
               mb-6 md:mb-8 lg:mb-12 text-slate-900 px-2">
            Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {team.map((member, idx) => (
              <TeamCard
                key={idx}
                name={member.full_name}
                role={member.role}
                avatar={buildImageUrl(member.img)}
                description={member.description}
              />
            ))}
          </div>

        </section>


      </div>
    </div>
  );
}