import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/MemoricAILogo.jpg";

export default function Navbar({ setSidebarOpen }) {
  const location = useLocation();

  const navItems = ["Home", "Courses", "Services", "About", "Contact"];

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
            <img
              src={logo}
              alt="MemoricAI Logo"
              className="h-9 w-auto object-contain rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900">MemoricAI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={getHref(item)}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
