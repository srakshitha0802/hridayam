import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import { EmailNotification } from '../../types';
import { EmailPreviewModal } from './EmailPreviewModal';
import {
  Bell,
  CheckCheck,
  CreditCard,
  Award,
  BookOpen,
  Mail,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const NotificationBell: React.FC = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [activeNotification, setActiveNotification] = useState<EmailNotification | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = () => {
    if (currentUser) {
      setNotifications(storageService.getNotifications(currentUser.id));
    } else {
      setNotifications(storageService.getNotifications());
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 4000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleOpenNotification = (notif: EmailNotification) => {
    storageService.markNotificationRead(notif.id);
    fetchNotifications();
    setActiveNotification(notif);
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    if (currentUser) {
      storageService.markAllNotificationsRead(currentUser.id);
      fetchNotifications();
    }
  };

  const getIcon = (category: EmailNotification['category']) => {
    switch (category) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'quiz':
        return <BookOpen className="w-4 h-4 text-sky-600" />;
      case 'enrolment':
        return <Sparkles className="w-4 h-4 text-teal-600" />;
      default:
        return <Mail className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          title="Notifications & Emails"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-teal-50 text-teal-700 font-mono font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {notifications.length > 0 ? (
                notifications.slice(0, 8).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleOpenNotification(notif)}
                    className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                      !notif.isRead ? 'bg-teal-50/30' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon(notif.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs truncate ${!notif.isRead ? 'font-bold text-slate-950' : 'font-medium text-slate-800'}`}>
                          {notif.subject}
                        </p>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {notif.previewText}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                        <span>{new Date(notif.sentAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                        <span className="text-teal-700 font-medium hover:underline flex items-center gap-0.5">
                          <span>View Email</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No notifications yet.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-100 bg-slate-50/50 text-center">
              <span className="text-[10px] text-slate-400 font-mono">
                Integrated with Resend Transactional Dispatch
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Transactional Email Modal */}
      <EmailPreviewModal
        isOpen={!!activeNotification}
        notification={activeNotification}
        onClose={() => setActiveNotification(null)}
      />
    </>
  );
};
