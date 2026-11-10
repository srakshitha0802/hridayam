import React, { useState } from 'react';
import { Course } from '../../types';
import { navigateTo } from '../../utils/navigation';
import { Clock, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    navigateTo(`/course/${course.id}`);
  };

  const isFree = course.price === 0;
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-[#F0D6E3] hover:border-[#C2185B]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* High-Resolution Thumbnail with Gradient Overlay */}
      <div className="relative aspect-16/9 bg-[#21131B] overflow-hidden">
        {!imgError && course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#21131B] via-[#760D3B] to-[#C2185B]" />
        )}

        {/* Ambient Dark Gradient Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#21131B]/90 via-[#21131B]/30 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-[#21131B]/85 backdrop-blur-md text-[#FCE7F3] px-2.5 py-1 rounded-md border border-white/10">
            {course.categoryName.split('&')[0]}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#21131B]/75 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#C2185B] group-hover:text-white transition-colors border border-white/10">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Bottom Floating Format & Level Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white text-[11px]">
          <span className="font-mono bg-white/15 backdrop-blur-md px-2 py-0.5 rounded text-slate-100">
            {course.level}
          </span>
          {course.format && (
            <span className="text-[10px] text-[#FCE7F3] font-semibold flex items-center gap-1 bg-[#760D3B]/80 px-2 py-0.5 rounded border border-[#C2185B]/60">
              <Sparkles className="w-2.5 h-2.5 text-[#E83E8C]" />
              {course.format}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center gap-2 text-xs text-[#756572] mb-2.5 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C2185B]" />
              <span>{course.durationHours} hrs</span>
            </span>
            <span aria-hidden="true" className="text-[#F0D6E3]">·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#756572]" />
              <span>{totalLessons} lessons</span>
            </span>
            <span aria-hidden="true" className="text-[#F0D6E3]">·</span>
            <span>{course.language}</span>
          </div>

          <h3 className="text-base font-bold text-[#21131B] group-hover:text-[#C2185B] transition-colors line-clamp-2 leading-snug mb-2">
            {course.title}
          </h3>

          <p className="text-xs text-[#756572] line-clamp-2 leading-relaxed mb-4">
            {course.shortDescription}
          </p>
        </div>

        {/* Card Footer: Instructor Profile & Price */}
        <div className="pt-4 border-t border-[#F0D6E3]/60 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#F0D6E3] shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-[#21131B] truncate leading-none">{course.instructor.name}</p>
              <p className="text-[10px] text-[#756572] truncate mt-1">{course.instructor.agency}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            {isFree ? (
              <span className="inline-flex items-center text-xs font-extrabold text-[#C2185B] bg-[#FCE7F3] border border-[#F0D6E3] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Free
              </span>
            ) : (
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-[#21131B] tabular-nums">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  {course.discountPercent && (
                    <span className="text-[10px] text-[#756572] line-through tabular-nums">
                      ₹{Math.round(course.price / (1 - course.discountPercent / 100)).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {course.discountPercent && (
                  <span className="text-[9px] font-bold text-[#C2185B] uppercase tracking-tight">
                    Save {course.discountPercent}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
