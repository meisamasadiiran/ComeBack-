import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Circle, Users, Plus, X, Calendar, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

export const NinetyMeetingsView: React.FC = () => {
  const { meetings90, logMeeting, t, lang, openHelp } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetingName, setMeetingName] = useState('');
  const [meetingType, setMeetingType] = useState<'in-person' | 'online'>('in-person');
  const [takeaway, setTakeaway] = useState('');
  const [spokeWithSomeone, setSpokeWithSomeone] = useState<boolean>(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    logMeeting({
      date: meetingDate,
      name: meetingName.trim() || undefined,
      type: meetingType,
      takeaway: takeaway.trim(),
      spokeWithSomeone,
    });
    setMeetingName('');
    setTakeaway('');
    setShowForm(false);
  };

  const progressPercent = Math.min(100, Math.round((meetings90.length / 90) * 100));

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* NA Blue Signature Header Card */}
      <div className="bg-[#3568A8] text-white p-6 rounded-3xl shadow-card relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10 mb-3">
          <div className="flex items-center gap-2">
            <Users size={22} />
            <h2 className="text-xl font-bold tracking-tight">
              {t.ninetyTitle}
            </h2>
          </div>
          <button
            onClick={() => openHelp('ninety')}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold transition"
          >
            ⓘ
          </button>
        </div>

        <p className="text-xs text-blue-100 mb-4 leading-relaxed relative z-10">
          {t.ninetySubtitle}
        </p>

        {/* Forgiving Philosophy Quote */}
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 text-xs text-white/95 leading-relaxed relative z-10 mb-4">
          {t.ninetyForgivingMessage}
        </div>

        {/* Progress Bar & Counter */}
        <div className="space-y-2 relative z-10">
          <div className="flex justify-between text-xs font-semibold">
            <span>{meetings90.length} از ۹۰ جلسه</span>
            <span>{progressPercent}٪</span>
          </div>
          <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-4 py-3 bg-white text-[#3568A8] rounded-2xl font-bold text-xs hover:bg-blue-50 transition shadow active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <Plus size={16} />
          <span>{t.ninetyLogNewBtn}</span>
        </button>
      </div>

      {/* Log Form Modal / Sheet */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E0D6]">
              <div className="flex items-center gap-2 text-[#3568A8]">
                <Users size={20} />
                <span className="font-bold text-sm text-[#171717]">
                  ثبت جلسه {meetings90.length + 1} از ۹۰
                </span>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#171717] block mb-1">
                  {t.ninetyDateLabel}
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D6] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#171717] block mb-1">
                  {t.ninetyNameLabel}
                </label>
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  placeholder="مثلاً: جلسه دوشنبه شب‌های امید..."
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D6] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#171717] block mb-1">
                  {t.ninetyTypeLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType('in-person')}
                    className={`py-2 rounded-xl font-bold transition ${
                      meetingType === 'in-person'
                        ? 'bg-[#3568A8] text-white'
                        : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                    }`}
                  >
                    {t.ninetyTypeInPerson}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType('online')}
                    className={`py-2 rounded-xl font-bold transition ${
                      meetingType === 'online'
                        ? 'bg-[#3568A8] text-white'
                        : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                    }`}
                  >
                    {t.ninetyTypeOnline}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#171717] block mb-1">
                  {t.ninetyTakeawayLabel}
                </label>
                <textarea
                  rows={2}
                  value={takeaway}
                  onChange={(e) => setTakeaway(e.target.value)}
                  placeholder={t.ninetyTakeawayPlaceholder}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D6] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#171717] block mb-1">
                  {t.ninetySpokeLabel}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSpokeWithSomeone(true)}
                    className={`px-4 py-1.5 rounded-xl font-bold transition ${
                      spokeWithSomeone
                        ? 'bg-[#3E6B57] text-white'
                        : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                    }`}
                  >
                    {t.yes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpokeWithSomeone(false)}
                    className={`px-4 py-1.5 rounded-xl font-bold transition ${
                      !spokeWithSomeone
                        ? 'bg-[#171717] text-white'
                        : 'bg-white text-[#6B6760] border border-[#E5E0D6]'
                    }`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3568A8] text-white rounded-2xl font-bold text-sm hover:bg-[#2B5487] transition shadow-md mt-2"
              >
                {t.saveMeetingBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vertical Timeline Path */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-[#171717] px-1">
          مسیر عمودی ۹۰ جلسه:
        </h3>

        {meetings90.length === 0 ? (
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] text-center space-y-2">
            <Circle size={28} className="text-[#3568A8] mx-auto opacity-40" />
            <p className="text-sm font-bold text-[#171717]">
              هنوز جلسه‌ای ثبت نشده است
            </p>
            <p className="text-xs text-[#6B6760]">
              اولین جلسه را پس از اتمام ثبت کن و نشان +۲ RP دریافت کن.
            </p>
          </div>
        ) : (
          <div className="relative pl-6 pr-6 space-y-3">
            {/* Connecting vertical line */}
            <div className="absolute top-4 bottom-4 right-10 w-0.5 bg-[#3568A8]/30" />

            {meetings90.map((session) => (
              <div
                key={session.sessionNumber}
                className="relative bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle flex items-start gap-3.5 z-10"
              >
                {/* Meeting Number Node */}
                <div className="w-8 h-8 rounded-full bg-[#EEF4FA] border-2 border-[#3568A8] text-[#3568A8] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {session.sessionNumber}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#171717]">
                      {session.name || `جلسه ${session.sessionNumber}`}
                    </span>
                    <span className="text-[10px] text-[#6B6760] font-mono">
                      {session.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#F7F5F0] text-[#6B6760] px-2 py-0.5 rounded-full border border-[#ECE8DE]">
                      {session.type === 'in-person' ? 'حضوری' : 'آنلاین'}
                    </span>
                    {session.spokeWithSomeone && (
                      <span className="text-[10px] bg-[#EFF6F2] text-[#3E6B57] px-2 py-0.5 rounded-full">
                        گفت‌وگو با همدرد
                      </span>
                    )}
                  </div>

                  {session.takeaway && (
                    <p className="text-xs text-[#2A2A2A] bg-[#F9F9F7] p-2 rounded-xl border border-[#ECE8DE] mt-1.5 italic">
                      «{session.takeaway}»
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
