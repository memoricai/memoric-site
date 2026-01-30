import React from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/MemoricAILogo.svg";

export default function Navbar({ setSidebarOpen }) {
  const location = useLocation();

  const navItems = ["Home", "Training Modules", "Services", "About", "Contact"];

  const getHref = (item) => {
    const hash = `#${item.toLowerCase()}`;
    return location.pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="md:hidden p-2 hover:bg-slate-100"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-slate-900">MemoricAI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) =>
            item === "Training Modules" ? (
              <div key={item} className="relative group">
                {/* Main Nav Item */}
                <a
                  href="#training-modules"
                  className="px-4 py-2 text-sm font-medium text-slate-700 
                  hover:text-slate-900 hover:bg-slate-50 rounded-md 
                  transition-all flex items-center gap-1"
                >
                  <span>Training Modules</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </a>


                {/* Dropdown */}
                <div
                  className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 
                     rounded-lg shadow-lg opacity-0 invisible 
                     group-hover:opacity-100 group-hover:visible 
                     translate-y-2 group-hover:translate-y-0
                     transition-all duration-200"
                >
                  <a
                    href="#corporate-training"
                    className="block px-4 py-2 text-sm text-slate-700 
                       hover:bg-slate-50 hover:text-slate-900 rounded-t-lg"
                  >
                    Corporate Training
                  </a>
                  <a
                    href="#individual-courses"
                    className="block px-4 py-2 text-sm text-slate-700 
                       hover:bg-slate-50 hover:text-slate-900 rounded-b-lg"
                  >
                    Individual Courses
                  </a>
                </div>
              </div>
            ) : (
              <a
                key={item}
                href={getHref(item)}
                className="px-4 py-2 text-sm font-medium text-slate-700 
                   hover:text-slate-900 hover:bg-slate-50 rounded-md 
                   transition-all"
              >
                {item}
              </a>
            )
          )}
        </nav>

      </div>
    </header>
  );
}
