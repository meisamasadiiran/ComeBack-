import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NinetyMeetingsView } from './NinetyMeetingsView';
import { MilestonesView } from './MilestonesView';
import { RewardsView } from './RewardsView';
import { RecoveryCapitalView } from './RecoveryCapitalView';
import {
  Users,
  Cake,
  Gift,
  Compass,
  Phone,
  Bot,
  Settings,
  Shield,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Languages,
  BookMarked,
  Info,
} from 'lucide-react';

export const MoreView: React.FC = () => {
  const { openModal, openHelp, lang, setLang, t } = useApp();
  const [subView, setSubView] = useState<'menu' | 'ninety' | 'milestones' | 'rewards' | 'capital'>('menu');

  const Chevron = lang === 'fa' ? ChevronLeft : ChevronRight;
  const BackArrow = lang === 'fa' ? ArrowRight : ArrowLeft;

  if (subView === 'ninety') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSubView('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6B6760] hover:text-[#171717] px-2 py-1 bg-white rounded-xl border border-[#E5E0D6] shadow-subtle mb-1"
        >
          <BackArrow size={14} />
          <span>بازگشت به منوی بیشتر</span>
        </button>
        <NinetyMeetingsView />
      </div>
    );
  }

  if (subView === 'milestones') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSubView('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6B6760] hover:text-[#171717] px-2 py-1 bg-white rounded-xl border border-[#E5E0D6] shadow-subtle mb-1"
        >
          <BackArrow size={14} />
          <span>بازگشت به منوی بیشتر</span>
        </button>
        <MilestonesView />
      </div>
    );
  }

  if (subView === 'rewards') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSubView('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6B6760] hover:text-[#171717] px-2 py-1 bg-white rounded-xl border border-[#E5E0D6] shadow-subtle mb-1"
        >
          <BackArrow size={14} />
          <span>بازگشت به منوی بیشتر</span>
        </button>
        <RewardsView />
      </div>
    );
  }

  if (subView === 'capital') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSubView('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6B6760] hover:text-[#171717] px-2 py-1 bg-white rounded-xl border border-[#E5E0D6] shadow-subtle mb-1"
        >
          <BackArrow size={14} />
          <span>بازگشت به منوی بیشتر</span>
        </button>
        <RecoveryCapitalView />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <h2 className="text-xl font-bold text-[#171717] mb-1">
          {t.navMore}
        </h2>
        <p className="text-xs text-[#6B6760]">
          بخش‌های تکمیلی، تنظیمات و ابزارهای همراهی در بهبودی
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E5E0D6] shadow-subtle divide-y divide-[#F0ECE1] overflow-hidden">
        {/* 1. 90 in 90 */}
        <button
          onClick={() => setSubView('ninety')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF4FA] text-[#3568A8] flex items-center justify-center flex-shrink-0">
              <Users size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.ninetyTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                مسیر عمودی ثبت ۹۰ جلسه NA بدون ترس از صفر شدن
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 2. Milestones */}
        <button
          onClick={() => setSubView('milestones')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF1EC] text-[#E45A2A] flex items-center justify-center flex-shrink-0">
              <Cake size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.milestonesTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                جشن‌های انسانی روزهای پاکی و دل‌نوشته به خود
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 3. Recovery Capital */}
        <button
          onClick={() => setSubView('capital')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6F2] text-[#3E6B57] flex items-center justify-center flex-shrink-0">
              <Compass size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.recCapTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                بررسی ۸ ستون زندگی برای پایداری در پاکی
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 4. Rewards (RETURN RUN) */}
        <button
          onClick={() => setSubView('rewards')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5EB] text-[#C98A28] flex items-center justify-center flex-shrink-0">
              <Gift size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.rewardsTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                پاداش‌های سالم و واقعی با امتیاز Return Points
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 5. Emergency Contacts */}
        <button
          onClick={() => openModal('emergencyContacts')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6F2] text-[#3E6B57] flex items-center justify-center flex-shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.contactsTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                راهنما، همسر، خانواده و متن‌های آماده
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 6. Comeback AI */}
        <button
          onClick={() => openModal('comebackAi')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF1EC] text-[#E45A2A] flex items-center justify-center flex-shrink-0">
              <Bot size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.aiTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                همراه تحلیلی محدود و بدون قضاوت
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>

        {/* 7. Settings & Privacy */}
        <button
          onClick={() => openModal('settings')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F5F0] text-[#171717] flex items-center justify-center flex-shrink-0">
              <Settings size={20} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                {t.settingsTitle}
              </span>
              <span className="text-xs text-[#6B6760]">
                پشتیبان‌گیری محلی و حریم خصوصی Local-first
              </span>
            </div>
          </div>
          <Chevron size={18} className="text-[#A8A29E]" />
        </button>
      </div>

      {/* Brand Manifesto Card */}
      <div className="bg-[#171717] text-white p-6 rounded-3xl space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#E45A2A] tracking-wider">
          COMEBACK MANIFESTO
        </span>
        <p className="text-xs text-[#D9D4CB] leading-relaxed">
          {t.brandManifesto}
        </p>
      </div>
    </div>
  );
};
