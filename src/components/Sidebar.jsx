import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ setOpen }) {
  const location = useLocation();
  const navItems = ["Home", "Courses", "Services", "About", "Contact"];

  const getHref = (item) => {
    const hash = `#${item.toLowerCase()}`;
    return location.pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="fixed left-0 top-0 w-72 h-full bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Link to="/" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold text-slate-900">MemoricAI</span>
          </Link>

          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={getHref(item)}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all font-medium"
            >
              {item}
            </a>
          ))}
          
        </nav>
      </div>
    </div>
  );
}
