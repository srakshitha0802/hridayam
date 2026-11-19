import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES } from '../data/itvedantData';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetCourse?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  presetCourse,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: presetCourse || 'Master in Data Science and Analytics with AI',
    center: 'Thane Head Office (Classroom)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `lead_${Date.now()}`,
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E428E]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-white relative text-[#1E428E]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#1E428E]/60 hover:text-[#1E428E] hover:bg-white/50 transition-colors cursor-pointer"
        >
          <GoogleIcon name="close" size={20} />
        </button>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <GoogleIcon name="check" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Callback Requested!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. A senior academic counselor from <strong className="text-blue-600">Hridayam by Belvo</strong> will call you at <strong className="text-slate-900">{formData.phone}</strong> within 15 minutes to guide you on syllabus, fee discounts, and upcoming batches.
            </p>
            <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-left space-y-1">
              <div className="font-bold text-slate-900">What to expect on the call:</div>
              <ul className="text-slate-600 list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Detailed course curriculum and 35+ project walkthrough</li>
                <li>Hiring partner placement eligibility test details</li>
                <li>0% Interest monthly EMI fee structure breakdown</li>
                <li>Free demo class pass generation</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl btn-blue-primary text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                <GoogleIcon name="auto_awesome" size={14} className="text-blue-600" />
                Free Career Consultation
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Request a Callback
              </h3>
              <p className="text-xs text-slate-600">
                Talk to our academic career counselors to select the right track and claim scholarships up to ₹25,000.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-blue-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (for SMS & WhatsApp) <span className="text-blue-600 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Program of Interest</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 bg-white"
                >
                  {ITV_COURSES.map((c) => (
                    <option key={c.id} value={c.title} className="bg-white text-slate-900">
                      {c.shortTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Learning Center</label>
                <select
                  value={formData.center}
                  onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 bg-white"
                >
                  <option value="Thane Head Office (Classroom)" className="bg-white text-slate-900">Thane Head Office (Classroom)</option>
                  <option value="Andheri Campus (Mumbai)" className="bg-white text-slate-900">Andheri Campus (Mumbai)</option>
                  <option value="Navi Mumbai - Vashi Campus" className="bg-white text-slate-900">Navi Mumbai - Vashi Campus</option>
                  <option value="Pune - FC Road Campus" className="bg-white text-slate-900">Pune - FC Road Campus</option>
                  <option value="Pune - Pimpri Campus" className="bg-white text-slate-900">Pune - Pimpri Campus</option>
                  <option value="Nagpur Campus" className="bg-white text-slate-900">Nagpur Campus</option>
                  <option value="Online Live Interactive Batch" className="bg-white text-slate-900">Online Live Interactive Batch</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GoogleIcon name="call" size={16} />
                  Schedule Free Counseling Call
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center pt-1 font-semibold">
                <GoogleIcon name="verified_user" size={14} className="text-blue-600" />
                <span>100% Privacy Guaranteed. Zero Spam Calls.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
