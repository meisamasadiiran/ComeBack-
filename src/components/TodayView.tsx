import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, AlertCircle, Sun, Moon, Sparkles, PenLine, HeartHandshake, GitCommit, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const TodayView: React.FC = () => {
  const {
    cleanDays,
    totalRP,
    todayMorningCheckIn,
    todayEveningCheckIn,
    ifThenPlans,
    openModal,
    openHelp,
    t,
    lang,
  } = useApp();

  const NextArrow = lang === 'fa' ? ArrowLeft : ArrowRight;
  const activePlan = ifThenPlans.find((p) => p.active);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 
        MAIN HERO CARD:
        «X روزه پاکی. اما فقط برای امروز پاک می‌مونی.»
        «پاکی قبلی‌ات پاک نشده؛ امروز فقط ادامه‌اش بده.»
        «X روزه پاکی. ولی لازم نیست X روز دیگه رو امروز زندگی کنی. امروز فقط برای امروز.»
      */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5E0D6] shadow-card relative overflow-hidden">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-[#FDF1EC] text-[#E45A2A] text-xs font-bold rounded-full border border-[#F6DCD2]">
            فقط برای امروز
          </span>
          <button
            onClick={() => openHelp('home')}
            className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
          >
            ⓘ
          </button>
        </div>

        {/* Big Clean Counter */}
        <div className="space-y-1 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#171717]">
              {cleanDays}
            </span>
            <span className="text-lg font-bold text-[#E45A2A]">
              روزه پاکی.
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#171717] pt-1">
            {t.cleanOnlyToday}
          </h2>

          <p className="text-xs sm:text-sm text-[#3E6B57] font-semibold pt-1">
            {t.cleanNotErased}
          </p>
        </div>

        {/* Section 23 Mantra: «X روزه پاکی. ولی لازم نیست X روز دیگه رو امروز زندگی کنی. امروز فقط برای امروز.» */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE8DE] text-xs text-[#6B6760] leading-relaxed">
          {t.cleanNoNeedFuture.replace(/\{days\}/g, cleanDays.toString())}
        </div>
      </div>

      {/* 
        THE TWO PRIMARY ACTION BUTTONS:
        🟠 «وسوسه دارم»
        «لغزش کردم»
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Craving Button - Comeback Orange */}
        <button
          onClick={() => openModal('craving')}
          className="w-full py-4 px-5 bg-[#E45A2A] text-white rounded-3xl font-bold text-base hover:bg-[#D44B1C] active:scale-[0.98] transition shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Flame size={22} className="fill-white" />
            <span>{t.btnCraving}</span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">
            ۹۰ ثانیه
          </span>
        </button>

        {/* Slipped Button - Signature compassionate protocol */}
        <button
          onClick={() => openModal('afterSlip')}
          className="w-full py-4 px-5 bg-white hover:bg-[#FAF8F5] text-[#171717] border border-[#E5E0D6] rounded-3xl font-bold text-base active:scale-[0.98] transition shadow-subtle flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle size={22} className="text-[#6B6760]" />
            <span>{t.btnSlipped}</span>
          </div>
          <span className="text-xs text-[#E45A2A] bg-[#FDF1EC] border border-[#F6DCD2] px-2.5 py-1 rounded-full font-medium">
            پروتکل بازگشت
          </span>
        </button>
      </div>

      {/* 
        TWO QUICK EMOTIONAL & MENTAL SHORTCUTS:
        «امروز حالم خوب نیست» & «+ یادداشت سریع»
      */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => openModal('notWell')}
          className="p-3 bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] rounded-2xl text-right text-xs font-bold text-[#171717] shadow-subtle flex items-center gap-2 transition active:scale-[0.98]"
        >
          <HeartHandshake size={16} className="text-[#C98A28] flex-shrink-0" />
          <span className="truncate">{t.btnNotWell}</span>
        </button>

        <button
          onClick={() => openModal('quickNote')}
          className="p-3 bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] rounded-2xl text-right text-xs font-bold text-[#171717] shadow-subtle flex items-center gap-2 transition active:scale-[0.98]"
        >
          <PenLine size={16} className="text-[#3E6B57] flex-shrink-0" />
          <span className="truncate">{t.btnQuickNote}</span>
        </button>
      </div>

      {/* DAILY CHECK-INS CARD */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#171717]">
            برنامه امروز تو
          </h3>
          <span className="text-xs text-[#6B6760]">
            {totalRP} RP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Morning Check-in Card */}
          <button
            onClick={() => openModal('morningCheckIn')}
            className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
              todayMorningCheckIn
                ? 'bg-[#EFF6F2] border-[#C5DFD0]'
                : 'bg-[#F7F5F0] hover:bg-[#EFECE5] border-[#E5E0D6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sun size={18} className="text-[#C98A28]" />
              <div>
                <span className="text-xs font-bold text-[#171717] block">
                  {t.morningCheckinCardTitle}
                </span>
                <span className="text-[11px] text-[#6B6760]">
                  {todayMorningCheckIn ? t.morningDone : t.startMorning}
                </span>
              </div>
            </div>
            {todayMorningCheckIn && <Check size={16} className="text-[#3E6B57]" />}
          </button>

          {/* Evening Check-in Card */}
          <button
            onClick={() => openModal('eveningCheckIn')}
            className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
              todayEveningCheckIn
                ? 'bg-[#EFF6F2] border-[#C5DFD0]'
                : 'bg-[#F7F5F0] hover:bg-[#EFECE5] border-[#E5E0D6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Moon size={18} className="text-[#3568A8]" />
              <div>
                <span className="text-xs font-bold text-[#171717] block">
                  {t.eveningCheckinCardTitle}
                </span>
                <span className="text-[11px] text-[#6B6760]">
                  {todayEveningCheckIn ? t.eveningDone : t.startEvening}
                </span>
              </div>
            </div>
            {todayEveningCheckIn && <Check size={16} className="text-[#3E6B57]" />}
          </button>
        </div>
      </div>

      {/* ACTIVE IF–THEN PLAN PREVIEW */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <GitCommit size={18} />
            <h3 className="font-bold text-xs text-[#171717]">
              {t.activeIfThenTitle}
            </h3>
          </div>
          <button
            onClick={() => openModal('ifThen')}
            className="text-[11px] text-[#6B6760] hover:text-[#171717] underline"
          >
            مدیریت
          </button>
        </div>

        {activePlan ? (
          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#ECE8DE] text-xs text-[#2A2A2A] leading-relaxed space-y-1">
            <p>
              <strong className="text-[#C98A28]">اگر:</strong> {activePlan.ifTrigger}
            </p>
            <p>
              <strong className="text-[#3E6B57]">آنگاه:</strong> {activePlan.thenAction}
            </p>
          </div>
        ) : (
          <button
            onClick={() => openModal('ifThen')}
            className="w-full py-2.5 bg-[#F7F5F0] hover:bg-[#EFECE5] rounded-xl text-xs font-medium text-[#6B6760] border border-dashed border-[#D9D4CB]"
          >
            + ساخت یک برنامه آماده برای شرایط بحرانی
          </button>
        )}
      </div>
    </div>
  );
};
