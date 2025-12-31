import React from "react";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Scale, Lightbulb, Target } from "lucide-react";

function TeamCard({ name, role, highlights }) {
  return (
    <Card
      className="
        p-5 md:p-6 lg:p-8
        flex flex-col items-center gap-3 md:gap-4
        border-2 border-slate-100
        hover:border-slate-900 hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* Avatar */}
      <div className="flex justify-center">
        <div
          className="
            w-20 h-20
            rounded-full
            bg-gradient-to-br from-slate-100 to-slate-200
            flex items-center justify-center
            text-4xl
            shadow-inner
          "
        >
          👤
        </div>
      </div>

      {/* Name + Role */}
      <div className="text-center space-y-1">
        <h4 className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight">
          {name}
        </h4>
        <p className="text-sm font-medium text-slate-600">
          {role}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Highlights — LEFT ALIGNED + MOBILE FRIENDLY */}
      <ul
        className="
          w-full
          max-w-md
          text-sm text-slate-600
          space-y-3
          leading-relaxed
          text-left
        "
      >
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function About() {
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
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                Empowering organizations to adopt AI effectively and responsibly through training, strategic guidance, and applied research.
              </p>
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

            <Card className="p-5 md:p-6 lg:p-8 text-center border-2 border-slate-100 
                           hover:border-slate-900 hover:shadow-xl transition-all duration-300">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-slate-900 rounded-lg 
                            flex items-center justify-center mx-auto mb-4 md:mb-6">
                <BadgeCheck className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
              </div>
              <h4 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 
                           mb-2 md:mb-3">Quality</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We bring 40 years of experience with AI and digital technologies to deliver exceptional training, consulting, and research. We maintain the highest standards of excellence in everything we do.
              </p>
            </Card>

            <Card className="p-5 md:p-6 lg:p-8 text-center border-2 border-slate-100 
                           hover:border-slate-900 hover:shadow-xl transition-all duration-300">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-slate-900 rounded-lg 
                            flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Scale className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
              </div>
              <h4 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 
                           mb-2 md:mb-3">Ethics</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We advocate and engage in ethical practices in our training, consulting, and research. We prioritize responsible and honest use of AI, including in our own work. We encourage use of open source tools and models.
              </p>
            </Card>

            <Card className="p-5 md:p-6 lg:p-8 text-center border-2 border-slate-100 
                           hover:border-slate-900 hover:shadow-xl transition-all duration-300
                           sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-slate-900 rounded-lg 
                            flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Lightbulb className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
              </div>
              <h4 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 
                           mb-2 md:mb-3">Simplicity</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We communicate complex AI concepts clearly and accessibly, ensuring everyone can understand and apply them. We avoid use of confusing jargon. We emphasize practical uses and applications of AI.
              </p>
            </Card>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
               mb-6 md:mb-8 lg:mb-12 text-slate-900 px-2">
            Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">

            <TeamCard
              name="Rahul De’"
              role="Founder and CEO"
              highlights={[
                "PhD from the AI in Management Lab, Katz School of Business, University of Pittsburgh, 1993.",
                "Professor (Retd) IIM Bangalore, also served as Dean (Programmes).",
                "Has taught AI and IT Management to MBA students and executives since 1990.",
                "Does research in AI, Open Source, and Digital Transformation. Has published 4 books, over 130 articles in scientific publications.",
                "Listed as Top 10 AI Researchers in India by Analytics India Magazine in 2020.",
                "He is the author of the textbook AI for Managers by Cengage, published in 2025."
              ]}
            />

            <TeamCard
              name="Sharmila Chakravarty"
              role="Co-Founder and COO"
              highlights={[
                "Software engineer by training, experience with AT&T and other technology firms.",
                "MSc from University of Maryland.",
                "Early career in technical development and presales management.",
                "Experience in engineering design, financial management, and technology startups.",
              ]}
            />

            <TeamCard
              name="Lewin Sivamalai"
              role="Instructor"
              highlights={[
                "He has a PhD from IIM Bangalore",
                "He is a seasoned data scientist and program manager, with over 12 years experience spanning IT Services, financial inclusion, data-driven governance, and experiential learning for corporate training.",
                "He has taught at IIMB and other leading institutions.",
                "Lewin brings a hands-on, human-centered approach to solving complex problems."
              ]}
            />

          </div>

        </section>


      </div>
    </div>
  );
}