import React, { useState, useMemo } from 'react';
import { Course, Category } from '../types';
import { storageService } from '../services/storage';
import { CourseCard } from '../components/common/CourseCard';
import { Search, SlidersHorizontal, BookOpen, RotateCcw } from 'lucide-react';

export const CoursesPage: React.FC<{ initialCategory?: string }> = ({ initialCategory }) => {
  const [courses] = useState<Course[]>(() => storageService.getCourses());
  const [categories] = useState<Category[]>(() => storageService.getCategories());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'price-asc' | 'price-desc'>('newest');

  const filteredAndSortedCourses = useMemo(() => {
    return courses
      .filter((c) => {
        if (c.status !== 'published') return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchDesc = c.shortDescription.toLowerCase().includes(q);
          const matchInstructor = c.instructor.name.toLowerCase().includes(q);
          const matchCategory = c.categoryName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchInstructor && !matchCategory) return false;
        }

        if (selectedCategory !== 'all' && c.categoryId !== selectedCategory) return false;
        if (selectedLevel !== 'all' && c.level.toLowerCase() !== selectedLevel.toLowerCase()) return false;
        if (selectedPrice === 'free' && c.price > 0) return false;
        if (selectedPrice === 'paid' && c.price === 0) return false;

        if (selectedFormat !== 'all' && c.format !== selectedFormat) return false;

        if (selectedDuration === 'short' && c.durationHours > 15) return false;
        if (selectedDuration === 'medium' && (c.durationHours <= 15 || c.durationHours > 30)) return false;
        if (selectedDuration === 'long' && c.durationHours <= 30) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice, selectedDuration, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSelectedDuration('all');
    setSelectedFormat('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedPrice !== 'all' ||
    selectedDuration !== 'all' ||
    selectedFormat !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#F0D6E3] pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          Explore Courses
        </h1>
        <p className="text-sm text-[#756572] mt-2 max-w-2xl">
          Practical, industry-standard curriculums authored by Belvo engineers and directors. Filter by skill domain, difficulty level, and duration.
        </p>
      </div>

      {/* Control Bar: Search & Quick Filters */}
      <div className="bg-white rounded-2xl border border-[#F0D6E3] p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#756572] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, skills, instructor..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] placeholder-[#756572]/60 focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-[#756572] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B] cursor-pointer"
            >
              <option value="newest">Newest Releases</option>
              <option value="title">Alphabetical (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Filter Selectors */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F0D6E3]/60 text-xs">
          <div className="flex items-center gap-1.5 text-[#760D3B] font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2185B]" />
            <span>Filters:</span>
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B]"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B]"
          >
            <option value="all">All Skill Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Price */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B]"
          >
            <option value="all">All Pricing</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Masterclasses</option>
          </select>

          {/* Duration */}
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B]"
          >
            <option value="all">Any Duration</option>
            <option value="short">Short (&lt; 15 hours)</option>
            <option value="medium">Medium (15 - 30 hours)</option>
            <option value="long">In-Depth (30+ hours)</option>
          </select>

          {/* Format */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:outline-none focus:border-[#C2185B]"
          >
            <option value="all">All Formats</option>
            <option value="Cohort-Based">Cohort-Based</option>
            <option value="Self-Paced">Self-Paced</option>
            <option value="Weekend Intensive">Weekend Intensive</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#C2185B] hover:text-[#760D3B] hover:underline ml-auto cursor-pointer font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#756572] mb-6">
          <span>
            Showing <strong className="text-[#21131B]">{filteredAndSortedCourses.length}</strong> published {filteredAndSortedCourses.length === 1 ? 'course' : 'courses'}
          </span>
        </div>

        {filteredAndSortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-[#F0D6E3] p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#756572] mx-auto" />
            <h3 className="text-base font-bold text-[#21131B]">No courses match your filter criteria</h3>
            <p className="text-xs text-[#756572] max-w-sm mx-auto">
              Try resetting your category or price filters to see other available courses.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#C2185B] rounded-xl hover:bg-[#760D3B] transition-all inline-block cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
