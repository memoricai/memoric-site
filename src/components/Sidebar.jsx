import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar({ setOpen }) {
  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="fixed left-0 top-0 w-72 h-full bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <span className="text-xl font-bold text-slate-900">MemoricAI</span>
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          {["Home", "Courses", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all font-medium"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          
          <Button 
            className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6"
            onClick={() => setOpen(false)}
          >
            Login
          </Button>
        </nav>
      </div>
    </div>
  );
}