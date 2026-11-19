import React from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_STATS } from '../data/itvedantData';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onRequestCallback: (courseInterest?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestCallback }) => {
  return (
    <footer className="bg-gradient-to-b from-[#1E428E] via-[#142B5C] to-[#0D1D3D] text-[#D3E5FD] text-xs border-t-2 border-white/60 relative z-20 backdrop-blur-2xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Head Office Address & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl w-fit shadow-md border border-white">
                <img
                  src="/logo.png"
                  alt="Hridayam by Belvo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">
                Hridayam by Belvo Head Office
              </h4>
            </div>

            <p className="text-[#D3E5FD]/90 text-xs leading-relaxed max-w-sm">
              {ITV_STATS.headOfficeAddress}
            </p>

            <div className="space-y-1.5 text-xs text-[#D3E5FD] pt-1">
              <div className="flex items-center gap-1.5">
                <GoogleIcon name="call" size={16} className="text-[#84ADEB]" />
                <span className="text-[#D3E5FD]/80">Helpline:</span>
                <a href="tel:+918928466820" className="font-semibold text-white hover:text-[#D3E5FD]">
                  +91 89284 66820
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <GoogleIcon name="chat" size={16} className="text-[#84ADEB]" filled />
                <span className="text-[#D3E5FD]/80">WhatsApp:</span>
                <a
                  href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white hover:text-[#D3E5FD]"
                >
                  +91 89284 66820
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <GoogleIcon name="mail" size={16} className="text-[#84ADEB]" />
                <span className="text-[#D3E5FD]/80">Email:</span>
                <a href="mailto:contact@hridayam.belvo.edu" className="font-semibold text-white hover:text-[#D3E5FD]">
                  contact@hridayam.belvo.edu
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Menu / Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm font-display tracking-wider">
              Menu
            </h4>
            <div className="text-[10px] font-bold text-[#84ADEB] uppercase tracking-wider">
              QUICK LINKS
            </div>
            <ul className="space-y-2 text-xs text-[#D3E5FD]/90">
              <li>
                <button
                  onClick={() => onNavigate('placements')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Placements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('placements')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hire From Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('refer-earn')}
                  className="hover:text-white transition-colors text-white font-bold cursor-pointer"
                >
                  Refer &amp; Earn (₹5000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  News &amp; Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Corporate Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors font-semibold text-white cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Courses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm font-display tracking-wider">
              Our Courses
            </h4>
            <div className="text-[10px] font-bold text-[#84ADEB] uppercase tracking-wider">
              ALL COURSES
            </div>
            <ul className="space-y-2 text-xs text-[#D3E5FD]/90">
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Data Science &amp; Analytics With AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Full Stack Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  DevOps With AWS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Digital Marketing With AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Investment Banking With AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Software Testing With AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Cyber Security &amp; Ethical Hacking With AI
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Transform Your Career Call to Action */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-sm font-display leading-snug">
              Transform Your Career with Industry Ready Skills
            </h4>
            <p className="text-[#D3E5FD]/90 text-xs leading-relaxed">
              Join our courses and gain real-world experience and certifications that help you stand out and get hired faster.
            </p>
            <button
              onClick={() => onRequestCallback()}
              className="btn-blue-primary px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white shadow-md flex items-center gap-1.5 cursor-pointer border border-white"
            >
              <span>Register Now</span>
              <GoogleIcon name="arrow_forward" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Line */}
      <div className="border-t border-white/20 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-[#D3E5FD]/80">
        Copyright © Hridayam by Belvo. All rights reserved. | Approved Training Partner of NSDC (Skill India)
      </div>
    </footer>
  );
};
