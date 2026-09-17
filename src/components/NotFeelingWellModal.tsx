import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HeartHandshake, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const NotFeelingWellModal: React.FC = () => {
  const { activeModal, closeModal, openModal, t, lang } = useApp();
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(null);

  if (activeModal !== 'notWell') return null;

  const currentEmotion = t.emotions.find((e) => e.id === selectedEmotionId);

  const handleAction = () => {
    if (selectedEmotionId === 'craving') {
      closeModal();
      openModal('craving');
    } else {
      closeModal();
      setSelectedEmotionId(null);
    }
  };

  const NextArrow = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#C98A28]">
            <HeartHandshake size={22} />
            <span className="font-bold text-base text-[#171717]">
              {t.notWellTitle}
            </span>
          </div>
          <button
            onClick={() => {
              closeModal();
              setSelectedEmotionId(null);
            }}
            className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
          >
            <X size={18} />
          </button>
        </div>

        {!selectedEmotionId ? (
          <div className="space-y-4 py-2">
            <p className="text-xs text-[#6B6760] leading-relaxed">
              {t.notWellIntro}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {t.emotions.map((em) => (
                <button
                  key={em.id}
                  onClick={() => setSelectedEmotionId(em.id)}
                  className="p-3 bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] rounded-2xl text-right text-xs font-bold text-[#171717] shadow-subtle hover:border-[#C98A28] transition active:scale-[0.98]"
                >
                  {em.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 py-4 text-center">
            <span className="inline-block px-3 py-1 bg-white text-[#C98A28] border border-[#E5E0D6] rounded-full text-xs font-semibold">
              {currentEmotion?.label}
            </span>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
              <span className="text-xs font-bold text-[#E45A2A] block uppercase">
                {t.oneGentleStepTitle}
              </span>
              <p className="text-base font-bold text-[#171717] leading-relaxed">
                {currentEmotion?.action}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleAction}
                className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.takeActionBtn}</span>
                <NextArrow size={16} />
              </button>

              <button
                onClick={() => setSelectedEmotionId(null)}
                className="w-full py-2 text-xs text-[#6B6760] hover:text-[#171717]"
              >
                انتخاب حالتی دیگر
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
