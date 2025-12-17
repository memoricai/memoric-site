import React from "react";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">MemoricAI</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              Expert AI training and consulting to help organizations adopt artificial intelligence responsibly and effectively.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@memoricai.in" className="hover:text-white transition-colors">
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
              {["Home","Services", "Courses", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
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
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>AI Training</li>
              <li>Consulting</li>
              <li>Research</li>
              <li>Workshops</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} MemoricAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}