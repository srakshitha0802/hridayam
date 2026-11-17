import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { GOOGLE_REVIEWS_LIST } from '../data/itvedantData';

interface ReviewsViewProps {
  onRequestCallback: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onRequestCallback }) => {
  const [selectedBranch, setSelectedBranch] = useState('All');

  const branches = ['All', 'Thane Campus', 'FC Road, Pune Campus', 'Andheri West Campus', 'Vashi, Navi Mumbai Campus'];

  const filteredReviews =
    selectedBranch === 'All'
      ? GOOGLE_REVIEWS_LIST
      : GOOGLE_REVIEWS_LIST.filter((r) => r.branch === selectedBranch);

  return (
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* Hero Section */}
      <section className="glass-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-pink-400/35 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 text-xs font-semibold backdrop-blur-md">
            <GoogleIcon name="star" size={16} filled className="text-pink-300" />
            <span>4.8 / 5 Rating from 5,280+ Verified Google Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
            What Our Students & Alumni Say
          </h1>

          <p className="text-pink-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real feedback from freshers, non-IT graduates, and experienced engineers who accelerated their careers through Hridayam by Belvo.
          </p>
        </div>
      </section>

      {/* Review Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center border-2 border-pink-400/40 shadow-2xl">
          <div className="space-y-1">
            <div className="text-4xl font-bold text-white font-display flex items-center justify-center gap-2">
              <span>4.8</span>
              <div className="flex text-pink-300">
                {[...Array(5)].map((_, i) => (
                  <GoogleIcon key={i} name="star" size={20} filled className="text-pink-300" />
                ))}
              </div>
            </div>
            <p className="text-xs text-pink-200 font-semibold">Overall Rating on Google</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-pink-400/30 pt-4 md:pt-0">
            <div className="text-4xl font-bold text-pink-200 font-display">5,280+</div>
            <p className="text-xs text-pink-200 font-semibold">Total Google Reviews</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-pink-400/30 pt-4 md:pt-0">
            <div className="text-4xl font-bold text-white font-display">94.6%</div>
            <p className="text-xs text-pink-200 font-semibold">Recommended Placement Rate</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-pink-400/30 pt-4 md:pt-0">
            <div className="text-4xl font-bold text-pink-200 font-display">4.9 / 5</div>
            <p className="text-xs text-pink-200 font-semibold">Mentor & Lab Support Rating</p>
          </div>
        </div>
      </div>

      {/* Filter by Branch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md border border-pink-300/40'
                  : 'glass-dark text-pink-200 hover:text-white border border-pink-400/30'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-dark rounded-2xl p-6 space-y-4 hover:border-pink-300 transition-all flex flex-col justify-between border border-pink-400/40 shadow-xl text-white"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.studentName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-pink-400/40"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{rev.studentName}</h4>
                      <p className="text-[11px] text-pink-200">{rev.course}</p>
                    </div>
                  </div>
                  <div className="flex text-pink-300">
                    {[...Array(rev.rating)].map((_, i) => (
                      <GoogleIcon key={i} name="star" size={14} filled className="text-pink-300" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-pink-100 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-pink-400/30 flex items-center justify-between text-[11px] text-pink-200">
                <span className="flex items-center gap-1 font-semibold text-pink-300">
                  <GoogleIcon name="location_on" size={14} />
                  {rev.branch}
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onRequestCallback}
            className="btn-pink-primary px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:shadow-2xl cursor-pointer inline-flex items-center gap-2"
          >
            <GoogleIcon name="call" size={16} />
            Book a Free Career Counseling Session
          </button>
        </div>
      </section>
    </div>
  );
};
