import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, ShieldCheck, PhoneCall, Check, ArrowRight, ArrowLeft, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AfterSlipModal: React.FC = () => {
  const { activeModal, closeModal, t, lang, contacts, recordSlipAndComeback, totalRP, openHelp } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedSafeAction, setSelectedSafeAction] = useState<string>('leave');

  // Step 4 Timeline state
  const [timeline, setTimeline] = useState({
    where: '',
    withWhom: '',
    whatHappened: '',
    whatFelt: '',
    whatThought: '',
    firstPivotPoint: '',
    whatHelpedReturn: '',
  });

  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (activeModal !== 'afterSlip') return null;

  const handleSelectMedicalYes = () => {
    // Red alert state handled directly in UI
    setStep(101); // 101 = Medical Red Flag Screen
  };

  const handleMedicalSafe = () => {
    setStep(2);
  };

  const handleStep2GroundingDone = () => {
    setStep(3);
  };

  const handleStep3SafeActionDone = () => {
    setStep(4);
  };

  const handleCompleteProtocol = (saveTimelineNow: boolean) => {
    const actionLabel = t.safeActions.find((a) => a.id === selectedSafeAction)?.label || selectedSafeAction;
    recordSlipAndComeback(actionLabel, saveTimelineNow ? timeline : undefined);
    
    // Confetti for returning!
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E45A2A', '#3E6B57', '#C98A28'],
      });
    } catch {}

    setIsFinished(true);
  };

  const NextArrow = lang === 'fa' ? ArrowLeft : ArrowRight;
  const sponsor = contacts.find((c) => c.type === 'sponsor');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E45A2A] animate-pulse" />
            <span className="font-bold text-base text-[#171717]">
              {t.afterSlipTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openHelp('afterSlip')}
              className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
            >
              ⓘ
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* FINISHED CELEBRATION / COMEBACK MARK */}
        {isFinished ? (
          <div className="space-y-6 py-6 text-center animate-fade-in">
            <div className="w-16 h-16 bg-[#EFF6F2] rounded-full flex items-center justify-center mx-auto border-2 border-[#3E6B57] text-[#3E6B57]">
              <RefreshCw size={30} className="animate-spin-slow" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-[#FDF1EC] text-[#E45A2A] border border-[#F6DCD2] rounded-full text-xs font-bold uppercase tracking-wider">
                COMEBACK RECORDED
              </span>
              <h3 className="text-2xl font-black text-[#171717]">
                {totalRP} RP
              </h3>
              <p className="whitespace-pre-line text-sm font-semibold text-[#171717] leading-relaxed">
                {t.afterSlipFinishedMessage}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] text-xs text-[#6B6760] leading-relaxed text-right">
              امتیازهای گذشته تو حذف نشدند. بهبودی یک خط صاف نیست، یک مهارت بازگشت است. همین که الان اینجایی شجاعت تو را نشان می‌دهد.
            </div>

            <button
              onClick={() => {
                closeModal();
                setIsFinished(false);
                setStep(1);
              }}
              className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md"
            >
              ادامه مسیر برای امروز
            </button>
          </div>
        ) : (
          <>
            {/* PROGRESS BAR (4 STEPS) */}
            {step <= 4 && (
              <div className="flex items-center gap-1.5 mb-4">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      step >= s ? 'bg-[#E45A2A]' : 'bg-[#E5E0D6]'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* STEP 1: SAFETY (DETERMINISTIC RED FLAGS) */}
            {step === 1 && (
              <div className="space-y-4 py-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[#B83A32]">
                    <AlertTriangle size={18} />
                    <h3 className="font-bold text-base text-[#171717]">
                      {t.step1Title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B6760]">
                    اول مطمئن شویم بدنت در خطر اورژانسی نیست.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2.5 text-right">
                  <span className="font-semibold text-xs text-[#171717] block border-b border-[#F0ECE1] pb-1.5">
                    {t.step1Question}
                  </span>
                  <ul className="space-y-2 text-xs text-[#2A2A2A]">
                    {t.medicalFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B83A32] flex-shrink-0" />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleMedicalSafe}
                    className="w-full py-3.5 bg-[#3E6B57] text-white rounded-2xl font-bold text-sm hover:bg-[#345949] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} />
                    <span>{t.medicalNoBtn}</span>
                  </button>

                  <button
                    onClick={handleSelectMedicalYes}
                    className="w-full py-2.5 bg-white border border-[#B83A32] text-[#B83A32] rounded-xl font-semibold text-xs hover:bg-[#FDF2F1] transition"
                  >
                    {t.medicalYesBtn}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 101: MEDICAL DANGER ESCALATION (DETERMINISTIC) */}
            {step === 101 && (
              <div className="space-y-5 py-3 text-center">
                <div className="w-14 h-14 bg-[#FDF2F1] rounded-full flex items-center justify-center mx-auto border-2 border-[#B83A32] text-[#B83A32]">
                  <AlertTriangle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#B83A32]">
                    {t.medicalYesWarning}
                  </h3>
                  <p className="text-xs text-[#6B6760] leading-relaxed">
                    سلامت جسمی و بقای تو بالاتر از هر چیز دیگری است. لطفاً فوراً با اورژانس تماس بگیر یا از نزدیک‌ترین فرد کمک بخواه.
                  </p>
                </div>

                <a
                  href="tel:115"
                  className="w-full py-4 bg-[#B83A32] text-white rounded-2xl font-black text-base hover:bg-[#A32F28] transition shadow-lg flex items-center justify-center gap-2"
                >
                  <PhoneCall size={22} />
                  <span>{t.medicalYesCallBtn}</span>
                </a>

                <button
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-xs text-[#6B6760] hover:text-[#171717]"
                >
                  بازگشت و بازنگری علائم
                </button>
              </div>
            )}

            {/* STEP 2: CALM DOWN (NO SELF-BLAME & GROUNDING) */}
            {step === 2 && (
              <div className="space-y-5 py-2">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 bg-[#EFF6F2] text-[#3E6B57] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-[#171717]">
                    {t.step2Title}
                  </h3>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-subtle text-center space-y-3">
                  <p className="whitespace-pre-line text-sm font-bold text-[#171717] leading-relaxed">
                    {t.step2Message}
                  </p>
                  <p className="text-xs text-[#6B6760] leading-relaxed bg-[#F7F5F0] p-3 rounded-xl border border-[#ECE8DE]">
                    {t.step2Grounding}
                  </p>
                </div>

                <button
                  onClick={handleStep2GroundingDone}
                  className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>{t.step2NextBtn}</span>
                  <NextArrow size={16} />
                </button>
              </div>
            )}

            {/* STEP 3: JUST ONE ACTION */}
            {step === 3 && (
              <div className="space-y-4 py-2">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">
                    {t.step3Title}
                  </h3>
                  <p className="text-xs text-[#6B6760]">
                    {t.step3Prompt}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {t.safeActions.map((act) => (
                    <button
                      key={act.id}
                      onClick={() => setSelectedSafeAction(act.id)}
                      className={`w-full text-right p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                        selectedSafeAction === act.id
                          ? 'bg-white border-[#E45A2A] shadow-md ring-1 ring-[#E45A2A]'
                          : 'bg-white border-[#E5E0D6] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedSafeAction === act.id
                            ? 'bg-[#E45A2A] border-[#E45A2A] text-white'
                            : 'border-[#D9D4CB]'
                        }`}
                      >
                        {selectedSafeAction === act.id && <Check size={12} />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#171717]">
                          {act.label}
                        </span>
                        <span className="text-xs text-[#6B6760] mt-0.5">
                          {act.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* If selected sponsor call */}
                {selectedSafeAction === 'call_sponsor' && sponsor?.phone && (
                  <div className="bg-[#EFF6F2] p-3 rounded-2xl border border-[#3E6B57]/30 flex items-center justify-between">
                    <span className="text-xs text-[#3E6B57] font-semibold">
                      تماس مستقیم با راهنما: {sponsor.name || ''}
                    </span>
                    <a
                      href={`tel:${sponsor.phone}`}
                      className="px-3 py-1 bg-[#3E6B57] text-white rounded-lg text-xs font-bold"
                    >
                      تماس
                    </a>
                  </div>
                )}

                <button
                  onClick={handleStep3SafeActionDone}
                  className="w-full py-3.5 bg-[#E45A2A] text-white rounded-2xl font-bold text-sm hover:bg-[#D44B1C] transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>{t.step3ConfirmBtn}</span>
                  <NextArrow size={16} />
                </button>
              </div>
            )}

            {/* STEP 4: WE REVIEW LATER (TIMELINE) */}
            {step === 4 && (
              <div className="space-y-4 py-2">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">
                    {t.step4Title}
                  </h3>
                  <p className="text-xs text-[#6B6760] leading-relaxed">
                    {t.step4Intro}
                  </p>
                </div>

                {/* Simple 24h Timeline Inputs */}
                <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-3 max-h-[46vh] overflow-y-auto text-xs">
                  <div>
                    <label className="font-semibold text-[#171717] block mb-1">
                      {t.timelineQuestions.where}
                    </label>
                    <input
                      type="text"
                      value={timeline.where}
                      onChange={(e) => setTimeline({ ...timeline, where: e.target.value })}
                      placeholder="مکان فیزیکی..."
                      className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171717] block mb-1">
                      {t.timelineQuestions.withWhom}
                    </label>
                    <input
                      type="text"
                      value={timeline.withWhom}
                      onChange={(e) => setTimeline({ ...timeline, withWhom: e.target.value })}
                      placeholder="افرادی که در کنارم بودند..."
                      className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171717] block mb-1">
                      {t.timelineQuestions.whatHappened}
                    </label>
                    <input
                      type="text"
                      value={timeline.whatHappened}
                      onChange={(e) => setTimeline({ ...timeline, whatHappened: e.target.value })}
                      placeholder="رخداد یا محرک..."
                      className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171717] block mb-1">
                      {t.timelineQuestions.whatFelt}
                    </label>
                    <input
                      type="text"
                      value={timeline.whatFelt}
                      onChange={(e) => setTimeline({ ...timeline, whatFelt: e.target.value })}
                      placeholder="احساس خشم، تنهایی، خستگی..."
                      className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171717] block mb-1">
                      {t.timelineQuestions.firstPivotPoint}
                    </label>
                    <input
                      type="text"
                      value={timeline.firstPivotPoint}
                      onChange={(e) => setTimeline({ ...timeline, firstPivotPoint: e.target.value })}
                      placeholder="جایی که می‌شد تماس گرفت یا آنجا را ترک کرد..."
                      className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171717] block mb-1 text-[#3E6B57]">
                      {t.timelineQuestions.whatHelpedReturn}
                    </label>
                    <input
                      type="text"
                      value={timeline.whatHelpedReturn}
                      onChange={(e) => setTimeline({ ...timeline, whatHelpedReturn: e.target.value })}
                      placeholder="تماس، باز کردن اپ، یادآوری عهد با خود..."
                      className="w-full p-2 bg-[#EFF6F2] rounded-xl border border-[#C5DFD0] text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleCompleteProtocol(true)}
                    className="w-full py-3.5 bg-[#171717] text-white rounded-2xl font-bold text-sm hover:bg-[#2A2A2A] transition shadow-md"
                  >
                    {t.saveTimelineBtn}
                  </button>

                  <button
                    onClick={() => handleCompleteProtocol(false)}
                    className="w-full py-2 text-xs text-[#6B6760] hover:text-[#171717] transition"
                  >
                    {t.saveLaterBtn}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
