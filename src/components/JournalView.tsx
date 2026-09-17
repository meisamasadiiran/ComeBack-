import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Mic, MicOff, Trash2, Send, Check, Sparkles, Plus, Play, Square } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { quickNotes, addQuickNote, deleteQuickNote, sanctuaryEntries, addSanctuaryEntry, t, openHelp } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'quick' | 'sanctuary'>('quick');

  // Quick note input
  const [quickText, setQuickText] = useState('');
  const [quickCategory, setQuickCategory] = useState<'today' | 'later' | 'idea'>('today');

  // Sanctuary inputs
  const [whatHappened, setWhatHappened] = useState('');
  const [whatBothered, setWhatBothered] = useState('');
  const [whatBroughtJoy, setWhatBroughtJoy] = useState('');
  const [whatLearned, setWhatLearned] = useState('');
  const [tomorrowWish, setTomorrowWish] = useState('');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSaveQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickText.trim()) return;
    addQuickNote(quickText.trim(), quickCategory);
    setQuickText('');
  };

  const handleSaveSanctuary = (e: React.FormEvent) => {
    e.preventDefault();
    addSanctuaryEntry({
      date: new Date().toISOString().split('T')[0],
      whatHappened: whatHappened.trim(),
      whatBothered: whatBothered.trim(),
      whatBroughtJoy: whatBroughtJoy.trim(),
      whatLearned: whatLearned.trim(),
      tomorrowWish: tomorrowWish.trim(),
      audioBlobUrl: recordedAudioUrl || undefined,
    });
    setWhatHappened('');
    setWhatBothered('');
    setWhatBroughtJoy('');
    setWhatLearned('');
    setTomorrowWish('');
    setRecordedAudioUrl(null);
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('دسترسی به میکروفون امکان‌پذیر نیست.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <BookOpen size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              {t.journalTitle}
            </h2>
          </div>
          <button
            onClick={() => openHelp('journal')}
            className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
          >
            ⓘ
          </button>
        </div>

        {/* Sub-tab Pill Switch */}
        <div className="grid grid-cols-2 gap-2 bg-[#EFECE5] p-1 rounded-2xl border border-[#E5E0D6]">
          <button
            onClick={() => setActiveSubTab('quick')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              activeSubTab === 'quick'
                ? 'bg-white text-[#171717] shadow-sm'
                : 'text-[#6B6760]'
            }`}
          >
            {t.journalTabQuick}
          </button>
          <button
            onClick={() => setActiveSubTab('sanctuary')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              activeSubTab === 'sanctuary'
                ? 'bg-white text-[#171717] shadow-sm'
                : 'text-[#6B6760]'
            }`}
          >
            {t.journalTabSanctuary}
          </button>
        </div>
      </div>

      {/* TAB 1: QUICK NOTES */}
      {activeSubTab === 'quick' && (
        <div className="space-y-4">
          {/* Always accessible instant write box (never a heavy form) */}
          <form onSubmit={handleSaveQuickNote} className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
            <textarea
              rows={2}
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
              placeholder={t.journalQuickPrompt}
              className="w-full p-2 bg-[#F7F5F0] rounded-2xl border border-[#E5E0D6] text-xs text-[#171717] focus:outline-none focus:border-[#E45A2A] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setQuickCategory('today')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    quickCategory === 'today'
                      ? 'bg-[#E45A2A] text-white'
                      : 'bg-[#F7F5F0] text-[#6B6760]'
                  }`}
                >
                  {t.quickNoteTagToday}
                </button>
                <button
                  type="button"
                  onClick={() => setQuickCategory('later')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    quickCategory === 'later'
                      ? 'bg-[#3E6B57] text-white'
                      : 'bg-[#F7F5F0] text-[#6B6760]'
                  }`}
                >
                  {t.quickNoteTagLater}
                </button>
                <button
                  type="button"
                  onClick={() => setQuickCategory('idea')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    quickCategory === 'idea'
                      ? 'bg-[#C98A28] text-white'
                      : 'bg-[#F7F5F0] text-[#6B6760]'
                  }`}
                >
                  {t.quickNoteTagIdea}
                </button>
              </div>

              <button
                type="submit"
                disabled={!quickText.trim()}
                className="px-4 py-1.5 bg-[#171717] text-white rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-[#2A2A2A] transition"
              >
                ثبت
              </button>
            </div>
          </form>

          {/* Quick Notes List */}
          <div className="space-y-2.5">
            {quickNotes.length === 0 ? (
              <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] text-center text-xs text-[#6B6760]">
                هنوز یادداشت سریعی ننوشته‌ای. هر جرقه‌ای به ذهنت رسید اینجا ثبت کن.
              </div>
            ) : (
              quickNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#E5E0D6] shadow-subtle flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        note.category === 'today'
                          ? 'bg-[#FDF2EE] text-[#E45A2A]'
                          : note.category === 'later'
                          ? 'bg-[#EFF6F2] text-[#3E6B57]'
                          : 'bg-[#FAF5EB] text-[#C98A28]'
                      }`}
                    >
                      {note.category === 'today'
                        ? t.quickNoteTagToday
                        : note.category === 'later'
                        ? t.quickNoteTagLater
                        : t.quickNoteTagIdea}
                    </span>
                    <p className="text-xs text-[#171717] leading-relaxed whitespace-pre-line">
                      {note.text}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteQuickNote(note.id)}
                    className="p-1 text-[#D9D4CB] hover:text-[#B83A32]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SANCTUARY (خلوتگاه) */}
      {activeSubTab === 'sanctuary' && (
        <div className="space-y-4">
          <form onSubmit={handleSaveSanctuary} className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3.5">
            <span className="text-xs font-bold text-[#171717] block">
              خلوت و تأمل امروز:
            </span>

            <div>
              <label className="text-xs text-[#6B6760] block mb-1">
                {t.journalSanctuaryPrompt1}
              </label>
              <textarea
                rows={2}
                value={whatHappened}
                onChange={(e) => setWhatHappened(e.target.value)}
                className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#6B6760] block mb-1">
                {t.journalSanctuaryPrompt2}
              </label>
              <input
                type="text"
                value={whatBothered}
                onChange={(e) => setWhatBothered(e.target.value)}
                className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#6B6760] block mb-1">
                {t.journalSanctuaryPrompt3}
              </label>
              <input
                type="text"
                value={whatBroughtJoy}
                onChange={(e) => setWhatBroughtJoy(e.target.value)}
                className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#6B6760] block mb-1">
                {t.journalSanctuaryPrompt4}
              </label>
              <input
                type="text"
                value={whatLearned}
                onChange={(e) => setWhatLearned(e.target.value)}
                className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#6B6760] block mb-1">
                {t.journalSanctuaryPrompt5}
              </label>
              <input
                type="text"
                value={tomorrowWish}
                onChange={(e) => setTomorrowWish(e.target.value)}
                className="w-full p-2.5 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
              />
            </div>

            {/* Voice Note Recording Section */}
            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] space-y-2">
              <span className="text-xs font-bold text-[#171717] block">
                {t.voiceNoteTitle}
              </span>
              <div className="flex items-center gap-2">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className="px-3 py-1.5 bg-[#171717] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2A2A2A]"
                  >
                    <Mic size={14} className="text-[#E45A2A]" />
                    <span>{t.voiceNoteRecord}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="px-3 py-1.5 bg-[#B83A32] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-pulse"
                  >
                    <Square size={14} />
                    <span>{t.voiceNoteStop}</span>
                  </button>
                )}

                {recordedAudioUrl && (
                  <audio controls src={recordedAudioUrl} className="h-8 max-w-[200px]" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#171717] text-white rounded-2xl font-bold text-xs hover:bg-[#2A2A2A] flex items-center justify-center gap-2 transition"
            >
              <Check size={15} />
              <span>{t.saveSanctuaryBtn}</span>
            </button>
          </form>

          {/* Past Sanctuary Entries */}
          <div className="space-y-3">
            {sanctuaryEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-2 text-xs"
              >
                <span className="font-bold text-[#E45A2A] block text-[11px] font-mono">
                  {entry.date}
                </span>
                {entry.whatHappened && (
                  <p className="text-[#171717] leading-relaxed">
                    <strong>امروز:</strong> {entry.whatHappened}
                  </p>
                )}
                {entry.whatLearned && (
                  <p className="text-[#3E6B57] bg-[#EFF6F2] p-2 rounded-xl">
                    <strong>آموخته:</strong> {entry.whatLearned}
                  </p>
                )}
                {entry.audioBlobUrl && (
                  <audio controls src={entry.audioBlobUrl} className="h-8 w-full mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
