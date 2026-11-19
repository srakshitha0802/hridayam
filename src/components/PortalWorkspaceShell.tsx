import React, { useState } from 'react';
import { Menu, X, LogOut, ChevronRight, ArrowLeftRight } from 'lucide-react';
import { AppView } from '../types';

export interface PortalNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  group: string;
}

export interface PortalKpi {
  label: string;
  value: string | number;
  hint?: string;
  pastelClass?: 'pastel-sky-card' | 'pastel-lavender-card' | 'pastel-mint-card' | 'pastel-rose-card' | 'pastel-peach-card';
}

interface PortalWorkspaceShellProps {
  portalName: string;
  portalSubtitle: string;
  userName: string;
  userEmail: string;
  userBadgeCode: string;
  userCampus: string;
  roleAccent?: 'sky' | 'lavender' | 'mint' | 'rose';
  navItems: PortalNavItem[];
  activeId: string;
  onSelectNav: (id: string) => void;
  kpis: PortalKpi[];
  headerActions?: React.ReactNode;
  onLogout?: () => void;
  logoutLabel?: string;
  quickPortalLinks?: { label: string; view: AppView; active?: boolean }[];
  onQuickSwitchPortal?: (view: AppView) => void;
  children: React.ReactNode;
}

const ACCENT_GRADIENTS = {
  sky: 'from-[#DBEAFE] via-[#E0E7FF] to-[#CCFBF1]',
  lavender: 'from-[#EDE9FE] via-[#FCE7F3] to-[#DBEAFE]',
  mint: 'from-[#D1FAE5] via-[#E0F2FE] to-[#EDE9FE]',
  rose: 'from-[#FCE7F3] via-[#EDE9FE] to-[#FEF3C7]',
};

export const PortalWorkspaceShell: React.FC<PortalWorkspaceShellProps> = ({
  portalName,
  portalSubtitle,
  userName,
  userEmail,
  userBadgeCode,
  userCampus,
  roleAccent = 'sky',
  navItems,
  activeId,
  onSelectNav,
  kpis,
  headerActions,
  onLogout,
  logoutLabel = 'Sign Out',
  quickPortalLinks,
  onQuickSwitchPortal,
  children,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeItem = navItems.find((item) => item.id === activeId) || navItems[0];

  // Group nav items preserving insertion order
  const groups = navItems.reduce<{ name: string; items: PortalNavItem[] }[]>((acc, item) => {
    const existing = acc.find((g) => g.name === item.group);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ name: item.group, items: [item] });
    }
    return acc;
  }, []);

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brushed Metallic Pastel Identity Header */}
      <div className="p-4 border-b border-white/15">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${ACCENT_GRADIENTS[roleAccent]} text-[#0B1B3D] font-extrabold text-sm flex items-center justify-center shrink-0 border border-white/90 shadow-md`}
          >
            {initials || 'HR'}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-white truncate">{userName}</div>
            <div className="text-[11px] text-[#CBD9FA] font-mono-tabular truncate">{userEmail}</div>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-white/12 flex items-center justify-between gap-2 text-[11px] text-[#C7D7FA]">
          <span className="truncate">{userCampus}</span>
          <span className="font-mono-tabular font-semibold text-white/90 shrink-0">
            {userBadgeCode}
          </span>
        </div>
      </div>

      {/* Grouped Navigation List */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-none"
        aria-label={`${portalName} sidebar navigation`}
      >
        {groups.map((group) => (
          <div key={group.name} className="space-y-1">
            <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-[#B8CCF8]/85">
              {group.name}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectNav(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    isActive ? 'portal-nav-active' : 'portal-nav-idle'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#2B4EA2]' : 'text-[#BDD2FC]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge !== '' && (
                    <span
                      className={`text-[11px] font-mono-tabular font-extrabold shrink-0 ${
                        isActive ? 'text-[#2B4EA2]' : 'text-[#D6E4FF]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Optional Quick Portal Switcher (e.g. Admin Cross-Portal Access) */}
      {quickPortalLinks && quickPortalLinks.length > 0 && onQuickSwitchPortal && (
        <div className="px-3 py-3 border-t border-white/15 space-y-1.5">
          <div className="px-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#B8CCF8]/85">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Switch Workspace</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {quickPortalLinks.map((link) => (
              <button
                key={link.view}
                type="button"
                onClick={() => {
                  onQuickSwitchPortal(link.view);
                  setMobileNavOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left truncate transition-colors cursor-pointer ${
                  link.active
                    ? 'bg-white text-[#0B1B3D]'
                    : 'bg-white/10 text-[#E8F1FD] hover:bg-white/20'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sign Out */}
      {onLogout && (
        <div className="p-3 border-t border-white/15">
          <button
            type="button"
            onClick={onLogout}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{logoutLabel}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
      {/* Mobile Sidebar Bar */}
      <div className="lg:hidden mb-4 portal-sidebar-glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-white">
        <div className="min-w-0">
          <div className="text-[11px] text-[#C7D7FA] font-semibold truncate">{portalName}</div>
          <div className="text-sm font-extrabold truncate">{activeItem?.label}</div>
        </div>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-white/95 text-[#0B1B3D] text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#071433]/75 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full portal-sidebar-glass flex flex-col z-10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 text-white">
              <span className="text-xs font-extrabold">{portalName}</span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">{renderSidebarContent()}</div>
          </aside>
        </div>
      )}

      {/* Desktop Left-Sidebar + Right Content Split */}
      <div className="flex items-start gap-6">
        {/* Persistent Left Sidebar Navigation */}
        <aside className="hidden lg:block w-[272px] shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] portal-sidebar-glass rounded-3xl overflow-hidden">
          {renderSidebarContent()}
        </aside>

        {/* Main Workspace Canvas */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Executive Smoked Metallic Header + Pastel KPI Strip */}
          <section className="frame-waves-dark rounded-3xl p-6 sm:p-7 text-white space-y-6">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C7D8FC]">
                  <span>{portalName}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
                  <span className="text-white font-bold truncate">{activeItem?.label}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeItem?.label}
                </h1>
                <p className="text-xs sm:text-sm text-[#DCE8FF]/90 max-w-2xl">
                  {portalSubtitle}
                </p>
              </div>

              {headerActions && (
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">{headerActions}</div>
              )}
            </div>

            {/* 4-Column Luminous Pastel-Metallic KPI Row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5 pt-4 border-t border-white/18">
              {kpis.map((kpi, idx) => {
                const defaultPastels: PortalKpi['pastelClass'][] = [
                  'pastel-sky-card',
                  'pastel-lavender-card',
                  'pastel-mint-card',
                  'pastel-rose-card',
                ];
                const tone = kpi.pastelClass || defaultPastels[idx % defaultPastels.length];
                return (
                  <div
                    key={kpi.label}
                    className={`${tone} rounded-2xl px-4 py-3.5 text-[#0B1B3D] transition-transform hover:-translate-y-0.5`}
                  >
                    <div className="text-[11px] font-bold text-[#334873] truncate">{kpi.label}</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] font-mono-tabular mt-0.5 truncate">
                      {kpi.value}
                    </div>
                    {kpi.hint && (
                      <div className="text-[11px] font-medium text-[#475D88] truncate mt-0.5">
                        {kpi.hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Active Workspace Module Content */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
