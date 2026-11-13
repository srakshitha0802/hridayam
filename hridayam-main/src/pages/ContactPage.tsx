import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const settings = storageService.getSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Web & Software Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      storageService.saveEnquiry({
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || '+91 98765 43210',
        areaOfInterest: formData.interest,
        currentStatus: 'Other',
        consent: true
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <div className="border-b border-[#F0D6E3] pb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#C2185B] font-bold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          Contact Hridayam Campus
        </h1>
        <p className="text-xs sm:text-sm text-[#756572] max-w-2xl leading-relaxed">
          Questions regarding curriculums, enterprise team upskilling, or certificate verification? Our faculty advisory team is available Monday through Friday.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F0D6E3] p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-[#21131B] mb-6">Send an Inquiry</h2>

          {submitted ? (
            <div className="p-8 text-center bg-[#FFF5F9] border border-[#F0D6E3] rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C2185B] mx-auto" />
              <h3 className="text-base font-bold text-[#21131B]">Inquiry Received</h3>
              <p className="text-xs text-[#756572] max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. Your inquiry has been routed to the Belvo faculty advisor. You will receive a response within 1 business day at <strong className="text-[#21131B]">{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#21131B] mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#21131B] mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full p-3 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#21131B] mb-1">Mobile Number:</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#21131B] mb-1">Area of Interest:</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full p-3 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B] cursor-pointer"
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
                <label className="block font-semibold text-[#21131B] mb-1">Your Message or Question:</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our curriculum advisors help you?"
                  className="w-full p-3 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Campus & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#21131B] text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-[#760D3B]/40 shadow-xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Campus Headquarters
            </h3>

            <div className="space-y-4 text-xs text-[#FCE7F3]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E83E8C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Bengaluru Learning Lab</strong>
                  <p className="text-[#FCE7F3]/70 mt-1">{settings.officeAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-5 h-5 text-[#E83E8C] shrink-0" />
                <div>
                  <strong className="text-white">Direct Academic Email</strong>
                  <p className="text-[#FCE7F3]/70">{settings.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-5 h-5 text-[#E83E8C] shrink-0" />
                <div>
                  <strong className="text-white">Telephone Helpline</strong>
                  <p className="text-[#FCE7F3]/70">{settings.supportPhone}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#760D3B]/40 text-[11px] text-[#FCE7F3]/60">
              <p>Operating Hours: Monday – Friday, 09:30 AM – 06:30 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
