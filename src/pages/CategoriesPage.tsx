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
      <div className="border-b border-[#F0D6E3] pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#760D3B]">
          <Layers className="w-3.5 h-3.5 text-[#C2185B]" />
          <span>Curriculum Taxonomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          The 11 Core Learning Disciplines
        </h1>
        <p className="text-xs sm:text-sm text-[#756572] max-w-2xl leading-relaxed">
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

      {/* Selected Category Deep Dive */}
      {activeCategory && (
        <div className="bg-white rounded-3xl border border-[#C2185B]/40 p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0D6E3]/60 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#C2185B] font-bold">Active Selection</span>
              <h2 className="text-2xl font-bold text-[#21131B] mt-0.5">{activeCategory.name}</h2>
              <p className="text-xs text-[#756572] mt-1">{activeCategory.description}</p>
            </div>
            <button
              onClick={() => navigateTo(`/courses?category=${activeCategory.id}`)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#C2185B] rounded-xl hover:bg-[#760D3B] transition-all inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <span>View in Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#760D3B]">Subtopic Specializations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {activeCategory.subtopics.map((sub, idx) => (
                <div key={idx} className="p-3 bg-[#FFF5F9] border border-[#F0D6E3] rounded-xl text-xs font-medium text-[#21131B]">
                  {sub}
                </div>
              ))}
            </div>
          </div>

          {filteredCourses.length > 0 && (
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#760D3B]">
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
