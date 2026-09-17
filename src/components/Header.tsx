import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { HelpCircle, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, openHelp, t, totalRP } = useApp();

  const toggleLanguage = () => {
    setLang(lang === 'fa' ? 'en' : 'fa');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E5E0D6] px-4 py-3 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <Logo size={28} showWordmark={true} />
        </div>

        {/* Right side controls: RP badge, Help ⓘ, and Language switch */}
        <div className="flex items-center gap-2">
          {/* Quick RP indicator */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white rounded-full border border-[#E5E0D6] text-xs font-semibold text-[#171717]">
            <Sparkles size={13} className="text-[#E45A2A]" />
            <span>{totalRP} RP</span>
          </div>

          {/* Help "ⓘ" Button */}
          <button
            onClick={() => openHelp('home')}
            className="p-1.5 text-[#6B6760] hover:text-[#171717] hover:bg-white rounded-full border border-transparent hover:border-[#E5E0D6] transition"
            title={t.helpTooltip}
            aria-label={t.helpTooltip}
          >
            <HelpCircle size={19} />
          </button>

          {/* Language Switch: فارسی | English */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-[#EFECE5] text-[#171717] rounded-full border border-[#E5E0D6] transition active:scale-95 shadow-subtle"
          >
            {lang === 'fa' ? (
              <span>
                <strong className="text-[#E45A2A]">فارسی</strong> | En
              </span>
            ) : (
              <span>
                FA | <strong className="text-[#E45A2A]">English</strong>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
