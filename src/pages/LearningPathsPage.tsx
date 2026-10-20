import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { LearningPath, Course } from '../types';
import { Compass, Clock, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const LearningPathsPage: React.FC = () => {
  const [paths] = useState<LearningPath[]>(() => storageService.getLearningPaths());
  const [courses] = useState<Course[]>(() => storageService.getCourses());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Trajectories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Learning Paths
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
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
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono text-teal-700 font-semibold">{path.totalDurationHours}h Total Curriculum</span>
                    <span>·</span>
                    <span>Target Role: <strong className="text-slate-900">{path.targetRole}</strong></span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                    {path.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {path.shortDescription}
                  </p>
                </div>
              </div>

              {/* Outcomes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Core Competencies Earned:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {path.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Courses Sequence */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Included Courses Sequence:
                </h4>
                {includedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {includedCourses.map((c, stepIdx) => (
                      <div
                        key={c.id}
                        onClick={() => navigateTo(`/course/${c.id}`)}
                        className="group p-4 bg-slate-50 border border-slate-200 hover:border-teal-500/50 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 font-mono text-xs flex items-center justify-center font-bold">
                            {stepIdx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                              {c.title}
                            </p>
                            <p className="text-[11px] text-slate-500">{c.level} · {c.durationHours}h</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
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
