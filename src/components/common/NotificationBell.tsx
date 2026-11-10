import React, { useState, useRef, useEffect } from 'react';
import { storageService } from '../../services/storage';
import { EmailNotification } from '../../types';
import { Bell, Mail, Check, ExternalLink, CheckCheck, Sparkles, CreditCard, Award, BookOpen } from 'lucide-react';
import { EmailPreviewModal } from './EmailPreviewModal';

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<EmailNotification[]>(() =>
    storageService.getNotifications()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<EmailNotification | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const refreshNotifications = () => {
    setNotifications(storageService.getNotifications());
  };

  const handleOpenNotification = (notif: EmailNotification) => {
    storageService.markNotificationRead(notif.id);
    refreshNotifications();
    setSelectedNotification(notif);
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    notifications.forEach((n) => {
      if (!n.isRead) storageService.markNotificationRead(n.id);
    });
    refreshNotifications();
  };

  const getIcon = (category: EmailNotification['category']) => {
    switch (category) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-[#C2185B]" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-[#E83E8C]" />;
      case 'quiz':
        return <BookOpen className="w-4 h-4 text-[#760D3B]" />;
      case 'enrolment':
        return <Sparkles className="w-4 h-4 text-[#C2185B]" />;
      default:
        return <Mail className="w-4 h-4 text-[#756572]" />;
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-[#756572] hover:text-[#21131B] hover:bg-[#FCE7F3]/40 rounded-xl transition-colors cursor-pointer"
          title="Notifications & Emails"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C2185B] text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#F0D6E3] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[#F0D6E3]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#21131B]">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-[#FCE7F3] text-[#760D3B] font-mono font-bold px-2 py-0.5 rounded-full border border-[#F0D6E3]">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] text-[#C2185B] hover:text-[#760D3B] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-[#F0D6E3]/40">
              {notifications.length > 0 ? (
                notifications.slice(0, 8).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleOpenNotification(notif)}
                    className={`p-3.5 hover:bg-[#FFF5F9] transition-colors cursor-pointer flex items-start gap-3 ${
                      !notif.isRead ? 'bg-[#FFF5F9]' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCE7F3]/60 flex items-center justify-center shrink-0 mt-0.5 border border-[#F0D6E3]/60">
                      {getIcon(notif.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs truncate ${!notif.isRead ? 'font-bold text-[#21131B]' : 'font-medium text-[#756572]'}`}>
                          {notif.subject}
                        </p>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#C2185B] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#756572] line-clamp-2 mt-0.5 leading-snug">
                        {notif.previewText}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-[#756572]/80">
                        <span>{new Date(notif.sentAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                        <span className="text-[#C2185B] font-bold hover:underline flex items-center gap-0.5">
                          <span>View Email</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[#756572]">
                  No notifications or transactional emails yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedNotification && (
        <EmailPreviewModal
          notification={selectedNotification}
          isOpen={!!selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </>
  );
};
