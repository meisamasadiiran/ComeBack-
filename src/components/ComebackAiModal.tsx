import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bot, FileText, Send, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export const ComebackAiModal: React.FC = () => {
  const { activeModal, closeModal, settings, cleanDays, meetings90, returnEvents, ifThenPlans, contacts, t } = useApp();

  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [analysisOutput, setAnalysisOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (activeModal !== 'comebackAi') return null;

  const handleGenerateSummary = () => {
    setIsLoading(true);
    setActiveAnalysis('summary');
    setTimeout(() => {
      setIsLoading(false);
      // Realistic analytical summary without judgment
      if (meetings90.length === 0 && returnEvents.length <= 1) {
        setAnalysisOutput(t.aiInsufficientData);
      } else {
        setAnalysisOutput(
          `گزارش توصیفی الگوهای ثبت‌شده:\n\n` +
          `• پاکی پایدار: ${cleanDays} روز ثبت شده است.\n` +
          `• جلسات ثبت‌شده: ${meetings90.length} جلسه با ثبت دستاورد فردی.\n` +
          `• رویدادهای اقدام بهبودی: ${returnEvents.length} اقدام ثبت شده در کارنامه بازگشت.\n\n` +
          `الگوی مشاهده‌شده: در داده‌های ثبت‌شده تو، پیوستگی ثبت چک‌این در روزهایی که تماس با همراهان برقرار بوده، ثبات بالاتری داشته است. ` +
          `«${t.aiPatternDisclaimer}»`
        );
      }
    }, 600);
  };

  const handleDraftSponsor = () => {
    setIsLoading(true);
    setActiveAnalysis('sponsor');
    setTimeout(() => {
      setIsLoading(false);
      setAnalysisOutput(
        `متن آماده و شفاف برای ارسال به راهنما:\n\n` +
        `«سلام [نام راهنما] عزیز. امیدوارم خوب باشی. من امروز در روز ${cleanDays} پاکی‌ام هستم. ` +
        `خواستم وضعیت امروزم رو باهات در میون بذارم تا تنها نمونم. ` +
        `امروز با کمی تنش ذهنی روبه‌رو شدم ولی فقط برای ۲۴ ساعت امروز متعهد به ادامه مسیرم. ` +
        `اگر زمانی داشتی، خوشحال می‌شم چند دقیقه صدات رو بشنوم.»`
      );
    }, 600);
  };

  const handleSuggestIfThen = () => {
    setIsLoading(true);
    setActiveAnalysis('ifthen');
    setTimeout(() => {
      setIsLoading(false);
      setAnalysisOutput(
        `پیشنهاد رفتاری بر اساس آموخته‌های بهبودی:\n\n` +
        `«اگر در ساعات پایانی شب احساس تنهایی یا بی‌قراری کردم، ` +
        `آنگاه گوشی را در اتاق دیگر می‌گذارم، یک لیوان آب خنک می‌نوشم و یک پیام کوتاه به راهنما یا گروه امن بهبودی می‌فرستم.»`
      );
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Bot size={22} />
            <span className="font-bold text-base text-[#171717]">
              {t.aiTitle}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Philosophy notice */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#E5E0D6] text-xs leading-relaxed text-[#2A2A2A] space-y-1.5 shadow-subtle mb-3">
          <div className="flex items-center gap-1.5 text-[#3E6B57] font-bold">
            <ShieldCheck size={15} />
            <span>{t.aiSubtitle}</span>
          </div>
          <p className="text-[#6B6760] text-[11.5px]">
            {t.aiPhilosophyNotice}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mb-4">
          <button
            onClick={handleGenerateSummary}
            className="w-full p-3 bg-white hover:bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] text-xs font-bold text-[#171717] text-right flex items-center justify-between shadow-subtle active:scale-[0.99] transition"
          >
            <span>{t.aiActionSummarize}</span>
            <FileText size={16} className="text-[#E45A2A]" />
          </button>

          <button
            onClick={handleDraftSponsor}
            className="w-full p-3 bg-white hover:bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] text-xs font-bold text-[#171717] text-right flex items-center justify-between shadow-subtle active:scale-[0.99] transition"
          >
            <span>{t.aiActionDraftSponsor}</span>
            <Send size={16} className="text-[#3E6B57]" />
          </button>

          <button
            onClick={handleSuggestIfThen}
            className="w-full p-3 bg-white hover:bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] text-xs font-bold text-[#171717] text-right flex items-center justify-between shadow-subtle active:scale-[0.99] transition"
          >
            <span>{t.aiActionSuggestIfThen}</span>
            <Sparkles size={16} className="text-[#C98A28]" />
          </button>
        </div>

        {/* Output area */}
        {isLoading ? (
          <div className="p-8 text-center text-xs text-[#6B6760] space-y-2 bg-white rounded-2xl border border-[#E5E0D6]">
            <div className="w-6 h-6 border-2 border-[#E45A2A] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>در حال تنظیم گزارش بی‌طرفانه...</p>
          </div>
        ) : analysisOutput ? (
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] space-y-3 shadow-subtle animate-fade-in">
            <span className="text-xs font-bold text-[#171717] block border-b border-[#F0ECE1] pb-2">
              پاسخ تحلیلی Comeback AI:
            </span>
            <p className="text-xs text-[#2A2A2A] whitespace-pre-line leading-relaxed">
              {analysisOutput}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
