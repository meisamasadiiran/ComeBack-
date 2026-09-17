import React from 'react';
import { useApp } from '../context/AppContext';
import { RotateCcw, Flame, AlertCircle, Phone, GitCommit, Wind, Heart, ArrowLeft, ArrowRight } from 'lucide-react';

export const ReturnHubView: React.FC = () => {
  const { openModal, openHelp, t, lang } = useApp();

  const NextArrow = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <RotateCcw size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              مرکز بازگشت (Return Hub)
            </h2>
          </div>
          <button
            onClick={() => openHelp('afterSlip')}
            className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
          >
            ⓘ
          </button>
        </div>
        <p className="text-xs text-[#6B6760] leading-relaxed">
          «برگشتن هم یک مهارته. هر زمان تعادلت به هم خورد، از اینجا فوراً به مسیر برگرد.»
        </p>
      </div>

      {/* Main Action 1: Craving */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#FDF1EC] text-[#E45A2A] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#F6DCD2]">
              <Flame size={22} className="fill-[#E45A2A]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#171717]">
                {t.btnCraving}
              </h3>
              <p className="text-xs text-[#6B6760] mt-0.5">
                موج‌سواری ۹۰ ثانیه‌ای برای عبور از هجوم افکار
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal('craving')}
          className="w-full py-3 bg-[#E45A2A] text-white rounded-2xl font-bold text-xs hover:bg-[#D44B1C] transition flex items-center justify-center gap-1.5 shadow"
        >
          <span>ورود به تمرین ۹۰ ثانیه‌ای (+۲ RP)</span>
          <NextArrow size={14} />
        </button>
      </div>

      {/* Main Action 2: After-Slip Protocol */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#FDF2F1] text-[#B83A32] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#F6DCD2]">
              <AlertCircle size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#171717]">
                {t.btnSlipped}
              </h3>
              <p className="text-xs text-[#6B6760] mt-0.5">
                پروتکل ۴ مرحله‌ای بازگشت امن بدون سرزنش
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal('afterSlip')}
          className="w-full py-3 bg-[#171717] text-white rounded-2xl font-bold text-xs hover:bg-[#2A2A2A] transition flex items-center justify-center gap-1.5 shadow"
        >
          <span>اجرای پروتکل بازگشت (+۳ RP)</span>
          <NextArrow size={14} />
        </button>
      </div>

      {/* Main Action 3: Emergency Contacts */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#EFF6F2] text-[#3E6B57] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#C5DFD0]">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#171717]">
                {t.contactsTitle}
              </h3>
              <p className="text-xs text-[#6B6760] mt-0.5">
                راهنما، همسر، خانواده و متن‌های آماده پیامک
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal('emergencyContacts')}
          className="w-full py-3 bg-[#3E6B57] text-white rounded-2xl font-bold text-xs hover:bg-[#345949] transition flex items-center justify-center gap-1.5 shadow"
        >
          <span>باز کردن افراد امن و پیامک آماده</span>
          <NextArrow size={14} />
        </button>
      </div>

      {/* Main Action 4: If-Then Plans */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#FAF5EB] text-[#C98A28] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#F2E5D0]">
              <GitCommit size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#171717]">
                {t.ifThenTitle}
              </h3>
              <p className="text-xs text-[#6B6760] mt-0.5">
                حداکثر ۲ برنامه پیش‌دستانه برای لحظات بحرانی
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal('ifThen')}
          className="w-full py-3 bg-[#FAF8F5] border border-[#E5E0D6] text-[#171717] rounded-2xl font-bold text-xs hover:bg-[#F0ECE5] transition flex items-center justify-center gap-1.5"
        >
          <span>مشاهده و ویرایش برنامه‌ها</span>
          <NextArrow size={14} />
        </button>
      </div>
    </div>
  );
};
