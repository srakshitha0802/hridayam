import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { CLASSROOM_CENTERS } from '../data/itvedantData';

interface ClassroomCentersViewProps {
  onRequestCallback: (centerInterest?: string) => void;
}

export const ClassroomCentersView: React.FC<ClassroomCentersViewProps> = ({ onRequestCallback }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Mumbai / Thane', 'Mumbai', 'Navi Mumbai', 'Pune', 'Nagpur'];

  const filteredCenters =
    selectedCity === 'All'
      ? CLASSROOM_CENTERS
      : CLASSROOM_CENTERS.filter((c) => c.city.includes(selectedCity) || selectedCity.includes(c.city));

  return (
    <div className="space-y-16 pb-20 relative z-10 text-[#1E428E]">
      {/* Hero Section */}
      <section className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-white text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border-2 border-[#D3E5FD] text-[#1E428E] text-xs font-semibold shadow-xs">
            <GoogleIcon name="apartment" size={16} className="text-[#3869C3]" />
            <span>State-of-the-Art Physical Classrooms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1E428E]">
            Hridayam by Belvo Campus Locations
          </h1>

          <p className="text-[#1E428E]/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Experience high-performance computing labs, 1-on-1 mentor guidance, and daily interactive practice across Mumbai, Pune, Nagpur, or connect via our Live Online classrooms.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onRequestCallback('Campus Visit Booking')}
              className="btn-blue-primary px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-2 border border-white"
            >
              <GoogleIcon name="calendar_month" size={16} />
              Book a Free Campus Tour &amp; Demo
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs by City */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCity === city
                  ? 'btn-blue-primary text-white shadow-md border-2 border-white'
                  : 'bg-white/90 text-[#1E428E] hover:border-[#3869C3] border-2 border-[#D3E5FD] shadow-xs'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Centers Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="glass-card bg-white/95 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#3869C3] transition-all flex flex-col justify-between group border-2 border-white text-[#1E428E]"
            >
              <div>
                {/* Center Image */}
                <div className="h-52 bg-slate-900 relative overflow-hidden">
                  <img
                    src={center.imageUrl}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {center.isHeadOffice && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#1E428E] to-[#3869C3] text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md border border-white">
                      Headquarters &amp; Placement Hub
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/75 text-white font-semibold text-xs px-2.5 py-1 rounded-md backdrop-blur-md border border-white/40">
                    {center.city}
                  </span>
                </div>

                {/* Center Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-[#1E428E] text-lg group-hover:text-[#3869C3] transition-colors leading-snug">
                      {center.name}
                    </h3>
                    <p className="text-xs text-[#1E428E]/80 mt-1 leading-relaxed font-medium">
                      {center.address}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#1E428E] bg-[#D3E5FD]/40 p-3.5 rounded-2xl border border-[#84ADEB]/30">
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="near_me" size={16} className="text-[#3869C3] shrink-0 mt-0.5" />
                      <div>
                        <strong>Metro / Transit:</strong> {center.metroStation}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="schedule" size={16} className="text-[#3869C3] shrink-0 mt-0.5" />
                      <div>
                        <strong>Hours:</strong> {center.timing}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="call" size={16} className="text-[#3869C3] shrink-0 mt-0.5" />
                      <div>
                        <strong>Counselor Desk:</strong> {center.contactNumber}
                      </div>
                    </div>
                  </div>

                  {/* Campus Features / Amenities */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#3869C3] tracking-wider">
                      Campus Amenities
                    </span>
                    <div className="grid grid-cols-1 gap-1 text-xs text-[#1E428E]/85">
                      {center.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <GoogleIcon name="check_circle" size={14} className="text-[#3869C3] shrink-0" filled />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onRequestCallback(`Campus Visit: ${center.name}`)}
                  className="w-full py-3 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-white"
                >
                  <GoogleIcon name="calendar_month" size={16} />
                  Book Campus Visit &amp; Demo
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl border-2 border-white hover:border-[#3869C3] text-[#1E428E] text-xs font-semibold text-center block transition-colors bg-white/90 hover:bg-[#D3E5FD] shadow-xs"
                >
                  Get Directions on Google Maps ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
