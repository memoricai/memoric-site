import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getLogoUrl = (logo) => {
  if (!logo) return "";
  if (logo.startsWith("http")) return logo;
  return `${import.meta.env.VITE_BASE_URL}${logo}`;
};

export default function CompanyLogosSlider() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // ---------- helpers ----------
  const getCardsToShow = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  // Calculate card width + gap based on screen size
  const getCardWidth = () => {
    if (typeof window === "undefined") return 240;
    if (window.innerWidth < 640) return 184; // 160px card + 24px gap
    if (window.innerWidth < 1024) return 208; // 176px card + 32px gap
    return 240; // 192px card + 48px gap
  };

  // ---------- hooks ----------
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  const [cardWidth, setCardWidth] = useState(getCardWidth());

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
      setCardWidth(getCardWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Initialize scroll position to center the middle set
  useEffect(() => {
    if (!companies.length || !sliderRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const slider = sliderRef.current;

    // Calculate the offset to center the card
    const containerWidth = container.offsetWidth;
    const currentCardWidth = getCardWidth();
    const actualCardWidth = window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 176 : 192;

    // Center offset: half container width minus half card width
    const centerOffset = (containerWidth / 2) - (actualCardWidth / 2);

    // Starting position: middle set - center offset
    const startPosition = (companies.length * currentCardWidth) - centerOffset;

    slider.scrollTo({
      left: startPosition,
      behavior: "auto",
    });
  }, [companies.length, cardWidth]);

  // ---------- SAFE conditional render (AFTER hooks) ----------
  if (loading || companies.length === 0) return null;

  // ---------- logic ----------
  // Create 5 copies for smoother infinite scroll
  const extendedCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
    ...companies
  ];

  const scrollToIndex = (index, instant = false) => {
    if (!sliderRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const currentCardWidth = getCardWidth();
    const actualCardWidth = window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 176 : 192;

    // Calculate center offset
    const centerOffset = (containerWidth / 2) - (actualCardWidth / 2);

    // Scroll to position that centers the card
    const scrollPosition = (index * currentCardWidth) - centerOffset;

    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: instant ? "auto" : "smooth",
    });
  };

  const handleScrollLeft = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    let newIndex = currentIndex - 1;

    if (newIndex < 0) {
      // First, smoothly scroll to the visual duplicate in the left set
      const visualDuplicateIndex = (2 * companies.length) - 1; // Last item of second set
      scrollToIndex(visualDuplicateIndex, false);

      // After animation completes, instantly jump to the actual position
      setTimeout(() => {
        newIndex = companies.length - 1;
        scrollToIndex((2 * companies.length) + newIndex, true);
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }, 500); // Match the smooth scroll duration
      return;
    }

    setCurrentIndex(newIndex);
    scrollToIndex((2 * companies.length) + newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleScrollRight = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    let newIndex = currentIndex + 1;

    if (newIndex >= companies.length) {
      // Smooth scroll to the immediate visual duplicate (next item)
      const visualDuplicateIndex =
        (2 * companies.length) + companies.length; // first item of 4th set

      scrollToIndex(visualDuplicateIndex, false);

      // After smooth scroll, instantly jump back to middle set
      setTimeout(() => {
        newIndex = 0;
        scrollToIndex((2 * companies.length) + newIndex, true);
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }, 500);

      return;
    }

    setCurrentIndex(newIndex);
    scrollToIndex((2 * companies.length) + newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };


  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Trusted By
          </h3>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            Organizations We've Partnered With
          </h2>
        </div>

        {/* Logos */}
        <div className="relative flex items-center justify-center" ref={containerRef}>

          {/* Left Chevron */}
          <button
            onClick={handleScrollLeft}
            disabled={isTransitioning}
            className="absolute left-0 z-20 bg-white/90 border border-slate-200
                       rounded-full p-2 sm:p-2.5 shadow hover:bg-white hover:shadow-md 
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous company"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          </button>

          {/* Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 
                          bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 
                          bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Slider Container */}
          <div
            className="w-full overflow-x-scroll px-8 sm:px-12 md:px-16"
            ref={sliderRef}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12 py-6 md:py-8">
              {extendedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 w-40 sm:w-44 md:w-48 h-20 sm:h-22 md:h-24 
                             flex items-center justify-center
                             bg-white rounded-xl md:rounded-2xl border border-slate-200
                             shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  {company.company_logo ? (
                    <img
                      src={getLogoUrl(company.company_logo)}
                      alt={company.name}
                      className="max-h-10 sm:max-h-12 md:max-h-14 
                                 max-w-[120px] sm:max-w-[130px] md:max-w-[140px] 
                                 object-contain px-3"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 
                                   text-center px-3 sm:px-4">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Chevron */}
          <button
            onClick={handleScrollRight}
            disabled={isTransitioning}
            className="absolute right-0 z-20 bg-white/90 border border-slate-200
                       rounded-full p-2 sm:p-2.5 shadow hover:bg-white hover:shadow-md 
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next company"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          </button>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}