import React, { useState } from 'react';
import { Announcement } from '../../types';
import { X, ArrowRight } from 'lucide-react';
import { navigateTo } from '../../utils/navigation';

interface AnnouncementBarProps {
  announcement: Announcement;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!announcement.isPublished || isDismissed) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <span className="font-medium text-slate-200">{announcement.message}</span>
          {announcement.linkText && (
            <button
              onClick={() => navigateTo(announcement.linkUrl || '/courses')}
              className="inline-flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-2 ml-2 transition-colors cursor-pointer"
            >
              {announcement.linkText}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
