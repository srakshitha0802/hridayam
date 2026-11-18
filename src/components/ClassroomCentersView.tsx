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
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* Hero Section */}
      <section className="glass-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-sky-400/35 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs font-semibold backdrop-blur-md">
            <GoogleIcon name="apartment" size={16} className="text-sky-300" />
            <span>State-of-the-Art Physical Classrooms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
            Hridayam by Belvo Campus Locations
          </h1>

          <p className="text-sky-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience high-performance computing labs, 1-on-1 mentor guidance, and daily interactive practice across Mumbai, Pune, Nagpur, or connect via our Live Online classrooms.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onRequestCallback('Campus Visit Booking')}
              className="btn-pink-primary px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-2"
            >
              <GoogleIcon name="calendar_month" size={16} />
              Book a Free Campus Tour & Demo
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
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md border border-sky-300/40'
                  : 'glass-dark text-sky-200 hover:text-white border border-sky-400/30'
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
              className="glass-dark rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-sky-300 transition-all flex flex-col justify-between group border border-sky-400/40 text-white"
            >
              <div>
                {/* Center Image */}
                <div className="h-52 bg-black/40 relative overflow-hidden">
                  <img
                    src={center.imageUrl}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {center.isHeadOffice && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md border border-sky-300/40">
                      Headquarters & Placement Hub
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/75 text-sky-100 font-semibold text-xs px-2.5 py-1 rounded-md backdrop-blur-md border border-sky-400/30">
                    {center.city}
                  </span>
                </div>

                {/* Center Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-sky-200 transition-colors leading-snug">
                      {center.name}
                    </h3>
                    <p className="text-xs text-sky-200 mt-1 leading-relaxed">
                      {center.address}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-sky-100 bg-black/35 p-3.5 rounded-2xl border border-sky-400/30">
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="near_me" size={16} className="text-sky-300 shrink-0 mt-0.5" />
                      <div>
                        <strong>Metro / Transit:</strong> {center.metroStation}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="schedule" size={16} className="text-sky-300 shrink-0 mt-0.5" />
                      <div>
                        <strong>Hours:</strong> {center.timing}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GoogleIcon name="call" size={16} className="text-sky-300 shrink-0 mt-0.5" />
                      <div>
                        <strong>Counselor Desk:</strong> {center.contactNumber}
                      </div>
                    </div>
                  </div>

                  {/* Campus Features / Amenities */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-sky-300 tracking-wider">
                      Campus Amenities
                    </span>
                    <div className="grid grid-cols-1 gap-1 text-xs text-sky-200">
                      {center.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <GoogleIcon name="check_circle" size={14} className="text-sky-400 shrink-0" filled />
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
                  className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GoogleIcon name="calendar_month" size={16} />
                  Book Campus Visit & Demo
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl border border-sky-400/30 hover:border-sky-300 text-sky-200 text-xs font-semibold text-center block transition-colors bg-white/10"
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
