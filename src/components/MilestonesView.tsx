import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cake, Sparkles, CheckCircle2, Lock, MessageSquareHeart, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MilestonesView: React.FC = () => {
  const { cleanDays, milestoneNotes, saveMilestoneNote, t, openHelp } = useApp();

  const [activeWritingKey, setActiveWritingKey] = useState<string | null>(null);
  const [letterText, setLetterText] = useState<string>('');

  const triggerCelebrate = (title: string) => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E45A2A', '#3E6B57', '#C98A28'],
      });
    } catch {}
  };

  const handleOpenLetter = (key: string) => {
    setActiveWritingKey(key);
    const existing = milestoneNotes.find((m) => m.milestoneKey === key);
    setLetterText(existing ? existing.noteToDay1Self : '');
  };

  const handleSaveLetter = (key: string) => {
    if (!letterText.trim()) return;
    saveMilestoneNote(key, letterText.trim());
    setActiveWritingKey(null);
  };

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Cake size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              {t.milestonesTitle}
            </h2>
          </div>
          <button
            onClick={() => openHelp('journey')}
            className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
          >
            ⓘ
          </button>
        </div>
        <p className="text-xs text-[#6B6760] leading-relaxed">
          {t.milestonesSubtitle}
        </p>
      </div>

      <div className="space-y-3">
        {t.milestoneCards.map((milestone) => {
          const isReached = cleanDays >= milestone.days;
          const noteObj = milestoneNotes.find((m) => m.milestoneKey === milestone.id);
          const isWriting = activeWritingKey === milestone.id;

          return (
            <div
              key={milestone.id}
              className={`p-5 rounded-3xl border transition-all ${
                isReached
                  ? 'bg-white border-[#E5E0D6] shadow-subtle'
                  : 'bg-[#F0ECE5]/50 border-dashed border-[#D9D4CB] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      isReached
                        ? 'bg-[#FDF1EC] text-[#E45A2A] border border-[#F6DCD2]'
                        : 'bg-[#E5E0D6] text-[#6B6760]'
                    }`}
                  >
                    {isReached ? <Sparkles size={18} /> : <Lock size={16} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#171717]">
                      {milestone.title}
                    </h3>
                    <span className="text-[11px] text-[#6B6760]">
                      {milestone.days} روز پاکی
                    </span>
                  </div>
                </div>

                {isReached && (
                  <button
                    onClick={() => triggerCelebrate(milestone.title)}
                    className="text-xs text-[#E45A2A] hover:bg-[#FDF1EC] px-2.5 py-1 rounded-xl transition"
                  >
                    جشن 🎉
                  </button>
                )}
              </div>

              <p className="text-xs text-[#2A2A2A] leading-relaxed mt-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#ECE8DE]">
                {milestone.desc}
              </p>

              {/* Letter to day 1 self */}
              {isReached && (
                <div className="mt-3 pt-3 border-t border-[#F0ECE1]">
                  {!isWriting ? (
                    <div>
                      {noteObj ? (
                        <div className="bg-[#EFF6F2] p-3 rounded-2xl border border-[#C5DFD0] space-y-1">
                          <span className="text-[11px] font-bold text-[#3E6B57] flex items-center gap-1">
                            <MessageSquareHeart size={14} />
                            نامه من به خود روز اولم:
                          </span>
                          <p className="text-xs text-[#171717] italic">
                            «{noteObj.noteToDay1Self}»
                          </p>
                          <button
                            onClick={() => handleOpenLetter(milestone.id)}
                            className="text-[10px] text-[#3E6B57] underline pt-1 block"
                          >
                            ویرایش متن
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenLetter(milestone.id)}
                          className="w-full py-2 bg-[#F7F5F0] hover:bg-[#EFECE5] rounded-xl text-xs font-semibold text-[#171717] border border-[#E5E0D6] flex items-center justify-center gap-1.5 transition"
                        >
                          <MessageSquareHeart size={14} className="text-[#E45A2A]" />
                          <span>{t.milestoneLetterPrompt}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#171717] block">
                        {t.milestoneLetterPrompt}
                      </span>
                      <textarea
                        rows={3}
                        value={letterText}
                        onChange={(e) => setLetterText(e.target.value)}
                        placeholder={t.milestoneLetterPlaceholder}
                        className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveLetter(milestone.id)}
                          className="flex-1 py-2 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#2A2A2A] flex items-center justify-center gap-1"
                        >
                          <Check size={14} />
                          <span>{t.milestoneSaveNoteBtn}</span>
                        </button>
                        <button
                          onClick={() => setActiveWritingKey(null)}
                          className="px-3 py-2 bg-white text-[#6B6760] rounded-xl text-xs border border-[#E5E0D6]"
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
