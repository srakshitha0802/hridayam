import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { Category, Course } from '../types';
import { CategoryCard } from '../components/common/CategoryCard';
import { CourseCard } from '../components/common/CourseCard';
import { Layers, ArrowRight } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const CategoriesPage: React.FC = () => {
  const [categories] = useState<Category[]>(() => storageService.getCategories());
  const [courses] = useState<Course[]>(() => storageService.getCourses());
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  const activeCategory = selectedCatId ? categories.find((c) => c.id === selectedCatId) : null;
  const filteredCourses = activeCategory
    ? courses.filter((c) => c.categoryId === activeCategory.id && c.status === 'published')
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Curriculum Taxonomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          The 11 Core Learning Disciplines
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Every category is structured around industry-relevant execution. Select any discipline to inspect subtopics, competencies, and available masterclasses.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = courses.filter((c) => c.categoryId === cat.id && c.status === 'published').length;
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCatId(selectedCatId === cat.id ? null : cat.id)}
              className="cursor-pointer"
            >
              <CategoryCard category={cat} courseCount={count} />
            </div>
          );
        })}
      </div>

      {/* Selected Category Deep Dive (if clicked) */}
      {activeCategory && (
        <div className="bg-white rounded-2xl border border-teal-500/40 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-teal-700 font-semibold">Active Selection</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-0.5">{activeCategory.name}</h2>
              <p className="text-xs text-slate-600 mt-1">{activeCategory.description}</p>
            </div>
            <button
              onClick={() => navigateTo(`/courses?category=${activeCategory.id}`)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>View in Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Subtopic Specializations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {activeCategory.subtopics.map((sub, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-800">
                  {sub}
                </div>
              ))}
            </div>
          </div>

          {filteredCourses.length > 0 && (
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Courses in {activeCategory.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
