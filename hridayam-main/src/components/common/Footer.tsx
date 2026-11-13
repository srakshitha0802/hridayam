import React, { useState } from 'react';
import { navigateTo } from '../../utils/navigation';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { storageService } from '../../services/storage';
import { BRAND_ASSETS } from '../../utils/brand';

export const Footer: React.FC = () => {
  const settings = storageService.getSettings();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#21131B] text-[#FCE7F3]/80 border-t border-[#760D3B]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#760D3B]/30">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/15 shadow-xs">
                <img
                  src={BRAND_ASSETS.logoMark}
                  alt="Hridayam Logo"
                  className="w-7 h-7 object-contain drop-shadow-xs"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Hridayam</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E83E8C]">by Belvo</span>
            </div>

            <p className="text-xs text-[#FCE7F3]/70 leading-relaxed max-w-sm">
              {settings.brandTagline} Digital agency-backed learning platform developing practical, industry-relevant technical, creative, and business capability.
            </p>

            <div className="space-y-2 text-xs text-[#FCE7F3]/70 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E83E8C] shrink-0" />
                <a href={`mailto:${settings.supportEmail}`} className="hover:text-white transition-colors">
                  {settings.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E83E8C] shrink-0" />
                <span>{settings.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Column: Platform & Academy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FCE7F3]/70">
              <li>
                <button onClick={() => navigateTo('/courses')} className="hover:text-white transition-colors cursor-pointer">
                  Explore Courses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/paths')} className="hover:text-white transition-colors cursor-pointer">
                  Learning Paths
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/categories')} className="hover:text-white transition-colors cursor-pointer">
                  Core Categories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/instructors')} className="hover:text-white transition-colors cursor-pointer">
                  Mentors & Faculty
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/resources')} className="hover:text-white transition-colors cursor-pointer">
                  Resources & Insights
                </button>
              </li>
              <li>
                <a
                  href={BRAND_ASSETS.brochurePdf}
                  download="Hridayam_by_Belvo_Platform_Brochure.pdf"
                  className="hover:text-white text-[#E83E8C] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brochure</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Company & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FCE7F3]/70">
              <li>
                <button onClick={() => navigateTo('/about-hridayam')} className="hover:text-white transition-colors cursor-pointer">
                  About Hridayam
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about-belvo')} className="hover:text-white transition-colors cursor-pointer">
                  About Belvo
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Campus
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ & Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/verify-certificate')} className="text-[#E83E8C] hover:text-white font-semibold transition-colors cursor-pointer">
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Curriculum Updates
            </h4>
            <p className="text-xs text-[#FCE7F3]/70 mb-3 leading-relaxed">
              Receive notifications on newly published courses and industry frameworks.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#760D3B]/40 border border-[#C2185B]/50 rounded-xl text-xs text-[#FCE7F3] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0" />
                <span>Subscribed. You will receive course release notes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-[#351525] border border-[#760D3B]/60 rounded-xl text-white placeholder-[#756572] focus:outline-none focus:border-[#E83E8C] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C2185B] hover:bg-[#E83E8C] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom legal & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#756572]">
          <p>© {new Date().getFullYear()} Hridayam. All rights reserved. Backed by Belvo.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigateTo('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => navigateTo('/refund')} className="hover:text-white transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
