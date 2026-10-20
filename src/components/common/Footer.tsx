import React, { useState } from 'react';
import { navigateTo } from '../../utils/navigation';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { storageService } from '../../services/storage';

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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Hridayam</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">by Belvo</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {settings.brandTagline} Digital agency-backed learning platform developing practical, industry-relevant technical, creative, and business capability.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <a href={`mailto:${settings.supportEmail}`} className="hover:text-white transition-colors">
                  {settings.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <span>{settings.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Column: Platform & Academy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
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
            </ul>
          </div>

          {/* Column: Company & Verification */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
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
                <button onClick={() => navigateTo('/verify-certificate')} className="text-teal-400 hover:text-teal-300 font-medium transition-colors cursor-pointer">
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Curriculum Updates
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive notifications on newly published courses and industry frameworks.
            </p>
            {subscribed ? (
              <div className="p-3 bg-teal-950/40 border border-teal-800/60 rounded-lg text-xs text-teal-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
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
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom legal & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Hridayam. All rights reserved. Backed by Belvo.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigateTo('/privacy')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('/terms')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => navigateTo('/refund')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
