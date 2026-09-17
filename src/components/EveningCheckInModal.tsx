import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Moon, Check, Sparkles } from 'lucide-react';

export const EveningCheckInModal: React.FC = () => {
  const { activeModal, closeModal, saveEveningCheckIn, t } = useApp();

  const [wentMeeting, setWentMeeting] = useState<'yes' | 'no' | 'no_meeting'>('no_meeting');
  const [calledSponsor, setCalledSponsor] = useState<boolean>(false);
  const [wroteStep, setWroteStep] = useState<boolean>(false);
  const [didService, setDidService] = useState<boolean>(false);
  const [helperNote, setHelperNote] = useState('');
  const [tomorrowOneStep, setTomorrowOneStep] = useState('');

  if (activeModal !== 'eveningCheckIn') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEveningCheckIn({
      wentMeeting,
      calledSponsor,
      wroteStep,
      didService,
      helperNote: helperNote.trim(),
      tomorrowOneStep: tomorrowOneStep.trim(),
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#3568A8]">
            <Moon size={22} />
            <span className="font-bold text-base text-[#171717]">
              {t.eveningTitle}
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
            {t.eveningSubtitle}
          </p>

          {/* Q1: Meeting */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.qMeeting}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setWentMeeting('yes')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  wentMeeting === 'yes'
                    ? 'bg-[#3568A8] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.qMeetingYes}
              </button>
              <button
                type="button"
                onClick={() => setWentMeeting('no')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  wentMeeting === 'no'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.qMeetingNo}
              </button>
              <button
                type="button"
                onClick={() => setWentMeeting('no_meeting')}
                className={`py-2 rounded-xl text-[11px] font-medium transition ${
                  wentMeeting === 'no_meeting'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.qMeetingNoneToday}
              </button>
            </div>
          </div>

          {/* Q2: Sponsor call */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">
              {t.qSponsor}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCalledSponsor(true)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  calledSponsor
                    ? 'bg-[#3E6B57] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setCalledSponsor(false)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  !calledSponsor
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.no}
              </button>
            </div>
          </div>

          {/* Q3: Step work */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">
              {t.qStep}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWroteStep(true)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  wroteStep
                    ? 'bg-[#3E6B57] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setWroteStep(false)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  !wroteStep
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F0] text-[#6B6760]'
                }`}
              >
                {t.no}
              </button>
            </div>
          </div>

          {/* Q4: Service with clear friendly hint */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#171717]">
                {t.qService}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDidService(true)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    didService
                      ? 'bg-[#3E6B57] text-white'
                      : 'bg-[#F7F5F0] text-[#6B6760]'
                  }`}
                >
                  {t.yes}
                </button>
                <button
                  type="button"
                  onClick={() => setDidService(false)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    !didService
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#F7F5F0] text-[#6B6760]'
                  }`}
                >
                  {t.no}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#6B6760] leading-relaxed bg-[#F7F5F0] p-2 rounded-xl border border-[#ECE8DE]">
              {t.qServiceHint}
            </p>
          </div>

          {/* Q5: What helped? */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.qHelpedToday}
            </span>
            <input
              type="text"
              value={helperNote}
              onChange={(e) => setHelperNote(e.target.value)}
              placeholder={t.qHelpedTodayPlaceholder}
              className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none"
            />
          </div>

          {/* Q6: Single step for tomorrow */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2">
            <span className="text-xs font-bold text-[#171717] block">
              {t.qTomorrowStep}
            </span>
            <input
              type="text"
              value={tomorrowOneStep}
              onChange={(e) => setTomorrowOneStep(e.target.value)}
              placeholder={t.qTomorrowStepPlaceholder}
              className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md flex items-center justify-center gap-2"
          >
            <span>{t.submitEvening}</span>
            <Check size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
