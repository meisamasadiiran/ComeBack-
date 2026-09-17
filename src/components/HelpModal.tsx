import React from 'react';
import { useApp } from '../context/AppContext';
import { X, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const HelpModal: React.FC = () => {
  const { activeHelpSection, closeHelp, t, lang } = useApp();

  if (!activeHelpSection) return null;

  const content = (t.helpContents as any)[activeHelpSection] || {
    what: t.helpContents.home.what,
    how: t.helpContents.home.how,
    next: t.helpContents.home.next,
  };

  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/40 backdrop-blur-sm animate-fade-in"
      onClick={closeHelp}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5 border border-[#E5E0D6] transform transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <HelpCircle size={20} />
            <h3 className="font-bold text-base text-[#171717]">
              {t.helpTooltip}
            </h3>
          </div>
          <button
            onClick={closeHelp}
            className="p-1 rounded-full text-[#6B6760] hover:text-[#171717] hover:bg-[#F7F5F0] transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-[#2A2A2A]">
          <div>
            <span className="inline-block text-xs font-bold text-[#E45A2A] mb-1">
              {t.helpModalWhatIsThis}
            </span>
            <p className="text-[#383838] bg-[#F7F5F0] p-2.5 rounded-lg border border-[#ECE8DE]">
              {content.what}
            </p>
          </div>

          <div>
            <span className="inline-block text-xs font-bold text-[#3E6B57] mb-1">
              {t.helpModalHowToUse}
            </span>
            <p className="text-[#383838] bg-[#F7F5F0] p-2.5 rounded-lg border border-[#ECE8DE]">
              {content.how}
            </p>
          </div>

          <div>
            <span className="inline-block text-xs font-bold text-[#171717] mb-1 flex items-center gap-1">
              <ArrowIcon size={14} className="text-[#E45A2A]" />
              {t.helpModalNextStep}
            </span>
            <p className="font-medium text-[#171717] bg-[#FDF2EE] p-2.5 rounded-lg border border-[#F6DCD2]">
              {content.next}
            </p>
          </div>
        </div>

        <button
          onClick={closeHelp}
          className="w-full mt-5 py-2.5 bg-[#171717] text-white rounded-xl text-sm font-medium hover:bg-[#2A2A2A] active:scale-[0.99] transition"
        >
          {t.helpGotIt}
        </button>
      </div>
    </div>
  );
};
