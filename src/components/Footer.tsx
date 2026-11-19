import React from 'react';
import { PhoneCall, Mail, MessageCircle, ArrowRight, Search } from 'lucide-react';
import { ITV_STATS } from '../data/itvedantData';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestCallback,
  onOpenCommandPalette,
}) => {
  return (
    <footer className="bg-gradient-to-b from-[#132C63]/95 to-[#0B1B42]/98 backdrop-blur-xl text-[#D3E5FD] border-t-2 border-white/40 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Hridayam by Belvo Head Office */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 text-left cursor-pointer group"
            >
              <span className="w-11 h-11 rounded-2xl bg-white border border-white p-1.5 flex items-center justify-center shrink-0 shadow-md">
                <img
                  src="/logo.png"
                  alt="Hridayam by Belvo"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <span className="block font-display text-sm font-extrabold uppercase tracking-wider text-white">
                  HRIDAYAM BY BELVO HEAD OFFICE
                </span>
                <span className="block text-[11px] font-medium text-sky-300">
                  NSDC &amp; Skill India Partner · ISO 9001:2015
                </span>
              </div>
            </button>

            <p className="text-xs text-[#C7DDFB] leading-relaxed max-w-sm">
              {ITV_STATS.headOfficeAddress}
            </p>

            <div className="space-y-2 text-xs pt-1">
              <a
                href="tel:+918928466820"
                className="flex items-center gap-2 text-white font-semibold hover:text-sky-300 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                <span className="font-mono-tabular">Helpline: +91 89284 66820</span>
              </a>
              <a
                href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20would%20like%20career%20counseling."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white font-semibold hover:text-sky-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-300" />
                <span className="font-mono-tabular">WhatsApp: +91 89284 66820</span>
              </a>
              <a
                href="mailto:contact@hridayam.belvo.edu"
                className="flex items-center gap-2 text-white font-semibold hover:text-sky-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-300" />
                <span>Email: contact@hridayam.belvo.edu</span>
              </a>
            </div>
          </div>

          {/* Column 2: Menu */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-sm">Menu</h4>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300/80">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs text-[#C7DDFB]">
              {[
                { label: 'Placements', view: 'placements' as AppView },
                { label: 'Hire From Us', view: 'hire-from-us' as AppView },
                { label: 'Refer & Earn (₹5000)', view: 'refer-earn' as AppView },
                { label: 'Classroom Centers', view: 'centers' as AppView },
                { label: 'Success Stories', view: 'reviews' as AppView },
                { label: 'Contact Us', view: 'contact' as AppView },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.view)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Courses & Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-sm">Our Courses &amp; Portals</h4>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300/80">
              Flagship Programs
            </p>
            <ul className="space-y-2 text-xs text-[#C7DDFB]">
              {[
                { label: 'AI & Automation · Full Stack · App Dev', view: 'catalogue' as AppView },
                { label: 'Product Dev · UI/UX · Interior & Fashion', view: 'catalogue' as AppView },
                { label: 'Entrepreneurship · Marketing · Finance & GST', view: 'catalogue' as AppView },
                { label: 'Student LMS · student@hridayam.in', view: 'student' as AppView },
                { label: 'Mentor Hub · mentor@hridayam.in', view: 'mentor-portal' as AppView },
                { label: 'Admin Console · admin@hridayam.in', view: 'instructor' as AppView },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.view)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Transform Your Career CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-base leading-snug">
              Transform Your Career with Industry Ready Skills
            </h4>
            <p className="text-xs text-[#C7DDFB] leading-relaxed">
              Join our courses and gain real-world experience and certifications that help you
              stand out and get hired faster.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onRequestCallback('Footer Register Now')}
                className="px-5 py-2.5 rounded-xl bg-white text-[#132C63] hover:bg-[#E8F2FF] font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-md"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="px-3.5 py-2.5 rounded-xl bg-white/12 hover:bg-white/22 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-sky-300" />
                  <span>Quick Find</span>
                  <kbd className="font-mono-tabular text-[10px] text-sky-200 ml-0.5">⌘K</kbd>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 py-5 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-sky-200/80">
        Copyright © {new Date().getFullYear()} Hridayam by Belvo. All rights reserved. | Approved
        Training Partner of NSDC (Skill India)
      </div>
    </footer>
  );
};
