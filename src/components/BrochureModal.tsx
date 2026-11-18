import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES } from '../data/itvedantData';
import { directDownloadCurriculumPdf } from '../utils/downloadBrochurePdf';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'Digital Marketing and Social Media Management',
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const currentCourse =
    ITV_COURSES.find(
      (c) =>
        c.title.toLowerCase() === courseTitle.toLowerCase() ||
        c.shortTitle.toLowerCase() === courseTitle.toLowerCase()
    ) || ITV_COURSES[0];

  const handleDirectInstantDownload = () => {
    directDownloadCurriculumPdf(currentCourse.title);
    setDownloaded(true);
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    directDownloadCurriculumPdf(currentCourse.title);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E428E]/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-white relative text-[#1E428E] overflow-hidden">
        {/* User-provided Frame Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
          <img
            src="/frame-bg-border.jpg"
            alt="Frame Texture"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#1E428E]/60 hover:text-[#1E428E] hover:bg-white/60 transition-colors cursor-pointer z-10"
        >
          <GoogleIcon name="close" size={20} />
        </button>

        <div className="relative z-10">
          {downloaded ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 bg-gradient-to-r from-[#1E428E] to-[#3869C3] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <GoogleIcon name="check_circle" size={30} filled />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E428E] font-display">
                Syllabus Downloaded!
              </h3>
              <p className="text-xs text-[#1E428E] leading-relaxed font-semibold">
                The official 2026 syllabus for <strong className="text-[#3869C3]">{currentCourse.title}</strong> has been downloaded to your device.
              </p>

              {/* Real Human Counselor Contact Box */}
              <div className="p-3.5 bg-white/90 rounded-2xl border-2 border-[#D3E5FD] text-left flex items-center gap-3 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Ananya Sharma Counselor"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3869C3] shrink-0"
                />
                <div>
                  <h5 className="font-extrabold text-xs text-[#1E428E]">Ananya Sharma</h5>
                  <p className="text-[11px] text-[#3869C3] font-bold">Senior Academic Advisor</p>
                  <p className="text-[10px] text-[#1E428E]/75">Direct Helpdesk: +91 89284 66820</p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleDirectInstantDownload}
                  className="flex-1 py-3 rounded-xl btn-blue-glass font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GoogleIcon name="download" size={15} />
                  <span>Download Again</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl btn-blue-primary text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D3E5FD] text-[#1E428E] text-[10px] font-extrabold uppercase tracking-wider border border-white">
                  <GoogleIcon name="description" size={14} className="text-[#3869C3]" />
                  Curriculum &amp; Placement Roadmap
                </div>
                <h3 className="text-2xl font-extrabold text-[#1E428E] font-display">
                  Download Official Syllabus
                </h3>
                <p className="text-xs text-[#1E428E] font-medium">
                  Get immediate access to the 2026 industry-aligned syllabus for{' '}
                  <strong className="text-[#3869C3]">{currentCourse.title}</strong>.
                </p>
              </div>

              {/* Direct 1-Click Instant Download Button (Zero Wait) */}
              <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#3869C3] text-center space-y-2 shadow-sm">
                <span className="text-[11px] font-bold text-[#1E428E] block">
                  ⚡ Want the brochure right now?
                </span>
                <button
                  type="button"
                  onClick={handleDirectInstantDownload}
                  className="w-full py-3 rounded-xl btn-blue-primary font-extrabold text-xs uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-white"
                >
                  <GoogleIcon name="file_download" size={18} />
                  <span>Direct Download Brochure PDF (Instant)</span>
                </button>
                <span className="text-[10px] text-[#1E428E]/75 font-semibold block">
                  1-Click Instant File Download • No Hidden Charges
                </span>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#D3E5FD]"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-[#1E428E]/70 bg-white/80 px-2 py-0.5 rounded-md">
                  Or Send to WhatsApp / Email
                </span>
                <div className="flex-grow border-t border-[#D3E5FD]"></div>
              </div>

              <form onSubmit={handleDownload} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1E428E] mb-1">
                    Email Address (to receive PDF) <span className="text-[#3869C3] font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-[#1E428E] bg-white border border-[#D3E5FD]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1E428E] mb-1">
                    Mobile Number (for WhatsApp Syllabus Link) <span className="text-[#3869C3] font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-[#1E428E] bg-white border border-[#D3E5FD]"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl btn-blue-glass font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GoogleIcon name="download" size={16} />
                    Download Curriculum PDF
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#1E428E] text-center pt-0.5 font-bold">
                  <GoogleIcon name="verified_user" size={14} className="text-[#3869C3]" />
                  <span>Instant Download • No Hidden Charges</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
