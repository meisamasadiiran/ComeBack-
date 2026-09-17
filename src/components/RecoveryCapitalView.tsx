import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Check, Sliders, Shield } from 'lucide-react';

export const RecoveryCapitalView: React.FC = () => {
  const { recoveryPillars, updatePillar, t, openHelp } = useApp();
  const [editingPillarId, setEditingPillarId] = useState<string | null>(null);
  const [pillarScore, setPillarScore] = useState<number>(3);
  const [pillarNote, setPillarNote] = useState<string>('');

  const startEdit = (pillar: any) => {
    setEditingPillarId(pillar.id);
    setPillarScore(pillar.score);
    setPillarNote(pillar.note || '');
  };

  const saveEdit = (id: string) => {
    updatePillar(id, pillarScore, pillarNote.trim());
    setEditingPillarId(null);
  };

  const averageScore = (
    recoveryPillars.reduce((acc, p) => acc + p.score, 0) / recoveryPillars.length
  ).toFixed(1);

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#3E6B57]">
            <Compass size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              {t.recCapTitle}
            </h2>
          </div>
          <button
            onClick={() => openHelp('capital')}
            className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
          >
            ⓘ
          </button>
        </div>
        <p className="text-xs text-[#6B6760] leading-relaxed">
          {t.recCapSubtitle}
        </p>

        {/* Overall Health Summary */}
        <div className="mt-4 p-3 bg-[#EFF6F2] rounded-2xl border border-[#C5DFD0] flex items-center justify-between">
          <span className="text-xs font-bold text-[#3E6B57]">
            میانگین توانمندی ستون‌ها:
          </span>
          <span className="text-sm font-black text-[#171717]">
            {averageScore} از ۵
          </span>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recoveryPillars.map((pillar) => {
          const info = (t.recCapPillars as any)[pillar.titleKey] || {
            title: pillar.titleKey,
            desc: '',
          };
          const isEditing = editingPillarId === pillar.id;

          return (
            <div
              key={pillar.id}
              className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-2.5 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#171717]">
                    {info.title}
                  </h3>
                  <p className="text-[11px] text-[#6B6760]">
                    {info.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#3E6B57] bg-[#EFF6F2] px-2 py-0.5 rounded-lg border border-[#C5DFD0]">
                    {pillar.score}/۵
                  </span>
                  {!isEditing && (
                    <button
                      onClick={() => startEdit(pillar)}
                      className="p-1 text-[#6B6760] hover:text-[#171717]"
                    >
                      <Sliders size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="w-full bg-[#F0ECE5] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#3E6B57] h-full rounded-full transition-all"
                  style={{ width: `${(pillar.score / 5) * 100}%` }}
                />
              </div>

              {isEditing ? (
                <div className="space-y-2 pt-2 border-t border-[#F0ECE1]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#171717]">امتیاز:</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPillarScore(val)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                            pillarScore === val
                              ? 'bg-[#3E6B57] text-white'
                              : 'bg-[#F7F5F0] text-[#6B6760]'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={pillarNote}
                    onChange={(e) => setPillarNote(e.target.value)}
                    placeholder="یک اقدام کوچک برای بهبود این ستون..."
                    className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                  />

                  <button
                    onClick={() => saveEdit(pillar.id)}
                    className="w-full py-1.5 bg-[#171717] text-white rounded-xl text-xs font-bold"
                  >
                    {t.savePillarReviewBtn}
                  </button>
                </div>
              ) : (
                pillar.note && (
                  <p className="text-xs text-[#2A2A2A] bg-[#FAF8F5] p-2 rounded-xl border border-[#ECE8DE] italic">
                    «{pillar.note}»
                  </p>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
