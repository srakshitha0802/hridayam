import React from 'react';
import { Category } from '../../types';
import { navigateTo } from '../../utils/navigation';
import {
  Megaphone,
  Code,
  Palette,
  Film,
  Cpu,
  ShoppingBag,
  Camera,
  Briefcase,
  FileText,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  FolderKanban
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  courseCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, courseCount = 0 }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-teal-600" />;
      case 'Code': return <Code className="w-5 h-5 text-teal-600" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-600" />;
      case 'Film': return <Film className="w-5 h-5 text-purple-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case 'Camera': return <Camera className="w-5 h-5 text-rose-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-slate-700" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-600" />;
      default: return <FolderKanban className="w-5 h-5 text-slate-700" />;
    }
  };

  const handleClick = () => {
    navigateTo(`/courses?category=${category.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-xl border border-slate-200/90 hover:border-teal-500/50 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-colors">
            {getIcon(category.iconName)}
          </div>
          <span className="text-xs font-mono text-slate-400 group-hover:text-teal-700 transition-colors">
            {courseCount} {courseCount === 1 ? 'course' : 'courses'}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 leading-snug">
          {category.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>

        {/* Subtopics unboxed list */}
        <div className="space-y-1 mb-4 pt-3 border-t border-slate-100">
          {category.subtopics.slice(0, 3).map((sub, idx) => (
            <p key={idx} className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-teal-400" />
              <span>{sub}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center text-xs font-semibold text-teal-700 group-hover:text-teal-900 transition-colors gap-1 pt-2">
        <span>Explore Curriculum</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
