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
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-[#C2185B]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#C2185B]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#E83E8C]" />;
      case 'Film': return <Film className="w-5 h-5 text-[#760D3B]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#C2185B]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#E83E8C]" />;
      case 'Camera': return <Camera className="w-5 h-5 text-[#C2185B]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#760D3B]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#E83E8C]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#760D3B]" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#C2185B]" />;
      default: return <FolderKanban className="w-5 h-5 text-[#760D3B]" />;
    }
  };

  const handleClick = () => {
    navigateTo(`/courses?category=${category.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-[#F0D6E3] hover:border-[#C2185B]/50 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF5F9] border border-[#F0D6E3] flex items-center justify-center group-hover:bg-[#FCE7F3] group-hover:border-[#C2185B]/30 transition-colors">
            {getIcon(category.iconName)}
          </div>
          <span className="text-xs font-mono text-[#756572] group-hover:text-[#C2185B] transition-colors">
            {courseCount} {courseCount === 1 ? 'course' : 'courses'}
          </span>
        </div>

        <h3 className="text-sm font-bold text-[#21131B] group-hover:text-[#C2185B] transition-colors mb-2 leading-snug">
          {category.name}
        </h3>

        <p className="text-xs text-[#756572] line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>

        {/* Subtopics unboxed list */}
        <div className="space-y-1 mb-4 pt-3 border-t border-[#F0D6E3]/60">
          {category.subtopics.slice(0, 3).map((sub, idx) => (
            <p key={idx} className="text-[11px] text-[#756572] truncate flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#F0D6E3] group-hover:bg-[#C2185B]" />
              <span>{sub}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center text-xs font-bold text-[#C2185B] group-hover:text-[#760D3B] transition-colors gap-1 pt-2">
        <span>Explore Curriculum</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
