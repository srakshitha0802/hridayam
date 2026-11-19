import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { CLASSROOM_CENTERS, ITV_COURSES } from '../data/itvedantData';

interface ContactViewProps {
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onToast }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    center: 'Thane Head Office',
    course: 'Master in Data Science and Analytics with AI',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `contact_${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        courseInterest: formData.course,
        cityOrCenter: formData.center,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setFormSubmitted(true);
    onToast('success', 'Message Sent!', 'Our academic counselor will get in touch with you shortly.');
  };

  return (
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* Breadcrumb Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-xs text-sky-200 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-sky-300 font-bold">Contact Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <GoogleIcon name="headset_mic" size={16} className="text-sky-300" />
          Always Here to Guide Your Career
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
          Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-200 to-white">Hridayam by Belvo</span> Counselors
        </h1>
        <p className="text-sky-200 text-sm sm:text-base max-w-2xl mx-auto">
          Visit any of our classroom centers across Mumbai, Pune, and Nagpur, or reach out to our central helpline for course admissions, placement details, and syllabus guides.
        </p>
      </section>

      {/* Quick Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-2xl p-6 text-center space-y-2 hover:border-sky-300 transition-all border-2 border-sky-400/40 shadow-xl text-white">
            <div className="w-12 h-12 bg-blue-900/80 text-sky-200 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-sky-400/30">
              <GoogleIcon name="call" size={24} />
            </div>
            <h3 className="font-bold text-white text-base">Admissions Helpline</h3>
            <p className="text-xs text-sky-200">Available Monday to Sunday (8 AM – 8:30 PM)</p>
            <a
              href="tel:+918928466820"
              className="text-base font-bold text-white hover:text-sky-200 block pt-1"
            >
              +91 89284 66820
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/70 text-sky-200 text-xs font-bold hover:bg-blue-800 transition-colors border border-sky-400/40"
              >
                <GoogleIcon name="chat" size={14} className="text-sky-400" filled />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-6 text-center space-y-2 hover:border-sky-300 transition-all border-2 border-sky-400/40 shadow-xl text-white">
            <div className="w-12 h-12 bg-blue-900/80 text-sky-200 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-sky-400/30">
              <GoogleIcon name="mail" size={24} />
            </div>
            <h3 className="font-bold text-white text-base">Email Support</h3>
            <p className="text-xs text-sky-200">For course inquiries and corporate hiring</p>
            <a
              href="mailto:contact@hridayam.belvo.edu"
              className="text-base font-bold text-white hover:text-sky-200 block pt-1"
            >
              contact@hridayam.belvo.edu
            </a>
          </div>

          <div className="glass-dark rounded-2xl p-6 text-center space-y-2 hover:border-sky-300 transition-all border-2 border-sky-400/40 shadow-xl text-white">
            <div className="w-12 h-12 bg-blue-900/80 text-sky-200 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-sky-400/30">
              <GoogleIcon name="apartment" size={24} />
            </div>
            <h3 className="font-bold text-white text-base">Head Office Campus</h3>
            <p className="text-xs text-sky-200">Wagle Industrial Estate, Thane West</p>
            <span className="text-xs font-bold text-sky-100 block pt-1">
              Thane, Maharashtra 400604
            </span>
          </div>
        </div>
      </section>

      {/* Main Form & Campuses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-6 glass-dark rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-sky-400/40 shadow-2xl backdrop-blur-2xl text-white">
            <div>
              <span className="text-xs font-bold uppercase text-sky-300 tracking-widest">
                Write To Us
              </span>
              <h2 className="text-2xl font-bold text-white font-display mt-0.5">
                Send Us a Message
              </h2>
              <p className="text-xs text-sky-200 mt-1">
                Fill the form below and an academic counselor will call you back within 15 minutes.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-blue-950/80 border border-sky-400/40 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl shadow-md">
                  <GoogleIcon name="check" size={24} />
                </div>
                <h4 className="font-bold text-white text-lg">Thank You, {formData.name}!</h4>
                <p className="text-xs text-sky-200">
                  Your query has been assigned to our counselor desk for <strong>{formData.center}</strong>. We will connect on <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-sky-300 underline cursor-pointer hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-sky-200 mb-1">
                    Your Full Name <span className="text-sky-400 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Joshi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-sky-200 mb-1">
                      Mobile Number <span className="text-sky-400 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-sky-200 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-sky-200 mb-1">Nearest Center</label>
                    <select
                      value={formData.center}
                      onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    >
                      <option value="Thane Head Office" className="bg-white text-[#0B1B3D]">Thane Head Office</option>
                      <option value="Andheri Campus (Mumbai)" className="bg-white text-[#0B1B3D]">Andheri Campus (Mumbai)</option>
                      <option value="Navi Mumbai (Vashi)" className="bg-white text-[#0B1B3D]">Navi Mumbai (Vashi)</option>
                      <option value="Pune (FC Road)" className="bg-white text-[#0B1B3D]">Pune (FC Road)</option>
                      <option value="Pune (Pimpri)" className="bg-white text-[#0B1B3D]">Pune (Pimpri)</option>
                      <option value="Nagpur Campus" className="bg-white text-[#0B1B3D]">Nagpur Campus</option>
                      <option value="Online Live Interactive" className="bg-white text-[#0B1B3D]">Online Live Interactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-sky-200 mb-1">Program of Interest</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    >
                      {ITV_COURSES.map((c) => (
                        <option key={c.id} value={c.title} className="bg-white text-[#0B1B3D]">
                          {c.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-sky-200 mb-1">Your Message / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background (e.g. Fresher / Working professional) and what guidance you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-blue-primary text-white font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <GoogleIcon name="send" size={18} />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right: All Campuses Address Directory */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-white font-display">
              Our Training Campuses Across India
            </h2>

            <div className="space-y-3">
              {CLASSROOM_CENTERS.map((center) => (
                <div
                  key={center.id}
                  className="glass-dark p-4 rounded-2xl space-y-2 hover:border-sky-300 transition-all border-2 border-sky-400/40 shadow-xl text-white"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">{center.name}</h3>
                    {center.isHeadOffice && (
                      <span className="bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold text-[10px] uppercase px-2 py-0.5 rounded shadow-xs border border-sky-300/40">
                        Head Office
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sky-200">{center.address}</p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-sky-200 pt-1">
                    <span className="flex items-center gap-1">
                      <GoogleIcon name="near_me" size={14} className="text-sky-300" />
                      {center.metroStation}
                    </span>
                    <span className="flex items-center gap-1">
                      <GoogleIcon name="call" size={14} className="text-sky-300" />
                      {center.contactNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
