import React from 'react';
import { Certificate } from '../../types';
import { X, Award, CheckCircle, Printer, ExternalLink, ShieldCheck } from 'lucide-react';
import { navigateTo } from '../../utils/navigation';
import { BRAND_ASSETS } from '../../utils/brand';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleVerifyLink = () => {
    navigateTo(`/verify-certificate?id=${certificate.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6 my-8">
        {/* Top Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-900">Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleVerifyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify Link</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Styled Frame */}
        <div className="relative border-8 border-double border-slate-800 p-8 sm:p-12 text-center bg-gradient-to-b from-white via-slate-50/50 to-white rounded-xl shadow-inner space-y-6">
          {/* Top Seal & Monogram */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border-2 border-amber-400/60 shadow-md p-2 mb-2 ring-4 ring-amber-100">
              <img
                src={BRAND_ASSETS.logoMark}
                alt="Hridayam Official Seal"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">
              HRIDAYAM BY BELVO
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
              ACADEMY OF PRACTICAL TECHNOLOGY & DESIGN
            </p>
          </div>

          {/* Body Prose */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">
              This is to formally certify that
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-serif italic">
              {certificate.userName}
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              has satisfactorily completed all practical curriculums, assessments, and verified laboratory milestones for
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-teal-900">
              {certificate.courseTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Under the discipline of <strong className="text-slate-800">{certificate.categoryName}</strong>
            </p>
          </div>

          {/* Verification Code & Signatures */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-left items-end">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Date of Issuance</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{certificate.issueDate}</p>

              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-3">Certificate Record ID</p>
              <p className="text-xs font-mono font-bold text-teal-800 mt-0.5">{certificate.id}</p>
            </div>

            <div className="text-right">
              <div className="inline-block text-center">
                <div className="w-32 border-b border-slate-400 pb-1 mb-1 font-serif italic text-sm text-slate-800">
                  {certificate.instructorName}
                </div>
                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Faculty Director, Belvo
                </p>
              </div>
            </div>
          </div>

          {/* Tamper-Evident Footer Bar */}
          <div className="pt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-100">
            <span className="flex items-center gap-1 text-teal-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RECORD AUTHENTICATED BY BELVO REGISTRY</span>
            </span>
            <span>AUTH KEY: {certificate.verificationCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
