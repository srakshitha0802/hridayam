import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  GraduationCap,
  MapPin,
  BookOpen,
  PhoneCall,
  Download,
  MessageSquare,
  CornerDownLeft,
} from 'lucide-react';
import { AppView } from '../types';
import { ITV_COURSES, CLASSROOM_CENTERS } from '../data/itvedantData';
import { FIXED_DEMO_ACCOUNTS } from '../context/AuthContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
  onOpenChatbot: () => void;
}

interface PaletteItem {
  id: string;
  group: 'Quick Actions' | 'Career Programs' | 'Role-Protected Portals' | 'Indian Campuses';
  title: string;
  subtitle: string;
  meta?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
  onOpenChatbot,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo<PaletteItem[]>(() => {
    const quickActions: PaletteItem[] = [
      {
        id: 'act-counseling',
        group: 'Quick Actions',
        title: 'Book 1-on-1 Free Career Counseling',
        subtitle: 'Get a personalized curriculum roadmap & scholarship audit',
        meta: 'Instant callback',
        icon: <PhoneCall className="w-4 h-4 text-sky-300" />,
        onSelect: () => {
          onClose();
          onRequestCallback('Command Palette Counseling Request');
        },
      },
      {
        id: 'act-brochure',
        group: 'Quick Actions',
        title: 'Download 2026 Master Prospectus PDF',
        subtitle: 'Complete syllabus, INR fee tables & placement audit across 11 tracks',
        meta: 'PDF Brochure',
        icon: <Download className="w-4 h-4 text-sky-300" />,
        onSelect: () => {
          onClose();
          onDownloadBrochure('Complete Hridayam by Belvo 2026 Prospectus');
        },
      },
      {
        id: 'act-advisor',
        group: 'Quick Actions',
        title: 'Ask Career Advisor Chatbot',
        subtitle: 'Check fees, 0% EMI, non-IT eligibility, and campus timings',
        meta: 'Live Q&A',
        icon: <MessageSquare className="w-4 h-4 text-sky-300" />,
        onSelect: () => {
          onClose();
          onOpenChatbot();
        },
      },
    ];

    const courseItems: PaletteItem[] = ITV_COURSES.map((course) => ({
      id: `course-${course.id}`,
      group: 'Career Programs',
      title: course.title,
      subtitle: `${course.categoryLabel} · ${course.toolsCovered.slice(0, 3).join(', ')}`,
      meta: `₹${course.fee.toLocaleString('en-IN')} · ${course.duration}`,
      icon: <BookOpen className="w-4 h-4 text-sky-200" />,
      onSelect: () => {
        onClose();
        onSelectCourse(course.id);
      },
    }));

    const portalItems: PaletteItem[] = FIXED_DEMO_ACCOUNTS.map((acc) => {
      const target: AppView =
        acc.role === 'student'
          ? 'student'
          : acc.role === 'mentor'
            ? 'mentor-portal'
            : acc.role === 'recruiter'
              ? 'recruiter-portal'
              : 'instructor';
      return {
        id: `portal-${acc.id}`,
        group: 'Role-Protected Portals',
        title: acc.roleLabel,
        subtitle: `${acc.email} · Pass: ${acc.password}`,
        meta: 'Fixed Demo',
        icon: <GraduationCap className="w-4 h-4 text-violet-200" />,
        onSelect: () => {
          onClose();
          onNavigate(target);
        },
      };
    });

    const campusItems: PaletteItem[] = CLASSROOM_CENTERS.map((center) => ({
      id: `campus-${center.id}`,
      group: 'Indian Campuses',
      title: `${center.city} — ${center.name}`,
      subtitle: center.metroStation,
      meta: center.city,
      icon: <MapPin className="w-4 h-4 text-emerald-200" />,
      onSelect: () => {
        onClose();
        onNavigate('centers');
      },
    }));

    return [...quickActions, ...courseItems, ...portalItems, ...campusItems];
  }, [onClose, onDownloadBrochure, onNavigate, onOpenChatbot, onRequestCallback, onSelectCourse]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 12);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      } else if (e.key === 'Enter' && filteredItems[activeIndex]) {
        e.preventDefault();
        filteredItems[activeIndex].onSelect();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, filteredItems, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-[#030A1C]/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Quick search programs, portals, and campuses"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl crystal-overlay-panel rounded-3xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Row */}
        <div className="px-5 py-4 border-b border-white/15 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-300 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs (Python, AI, MERN), portals, campuses, or actions..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-sky-100/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close quick search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[58vh] overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-bold text-white">No matching programs or portals found</p>
              <p className="text-xs text-sky-200/75">
                Try searching &ldquo;Data Science&rdquo;, &ldquo;Student&rdquo;, &ldquo;Pune&rdquo;, or &ldquo;Brochure&rdquo;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === activeIndex;
              const prevGroup = idx > 0 ? filteredItems[idx - 1].group : null;
              const showGroupHeader = item.group !== prevGroup;

              return (
                <React.Fragment key={item.id}>
                  {showGroupHeader && (
                    <div className="px-3 pt-2.5 pb-1 text-[11px] font-bold text-sky-300/85 tracking-wide">
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={item.onSelect}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white/16 border border-white/28'
                        : 'border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/18 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">{item.title}</div>
                        <div className="text-xs text-sky-100/75 truncate">{item.subtitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.meta && (
                        <span className="hidden sm:inline text-[11px] font-mono-tabular text-sky-200">
                          {item.meta}
                        </span>
                      )}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-white translate-x-0.5' : 'text-sky-300/60'
                        }`}
                      />
                    </div>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div className="px-5 py-3 border-t border-white/15 bg-[#050E26]/60 flex items-center justify-between text-[11px] text-sky-200/80">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Select
            </span>
            <span>↑ ↓ Navigate</span>
            <span>Esc Close</span>
          </div>
          <span className="font-mono-tabular">{filteredItems.length} results</span>
        </div>
      </div>
    </div>
  );
};
