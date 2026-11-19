import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { GOOGLE_REVIEWS_LIST } from '../data/itvedantData';
import { PROVIDED_IMAGES } from '../data/mediaAssets';

type ReviewItem = (typeof GOOGLE_REVIEWS_LIST)[number];

interface ReviewsViewProps {
  onRequestCallback: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onRequestCallback }) => {
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [reviews, setReviews] = useState<ReviewItem[]>(GOOGLE_REVIEWS_LIST);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [courseName, setCourseName] = useState('AI, Machine Learning & Automation');
  const [branchName, setBranchName] = useState('Thane Campus');
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const branches = ['All', 'Thane Campus', 'FC Road, Pune Campus', 'Andheri West Campus', 'Vashi, Navi Mumbai Campus'];

  const filteredReviews =
    selectedBranch === 'All'
      ? reviews
      : reviews.filter((r) => r.branch === selectedBranch);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;
    const newRev: ReviewItem = {
      id: `rev_${Date.now()}`,
      author: authorName.trim(),
      avatarUrl: PROVIDED_IMAGES.indianStudentLaptop,
      course: courseName,
      branch: branchName,
      rating: ratingVal,
      text: reviewText.trim(),
      date: 'Just now',
    };
    setReviews((prev) => [newRev, ...prev]);
    setAuthorName('');
    setReviewText('');
    setShowReviewForm(false);
  };

  return (
    <div className="space-y-12 pb-20 relative z-10 text-[#0B1B3D]">
      {/* Hero Section */}
      <section className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto frame-border-blue rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#1E428E]">
            4.9 / 5 Rating · 5,280+ Verified Indian Learner Reviews
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#0B1B3D] tracking-tight">
            What Our Students &amp; Alumni Say
          </h1>

          <p className="text-slate-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Real feedback from freshers, non-IT graduates, and experienced engineers who accelerated their careers through Hridayam by Belvo.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="btn-blue-primary px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              {showReviewForm ? 'Close Review Form' : 'Write a Verified Student Review'}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Add Review Panel */}
      {showReviewForm && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmitReview} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Share Your Hridayam Learning Experience</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Rohan Deshpande"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Campus / Branch</label>
                <select
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-bold"
                >
                  {branches.slice(1).map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Program Completed</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Star Rating</label>
                <select
                  value={ratingVal}
                  onChange={(e) => setRatingVal(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-bold"
                >
                  <option value={5}>5 / 5 Stars — Outstanding</option>
                  <option value={4}>4 / 5 Stars — Great Experience</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-bold text-[#0B1B3D] mb-1">Your Review *</label>
              <textarea
                rows={3}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell future Indian learners about mentors, capstone projects, and placement support..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl btn-blue-primary text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              Publish Review Live
            </button>
          </form>
        </section>
      )}

      {/* Review Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-[#0B1B3D]">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#1E428E] font-mono-tabular flex items-center justify-center gap-2">
              <span>4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <GoogleIcon key={i} name="star" size={20} filled className="text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 font-bold">Overall Rating on Google</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#BFD6F6] pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#1E428E] font-mono-tabular">5,280+</div>
            <p className="text-xs text-slate-600 font-bold">Total Verified Reviews</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#BFD6F6] pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#0B1B3D] font-mono-tabular">94.6%</div>
            <p className="text-xs text-slate-600 font-bold">Recommended Placement Rate</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#BFD6F6] pt-4 md:pt-0">
            <div className="text-4xl font-extrabold text-[#1E428E] font-mono-tabular">4.9 / 5</div>
            <p className="text-xs text-slate-600 font-bold">Mentor &amp; Lab Support Rating</p>
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
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'btn-blue-primary text-white shadow-md'
                  : 'glass-card text-[#0B1B3D] hover:text-[#1E428E]'
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
              className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between text-[#0B1B3D]"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.author}
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#BFD6F6] shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#132C63] to-[#2B59B5] text-white flex items-center justify-center font-bold text-base shrink-0">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-extrabold text-[#0B1B3D] text-sm">{rev.author}</h4>
                      <p className="text-[11px] text-[#2B59B5] font-bold">{rev.course}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <GoogleIcon key={i} name="star" size={14} filled className="text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#D3E5FD] flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-bold text-[#1E428E]">
                  <GoogleIcon name="location_on" size={14} />
                  {rev.branch}
                </span>
                <span className="font-semibold">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onRequestCallback}
            className="btn-blue-primary px-8 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white shadow-xl cursor-pointer inline-flex items-center gap-2"
          >
            <GoogleIcon name="call" size={16} />
            Book a Free Career Counseling Session
          </button>
        </div>
      </section>
    </div>
  );
};
