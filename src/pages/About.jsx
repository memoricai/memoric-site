import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Scale, Lightbulb, Target } from "lucide-react";

const SETTINGS_URL = import.meta.env.VITE_MEMORIC_SETTINGS_API_URL;
const TEAM_MEMBER_URL = import.meta.env.VITE_MEMORIC_TEAM_MEMBER_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

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
  const [mission, setMission] = useState("");
  const [coreValues, setCoreValues] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(
          `${SETTINGS_URL}`,
          {
            headers: {
              Authorization: `token ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        setMission(data?.data?.our_mission || "");
        setCoreValues(data?.data?.core_values || []);
        setTeam(data?.data?.our_team || []);

        const teamLinks = data?.data?.our_team || [];

        if (teamLinks.length > 0) {
          const teamRequests = teamLinks.map((t) =>
            fetch(
              `${TEAM_MEMBER_URL}/${t.team_member}`,
              {
                headers: {
                  Authorization: `token ${API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            ).then((r) => r.json())
          );

          const teamResponses = await Promise.all(teamRequests);
          setTeam(teamResponses.map((r) => r.data));
        }
        console.log("Fetched About Data:", data);

      } catch (err) {
        console.error("About API Error:", err);
      }
    };

    fetchAboutData();
  }, []);

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
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
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

        {/* Expertise */}
        {/* <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
                       mb-6 md:mb-8 lg:mb-12 text-slate-900 px-2">
            What We Do Best
          </h2>
          <div className="flex justify-center">
            <Card className="bg-white border-2 border-slate-100 p-5 md:p-8 lg:p-10 
                           shadow-lg max-w-4xl w-full">
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                  Our team leverages expertise in AI technology, business management, and education
                  to deliver practical solutions. We conduct research on AI governance
                  and economic impact, guide organizations through secure AI implementation,
                  and provide hands-on training for executives, educators, and students.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                  Whether you're looking to understand AI's potential for your business,
                  need help choosing the right tools, or want to build AI skills in your
                  team, we work with you to unlock AI's value while ensuring responsible use.
                </p>
              </div>
            </Card>
          </div>
        </section> */}

        {/* Values */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
               mb-6 md:mb-8 lg:mb-12 text-slate-900 px-2">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {coreValues.map((value, idx) => {
              const Icons = [BadgeCheck, Scale, Lightbulb];
              const Icon = Icons[idx % Icons.length];

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
                    <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
                  </div>

                  <h4 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 mb-2 md:mb-3">
                    {value.core_value || value.title}
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