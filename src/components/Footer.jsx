import React from "react";
import { Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const quickLinks = ["Home", "Courses", "About", "Contact"];

  const getHref = (item) => {
    const hash = `#${item.toLowerCase()}`;
    return location.pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">MemoricAI</h3>
            <p className="text-slate-400 mb-4">
              Expert AI training and consulting to help organizations adopt AI responsibly.
            </p>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@memoricai.in" className="hover:text-white">
                  support@memoricai.in
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href={getHref(item)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <a
              href={location.pathname === "/" ? "#services" : "/#services"}
              className="inline-block font-bold mb-4 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Services
            </a>


            <ul className="space-y-2 text-sm text-slate-400">
              <li>Training</li>
              <li>Strategic Consulting</li>
              <li>Research</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} MemoricAI. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white" target="_blank">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white" target="_blank">
              Terms & Conditions
            </Link>
            {/* <Link to="/refund-policy" className="hover:text-white" target="_blank">
              Cancellation & Refund Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
