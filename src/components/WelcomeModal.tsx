import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { ShieldAlert, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';

export const WelcomeModal: React.FC = () => {
  const { isOnboarded, completeOnboarding, lang, setLang, t } = useApp();
  const [step, setStep] = useState<number>(1);
  const [selectedLang, setSelectedLang] = useState<Language>(lang);
  const [daysClean, setDaysClean] = useState<number>(3);
  const [isFirstDay, setIsFirstDay] = useState<boolean>(false);

  if (isOnboarded) return null;

  const handleStart = () => {
    setStep(2);
  };

  const handleFinish = () => {
    const finalDays = isFirstDay ? 0 : Math.max(0, daysClean);
    completeOnboarding(finalDays, selectedLang);
  };

  const NextArrow = selectedLang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5E0D6] flex flex-col justify-between max-h-[92vh] overflow-y-auto">
        {step === 1 ? (
          <div className="space-y-6 text-center">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center pt-2">
              <Logo size={56} showWordmark={true} />
              <p className="text-base font-bold text-[#E45A2A] mt-3">
                {t.mainSlogan}
              </p>
            </div>

            {/* Slogans */}
            <div className="flex flex-wrap justify-center gap-2">
              {t.secondarySlogans.slice(0, 2).map((slogan, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white text-[#6B6760] px-2.5 py-1 rounded-full border border-[#E5E0D6]"
                >
                  {slogan}
                </span>
              ))}
            </div>

            {/* Official Disclaimer Box */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] text-right text-sm leading-relaxed text-[#2A2A2A] shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-[#C98A28] mb-1">
                <ShieldAlert size={18} className="flex-shrink-0" />
                <span className="font-bold text-xs text-[#171717]">
                  {selectedLang === 'fa' ? 'یادآوری مهم و انسانی' : 'Important Note'}
                </span>
              </div>
              <p className="whitespace-pre-line text-[13.5px] leading-6 text-[#2A2A2A]">
                {t.welcomePhilosophy}
              </p>
            </div>

            {/* Language Selection Toggle */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedLang('fa');
                  setLang('fa');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedLang === 'fa'
                    ? 'bg-[#171717] text-white shadow'
                    : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                }`}
              >
                فارسی
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang('en');
                  setLang('en');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedLang === 'en'
                    ? 'bg-[#171717] text-white shadow'
                    : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 bg-[#E45A2A] text-white rounded-2xl font-bold text-base hover:bg-[#D44B1C] active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2"
            >
              <span>{t.welcomeStartBtn}</span>
              <NextArrow size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-2xl border border-[#E5E0D6] flex items-center justify-center mx-auto mb-3 shadow-subtle">
                <Sparkles size={24} className="text-[#E45A2A]" />
              </div>
              <h2 className="text-xl font-bold text-[#171717]">
                {t.welcomeCleanQuestion}
              </h2>
              <p className="text-xs text-[#6B6760] mt-1">
                {selectedLang === 'fa'
                  ? 'هر عددی که هست، به آن احترام می‌گذاریم.'
                  : 'Every number counts. We honor your path.'}
              </p>
            </div>

            {/* First day quick toggle */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFirstDay}
                  onChange={(e) => setIsFirstDay(e.target.checked)}
                  className="w-5 h-5 rounded text-[#E45A2A] focus:ring-[#E45A2A] border-[#D9D4CB]"
                />
                <span className="text-sm font-semibold text-[#171717]">
                  {t.welcomeTodayFirstDay}
                </span>
              </label>
            </div>

            {/* Days input counter */}
            {!isFirstDay && (
              <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-subtle text-center space-y-3">
                <span className="text-xs text-[#6B6760]">
                  {t.welcomeDaysCleanLabel}
                </span>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setDaysClean((prev) => Math.max(0, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D6] text-lg font-bold hover:bg-[#EFECE5]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={daysClean}
                    onChange={(e) => setDaysClean(parseInt(e.target.value, 10) || 0)}
                    className="w-24 text-center text-3xl font-bold text-[#171717] bg-transparent border-b-2 border-[#E45A2A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setDaysClean((prev) => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D6] text-lg font-bold hover:bg-[#EFECE5]"
                  >
                    +
                  </button>
                </div>
                <p className="text-[11px] text-[#6B6760]">
                  {selectedLang === 'fa'
                    ? 'بعداً در تنظیمات می‌توانید تاریخ دقیق را اصلاح کنید.'
                    : 'You can adjust this anytime in settings.'}
                </p>
              </div>
            )}

            <div className="pt-2 space-y-2">
              <button
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-base hover:bg-[#2A2A2A] active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.welcomeContinue}</span>
                <Check size={18} />
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-xs text-[#6B6760] hover:text-[#171717] transition"
              >
                {selectedLang === 'fa' ? 'بازگشت به مرحله قبل' : 'Back to previous step'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
