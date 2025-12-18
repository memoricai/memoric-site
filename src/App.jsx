import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sections from "./pages/Sections";
import { PrivacyPolicy, TermsAndConditions, RefundPolicy } from "./pages/Legal";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to section if URL has a hash
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && <Sidebar setOpen={setSidebarOpen} />}

      <main className="flex-1 relative">
        <Routes>
          {/* Main site */}
          <Route path="/" element={<Sections />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsnconditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}