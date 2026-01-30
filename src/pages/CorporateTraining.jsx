import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CorporateTraining() {
  const trainingModules = [
    {
      id: 1,
      title: "Essentials of AI",
      level: "Basic Level, 6 Sessions",
      sections: [
        {
          title: "AI Literacy",
          items: [
            "Origins of AI, current applications",
            "Core technology concepts, basics of GenAI",
            "AI and digitalization, adoption of AI in organizations"
          ]
        },
        {
          title: "AI Fluency",
          items: [
            "Basics of prompting, hands-on exercises",
            "AI Agents design, basic usage",
            "Tools for research, data analysis, imaging"
          ]
        },
        {
          title: "Key Takeaways",
          items: [
            "Learn the language of AI and the key terms used in industry.",
            "Discover AI usefulness vs hype.",
            "Understand the different use cases of AI and its effectiveness.",
            "Assess organizational needs of AI adoption and rollout.",
            "Improve individual productivity."
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Adoption of AI",
      level: "Intermediate Level, 8 Sessions",
      sections: [
        {
          title: "AI Literacy",
          items: [
            "Origins of AI, current applications",
            "Managing AI and machine learning projects",
            "Understanding GenAI models and their design",
            "AI adoption in organizations - training, tool selection, achieving RoI"
          ]
        },
        {
          title: "AI Fluency",
          items: [
            "Understand prompts, different methods of prompting",
            "Design of Agents, deployment choices",
            "Address bias and hallucinations, responsible AI use, AI regulations",
            "Learn GenAI tools for research, data analysis, imaging, creative inputs"
          ]
        },
        {
          title: "Key Takeaways",
          items: [
            "Grasp the language of AI, key terms that are used in the industry.",
            "Understand the different use cases of AI and its effectiveness.",
            "Learn about the AI ecosystem, the products, the services, and tools.",
            "Review AI regulations and how they impact your products and services.",
            "Improve ways to upskill your employees and restructure work flow processes in your organization."
          ]
        }
      ]
    }
  ];

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
            Training Modules are delivered either on-site (company premise) or online (Zoom), featuring
            live interactions, discussions, and demos. Each module can be customized to meet your
            organizational needs.{" "}
            <a href="#contact" className="text-blue-600 hover:text-blue-800 font-semibold italic">
              Contact Us
            </a>{" "}
            for more details.
          </p>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
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
              <div className="space-y-3 md:space-y-3.5">
                {module.sections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1.5">
                      {section.title}
                    </h4>
                    
                    {section.title === "Key Takeaways" ? (
                      <ol className="list-decimal pl-5 space-y-1 text-xs md:text-sm text-slate-700 marker:font-bold marker:text-slate-900">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-slate-700 marker:text-slate-900">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}