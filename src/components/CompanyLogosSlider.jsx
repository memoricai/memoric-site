import React, { useEffect, useState } from "react";

const getLogoUrl = (logo) => {
  if (!logo) return "";
  if (logo.startsWith("http")) return logo;
  return `${import.meta.env.VITE_BASE_URL}${logo}`;
};

export default function CompanyLogosSlider() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/resource/Memoric%20Company?fields=["name","company_logo"]`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_COURSE_API_TOKEN}`,
            },
          }
        );

        const result = await response.json();
        setCompanies(result.data || []);
      } catch (error) {
        console.error("Error fetching company logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading || companies.length === 0) return null;

  const shouldScroll = companies.length > 3;
  const displayCompanies = shouldScroll
    ? [...companies, ...companies]
    : companies;

  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Trusted By
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Organizations We've Partnered With
          </h2>
        </div>

        {/* Logos */}
        <div className="relative flex justify-center">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="w-full overflow-hidden">
            <div
              className={`flex items-center gap-12 py-8 justify-center ${
                shouldScroll ? "animate-scroll" : ""
              }`}
            >
              {displayCompanies.map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center
                             bg-white rounded-2xl border border-slate-200
                             shadow-sm hover:shadow-md transition-all"
                >
                  {company.company_logo ? (
                    <img
                      src={getLogoUrl(company.company_logo)}
                      alt={company.name}
                      className="max-h-14 max-w-[140px] object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-700 text-center px-4">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vite-safe animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
