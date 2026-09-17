import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, PenLine, Check } from 'lucide-react';
import { QuickNoteCategory } from '../types';

export const QuickNoteModal: React.FC = () => {
  const { activeModal, closeModal, addQuickNote, t } = useApp();
  const [text, setText] = useState('');
  const [category, setCategory] = useState<QuickNoteCategory>('today');

  if (activeModal !== 'quickNote') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addQuickNote(text.trim(), category);
    setText('');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <PenLine size={20} />
            <span className="font-bold text-base text-[#171717]">
              {t.quickNoteTitle}
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
          {/* Note Input */}
          <textarea
            autoFocus
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.quickNotePlaceholder}
            className="w-full p-4 bg-white rounded-2xl border border-[#E5E0D6] text-sm text-[#171717] focus:outline-none focus:border-[#E45A2A] resize-none shadow-subtle leading-relaxed"
          />

          {/* Tag Selector: Today / Later / Idea */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#6B6760] font-medium">دسته‌بندی:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setCategory('today')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  category === 'today'
                    ? 'bg-[#E45A2A] text-white'
                    : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                }`}
              >
                {t.quickNoteTagToday}
              </button>
              <button
                type="button"
                onClick={() => setCategory('later')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  category === 'later'
                    ? 'bg-[#3E6B57] text-white'
                    : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                }`}
              >
                {t.quickNoteTagLater}
              </button>
              <button
                type="button"
                onClick={() => setCategory('idea')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  category === 'idea'
                    ? 'bg-[#C98A28] text-white'
                    : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                }`}
              >
                {t.quickNoteTagIdea}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!text.trim()}
            className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <span>{t.saveNoteBtn}</span>
            <Check size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
