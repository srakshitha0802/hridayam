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
    <div className="space-y-16 pb-20 relative z-10 text-[#1E428E]">
      {/* Hero Section */}
      <section className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-white text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-white text-[#1E428E] text-xs font-bold shadow-xs">
            <GoogleIcon name="star" size={16} filled className="text-amber-500" />
            <span>4.8 / 5 Rating from 5,280+ Verified Google Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1E428E] tracking-tight">
            What Our Students &amp; Alumni Say
          </h1>

          <p className="text-[#1E428E]/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Real feedback from freshers, non-IT graduates, and experienced engineers who accelerated their careers through Hridayam by Belvo.
          </p>
        </div>
      </section>

      {/* Review Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center border-2 border-white shadow-xl text-[#1E428E]">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#1E428E] font-display flex items-center justify-center gap-2">
              <span>4.8</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <GoogleIcon key={i} name="star" size={20} filled className="text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#1E428E]/75 font-semibold">Overall Rating on Google</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#84ADEB]/30 pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#3869C3] font-display">5,280+</div>
            <p className="text-xs text-[#1E428E]/75 font-semibold">Total Google Reviews</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#84ADEB]/30 pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#1E428E] font-display">94.6%</div>
            <p className="text-xs text-[#1E428E]/75 font-semibold">Recommended Placement Rate</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#84ADEB]/30 pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#3869C3] font-display">4.9 / 5</div>
            <p className="text-xs text-[#1E428E]/75 font-semibold">Mentor &amp; Lab Support Rating</p>
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
                  ? 'btn-blue-primary text-white shadow-md'
                  : 'glass-card text-[#1E428E] hover:text-[#3869C3] border border-white shadow-xs'
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
              className="glass-card rounded-2xl p-6 space-y-4 hover:border-[#3869C3] transition-all flex flex-col justify-between border-2 border-white shadow-lg hover:shadow-2xl text-[#1E428E]"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1E428E] to-[#3869C3] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E428E] text-sm">{rev.author}</h4>
                      <p className="text-[11px] text-[#3869C3] font-medium">{rev.course}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <GoogleIcon key={i} name="star" size={14} filled className="text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#1E428E]/85 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#84ADEB]/30 flex items-center justify-between text-[11px] text-[#1E428E]/75">
                <span className="flex items-center gap-1 font-semibold text-[#3869C3]">
                  <GoogleIcon name="location_on" size={14} />
                  {rev.branch}
                </span>
                <span className="font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onRequestCallback}
            className="btn-blue-primary px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:shadow-2xl cursor-pointer inline-flex items-center gap-2"
          >
            <GoogleIcon name="call" size={16} />
            Book a Free Career Counseling Session
          </button>
        </div>
      </section>
    </div>
  );
};
