import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ setSidebarOpen }) {
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

          <a href="#home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">MemoricAI</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {["Home", "Courses", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all"
            >
              {item}
            </a>
          ))}

          <Button className="ml-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6">
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
}