import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sun, Check, Target } from 'lucide-react';
import { MoodType, SleepType } from '../types';

export const MorningCheckInModal: React.FC = () => {
  const { activeModal, closeModal, saveMorningCheckIn, t } = useApp();

  const [mood, setMood] = useState<MoodType>('good');
  const [sleep, setSleep] = useState<SleepType>('good');
  const [hardFactor, setHardFactor] = useState('');
  const [priority1, setPriority1] = useState('');
  const [priority2, setPriority2] = useState('');
  const [priority3, setPriority3] = useState('');

  if (activeModal !== 'morningCheckIn') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priorities = [priority1, priority2, priority3].filter((p) => p.trim() !== '');
    saveMorningCheckIn({
      mood,
      sleep,
      hardFactor: hardFactor.trim(),
      priorities,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#C98A28]">
            <Sun size={22} />
            <span className="font-bold text-base text-[#171717]">
              {t.morningTitle}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <p className="text-xs text-[#6B6760]">
            {t.morningSubtitle}
          </p>

          {/* Question 1: Mood */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.moodQuestion}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMood('good')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  mood === 'good'
                    ? 'bg-[#EFF6F2] text-[#3E6B57] border-2 border-[#3E6B57]'
                    : 'bg-[#F7F5F0] text-[#6B6760] border border-transparent'
                }`}
              >
                {t.moodGood}
              </button>
              <button
                type="button"
                onClick={() => setMood('normal')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  mood === 'normal'
                    ? 'bg-[#FAF5EB] text-[#C98A28] border-2 border-[#C98A28]'
                    : 'bg-[#F7F5F0] text-[#6B6760] border border-transparent'
                }`}
              >
                {t.moodNormal}
              </button>
              <button
                type="button"
                onClick={() => setMood('hard')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  mood === 'hard'
                    ? 'bg-[#FDF2EE] text-[#E45A2A] border-2 border-[#E45A2A]'
                    : 'bg-[#F7F5F0] text-[#6B6760] border border-transparent'
                }`}
              >
                {t.moodHard}
              </button>
            </div>
          </div>

          {/* Question 2: Sleep */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.sleepQuestion}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSleep('good')}
                className={`py-2 rounded-xl text-xs font-medium transition ${
                  sleep === 'good'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.sleepGood}
              </button>
              <button
                type="button"
                onClick={() => setSleep('normal')}
                className={`py-2 rounded-xl text-xs font-medium transition ${
                  sleep === 'normal'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.sleepNormal}
              </button>
              <button
                type="button"
                onClick={() => setSleep('poor')}
                className={`py-2 rounded-xl text-xs font-medium transition ${
                  sleep === 'poor'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.sleepPoor}
              </button>
            </div>
          </div>

          {/* Question 3: What might be hard? */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.hardFactorQuestion}
            </span>
            <input
              type="text"
              value={hardFactor}
              onChange={(e) => setHardFactor(e.target.value)}
              placeholder={t.hardFactorPlaceholder}
              className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none focus:border-[#C98A28]"
            />
          </div>

          {/* Priorities: Exactly up to 3 */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2.5">
            <div className="flex items-center gap-1.5 text-[#171717]">
              <Target size={16} className="text-[#E45A2A]" />
              <span className="text-xs font-bold">
                {t.prioritiesTitle}
              </span>
            </div>
            <input
              type="text"
              value={priority1}
              onChange={(e) => setPriority1(e.target.value)}
              placeholder={t.priority1}
              className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none"
            />
            <input
              type="text"
              value={priority2}
              onChange={(e) => setPriority2(e.target.value)}
              placeholder={t.priority2}
              className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none"
            />
            <input
              type="text"
              value={priority3}
              onChange={(e) => setPriority3(e.target.value)}
              placeholder={t.priority3}
              className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md flex items-center justify-center gap-2"
          >
            <span>{t.submitMorning}</span>
            <Check size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
