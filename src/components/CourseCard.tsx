import React from 'react';
import { GoogleIcon } from './GoogleIcon';
import { COURSE_EXTRAS } from '../data/catalogSeed';
import { Course } from '../types';
import { ResilientImage } from './ResilientImage';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  isSaved?: boolean;
  isCompared?: boolean;
  hasActiveSubscription?: boolean;
  onSelect: (course: Course) => void;
  onToggleSave?: (courseId: string) => void;
  onToggleCompare?: (courseId: string) => void;
}

export function CourseCard({
  course,
  isEnrolled,
  isSaved,
  isCompared,
  hasActiveSubscription,
  onSelect,
  onToggleSave,
  onToggleCompare,
}: CourseCardProps) {
  const extra = COURSE_EXTRAS[course.id];
  const priceLabel = course.isFree
    ? 'Free Access'
    : hasActiveSubscription && course.includedInSubscription
    ? 'Included in Pro'
    : `$${course.price}`;

  return (
    <article
      onClick={() => onSelect(course)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(course);
        }
      }}
      tabIndex={0}
      role="button"
      className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer text-left hover:border-pink-300 transition-all shadow-xl border border-pink-400/40 text-white"
    >
      <div>
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/40 border-b border-pink-400/30 relative">
          <ResilientImage
            src={course.thumbnailUrl}
            alt={course.title}
            fallbackTitle={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#200318]/70 via-transparent to-transparent" />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(course.id);
                }}
                aria-label={isCompared ? `Remove ${course.title} from comparison` : `Compare ${course.title}`}
                title={isCompared ? 'Selected for comparison' : 'Compare course'}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shadow-md ${
                  isCompared
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400'
                    : 'bg-black/60 backdrop-blur-md text-white border-pink-400/40 hover:border-pink-300'
                }`}
              >
                <GoogleIcon name="compare_arrows" size={18} />
              </button>
            )}
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(course.id);
                }}
                aria-label={isSaved ? `Remove ${course.title} from shortlist` : `Save ${course.title} to shortlist`}
                title={isSaved ? 'Saved to shortlist' : 'Save to shortlist'}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shadow-md ${
                  isSaved
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400'
                    : 'bg-black/60 backdrop-blur-md text-white border-pink-400/40 hover:border-pink-300'
                }`}
              >
                <GoogleIcon name="bookmark" size={18} filled={isSaved} />
              </button>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-pink-200">
            <span className="font-semibold text-pink-300 truncate max-w-[195px]">{course.category}</span>
            <span aria-hidden="true">·</span>
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{course.durationHours}h</span>
            {extra && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-mono-tabular font-semibold text-white">
                  <GoogleIcon name="star" size={14} filled className="text-pink-300" />
                  {extra.rating}
                </span>
              </>
            )}
          </div>

          <h3 className="font-display text-lg font-bold text-white mt-2 leading-snug group-hover:text-pink-200 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-pink-100 mt-2 line-clamp-2 leading-relaxed">
            {course.summary}
          </p>
          {extra && (
            <p className="text-[11px] text-pink-200 mt-2.5 truncate">
              Tools: <span className="font-semibold text-white">{extra.toolsCovered.join(' · ')}</span>
            </p>
          )}
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-pink-400/30 flex items-center justify-between gap-4 bg-black/30 backdrop-blur-md">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-pink-100 truncate">Instructor: {course.instructorName}</p>
          <p className="font-mono-tabular text-xs text-pink-200 mt-0.5">
            {course.modulesCount} modules · {course.enrolledCount} learners
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className="font-mono-tabular text-sm font-bold text-pink-300"
          >
            {isEnrolled ? 'Enrolled' : priceLabel}
          </span>
          <GoogleIcon name="north_east" size={16} className="text-pink-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
}
