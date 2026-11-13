import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { LearningPath, Course } from '../types';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const LearningPathsPage: React.FC = () => {
  const [paths] = useState<LearningPath[]>(() => storageService.getLearningPaths());
  const [courses] = useState<Course[]>(() => storageService.getCourses());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="border-b border-[#F0D6E3] pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#760D3B]">
          <Compass className="w-3.5 h-3.5 text-[#C2185B]" />
          <span>Curated Trajectories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          Learning Paths
        </h1>
        <p className="text-xs sm:text-sm text-[#756572] max-w-2xl leading-relaxed">
          Sequenced curriculums grouped into clear career outcomes. Each path shows actual prerequisite requirements and genuine included courses.
        </p>
      </div>

      <div className="space-y-8">
        {paths.map((path) => {
          const includedCourses = path.courseIds
            .map((id) => courses.find((c) => c.id === id))
            .filter(Boolean) as Course[];

          return (
            <div
              key={path.id}
              className="bg-white rounded-3xl border border-[#F0D6E3] p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F0D6E3]/60 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#756572]">
                    <span className="font-mono text-[#C2185B] font-bold">{path.totalDurationHours}h Total Curriculum</span>
                    <span>·</span>
                    <span>Target Role: <strong className="text-[#21131B]">{path.targetRole}</strong></span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#21131B]">
                    {path.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#756572] leading-relaxed">
                    {path.shortDescription}
                  </p>
                </div>
              </div>

              {/* Outcomes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#760D3B]">
                  Core Competencies Earned:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {path.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#21131B] bg-[#FFF5F9] p-3 rounded-xl border border-[#F0D6E3]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C2185B] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Courses Sequence */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#760D3B]">
                  Included Courses Sequence:
                </h4>
                {includedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {includedCourses.map((c, stepIdx) => (
                      <div
                        key={c.id}
                        onClick={() => navigateTo(`/course/${c.id}`)}
                        className="group p-4 bg-[#FFFBFD] border border-[#F0D6E3] hover:border-[#C2185B]/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all shadow-2xs hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#760D3B] text-[#FCE7F3] font-mono text-xs flex items-center justify-center font-bold">
                            {stepIdx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-[#21131B] group-hover:text-[#C2185B] transition-colors line-clamp-1">
                              {c.title}
                            </p>
                            <p className="text-[11px] text-[#756572]">{c.level} · {c.durationHours}h</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#756572] group-hover:text-[#C2185B] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#FFF5F9] border border-dashed border-[#F0D6E3] rounded-2xl text-xs text-[#756572]">
                    Curriculum sequence in preparation. Scheduled for subsequent Belvo release.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
