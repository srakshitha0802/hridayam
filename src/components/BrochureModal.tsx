import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES } from '../data/itvedantData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'Master in Data Science and Analytics with AI',
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const currentCourse =
    ITV_COURSES.find((c) => c.title === courseTitle || c.shortTitle === courseTitle) ||
    ITV_COURSES[0];

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-blue-200 relative text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-blue-50 transition-colors cursor-pointer"
        >
          <GoogleIcon name="close" size={20} />
        </button>

        {downloaded ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <GoogleIcon name="check" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Syllabus Ready!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have dispatched the complete 30-page detailed curriculum guide for{' '}
              <strong className="text-slate-900">{currentCourse.title}</strong> to <strong className="text-slate-900">{email}</strong> and via WhatsApp to <strong className="text-slate-900">{phone}</strong>.
            </p>
            <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-left space-y-1">
              <div className="font-bold text-slate-900">What's in the document:</div>
              <ul className="text-slate-600 list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Detailed week-by-week topic breakdown</li>
                <li>35+ Capstone project specifications</li>
                <li>List of 2,000+ hiring partners and placement policy</li>
                <li>NSDC government certification verification guide</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl btn-blue-primary text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                <GoogleIcon name="description" size={14} className="text-blue-600" />
                Curriculum & Placement Roadmap
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Download Official Syllabus
              </h3>
              <p className="text-xs text-slate-600">
                Get immediate access to the 2026 industry-aligned syllabus for{' '}
                <strong className="text-slate-900">{currentCourse.title}</strong>.
              </p>
            </div>

            <form onSubmit={handleDownload} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address (to receive PDF) <span className="text-blue-600 font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (for WhatsApp Syllabus Link) <span className="text-blue-600 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GoogleIcon name="download" size={16} />
                  Download Curriculum PDF
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center pt-1 font-semibold">
                <GoogleIcon name="verified_user" size={14} className="text-blue-600" />
                <span>Instant Download • No Hidden Charges</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
