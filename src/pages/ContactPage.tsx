import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const settings = storageService.getSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Web & Software Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-semibold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Contact Hridayam Campus
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Questions regarding curriculums, enterprise team upskilling, or certificate verification? Our faculty advisory team is available Monday through Friday.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Send an Inquiry</h2>

          {submitted ? (
            <div className="p-8 text-center bg-teal-50/50 border border-teal-200 rounded-xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Inquiry Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. Your inquiry has been routed to the Belvo faculty advisor. You will receive a response within 1 business day at <strong className="text-slate-900">{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Area of Interest:</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-teal-500"
                >
                  <option value="Web & Software Development">Web & Software Development</option>
                  <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                  <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                  <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                  <option value="Data Analytics & BI">Data Analytics & BI</option>
                  <option value="Enterprise Team Training">Enterprise Team Training</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Message or Question:</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our curriculum advisors help you?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Campus & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-md">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Campus Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Bengaluru Learning Lab</strong>
                  <p className="text-slate-400 mt-1">{settings.officeAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <strong className="text-white">Direct Academic Email</strong>
                  <p className="text-slate-400">{settings.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <strong className="text-white">Telephone Helpline</strong>
                  <p className="text-slate-400">{settings.supportPhone}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              <p>Operating Hours: Monday – Friday, 09:30 AM – 06:30 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
