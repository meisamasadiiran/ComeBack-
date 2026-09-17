import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, RotateCcw, Route, BookOpen, MoreHorizontal } from 'lucide-react';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'today', label: t.navToday, icon: Calendar },
    { id: 'return', label: t.navReturn, icon: RotateCcw },
    { id: 'journey', label: t.navJourney, icon: Route },
    { id: 'journal', label: t.navJournal, icon: BookOpen },
    { id: 'more', label: t.navMore, icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-t border-[#E5E0D6] safe-bottom transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-2xl transition relative active:scale-95 ${
                isActive
                  ? 'text-[#E45A2A]'
                  : 'text-[#6B6760] hover:text-[#171717]'
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                {item.id === 'return' && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E45A2A]" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 transition-all ${
                  isActive ? 'font-black' : 'font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-[#E45A2A]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
