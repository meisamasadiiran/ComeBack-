import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Flame, Phone, CheckCircle, Timer, User, Wind, Brain, Activity } from 'lucide-react';

export const CravingModal: React.FC = () => {
  const { activeModal, closeModal, t, contacts, addRP, openHelp } = useApp();

  const [step, setStep] = useState<'initial_rate' | 'path_choice' | 'timer_action' | 're_rate' | 'high_escalation'>('initial_rate');
  const [initialIntensity, setInitialIntensity] = useState<number>(7);
  const [selectedPath, setSelectedPath] = useState<'body' | 'mind' | 'people'>('body');
  const [selectedAction, setSelectedAction] = useState<string>('breathe');
  const [finalIntensity, setFinalIntensity] = useState<number>(4);

  // 90-second countdown timer
  const [secondsLeft, setSecondsLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setStep('re_rate');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  // Visual breathing rhythm: 4s in, 4s hold, 4s out = 12s cycle
  useEffect(() => {
    if (!isTimerRunning) return;
    const cycle = (90 - secondsLeft) % 12;
    if (cycle < 4) {
      setBreathPhase('in');
    } else if (cycle < 8) {
      setBreathPhase('hold');
    } else {
      setBreathPhase('out');
    }
  }, [secondsLeft, isTimerRunning]);

  if (activeModal !== 'craving') return null;

  const handleStartTimerAndAction = (path: 'body' | 'mind' | 'people', actionId: string) => {
    setSelectedPath(path);
    setSelectedAction(actionId);
    setSecondsLeft(90);
    setIsTimerRunning(true);
    setStep('timer_action');
  };

  const handleReRateSubmit = () => {
    if (finalIntensity >= 6) {
      setStep('high_escalation');
    } else {
      finishCravingFlow();
    }
  };

  const finishCravingFlow = () => {
    addRP(2, 'مدیریت و موج‌سواری وسوسه', 'Surfed craving wave', 'craving');
    closeModal();
    // reset state
    setStep('initial_rate');
    setIsTimerRunning(false);
    setSecondsLeft(90);
  };

  const sponsorContact = contacts.find((c) => c.type === 'sponsor');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Flame size={22} className="fill-[#E45A2A]" />
            <span className="font-bold text-base text-[#171717]">
              {t.btnCraving}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openHelp('craving')}
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

        {/* STEP 1: Rate Initial Craving */}
        {step === 'initial_rate' && (
          <div className="space-y-5 py-2">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-[#171717]">
                {t.cravingTitle}
              </h3>
              <p className="whitespace-pre-line text-sm text-[#6B6760] leading-relaxed">
                {t.cravingIntro}
              </p>
            </div>

            {/* Slider / Numbers 0 to 10 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-subtle text-center space-y-4">
              <span className="font-semibold text-sm text-[#171717] block">
                {t.cravingIntensityQuestion}
              </span>
              <div className="text-4xl font-black text-[#E45A2A]">
                {initialIntensity}
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={initialIntensity}
                onChange={(e) => setInitialIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-[#E45A2A] h-2 bg-[#F0ECE1] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#6B6760] px-1 font-medium">
                <span>0 (آرام)</span>
                <span>5 (متوسط)</span>
                <span>10 (بسیار شدید)</span>
              </div>
            </div>

            <button
              onClick={() => setStep('path_choice')}
              className="w-full py-3.5 bg-[#E45A2A] text-white rounded-2xl font-bold text-sm hover:bg-[#D44B1C] transition shadow-md active:scale-[0.99]"
            >
              ادامه به انتخاب مسیر
            </button>
          </div>
        )}

        {/* STEP 2: Path Choice (Body, Mind, People) */}
        {step === 'path_choice' && (
          <div className="space-y-4 py-2">
            <div className="text-center">
              <h3 className="font-bold text-lg text-[#171717]">
                {t.cravingPathChoice}
              </h3>
              <p className="text-xs text-[#6B6760] mt-0.5">
                فقط یکی را انتخاب کن و ۹۰ ثانیه با آن بمان
              </p>
            </div>

            {/* Tab selection for 3 pathways */}
            <div className="grid grid-cols-3 gap-2 bg-[#EFECE5] p-1 rounded-2xl border border-[#E5E0D6]">
              <button
                type="button"
                onClick={() => setSelectedPath('body')}
                className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition ${
                  selectedPath === 'body'
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#6B6760]'
                }`}
              >
                <Activity size={14} className="text-[#3E6B57]" />
                {t.pathBody}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPath('mind')}
                className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition ${
                  selectedPath === 'mind'
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#6B6760]'
                }`}
              >
                <Brain size={14} className="text-[#E45A2A]" />
                {t.pathMind}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPath('people')}
                className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition ${
                  selectedPath === 'people'
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#6B6760]'
                }`}
              >
                <User size={14} className="text-[#3568A8]" />
                {t.pathPeople}
              </button>
            </div>

            {/* Path Actions */}
            <div className="space-y-2.5">
              {selectedPath === 'body' &&
                t.bodyActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleStartTimerAndAction('body', act.id)}
                    className="w-full text-right bg-white hover:bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E5E0D6] shadow-subtle transition flex flex-col gap-1 active:scale-[0.99]"
                  >
                    <span className="font-bold text-sm text-[#171717]">
                      {act.label}
                    </span>
                    <span className="text-xs text-[#6B6760] leading-relaxed">
                      {act.desc}
                    </span>
                  </button>
                ))}

              {selectedPath === 'mind' &&
                t.mindActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleStartTimerAndAction('mind', act.id)}
                    className="w-full text-right bg-white hover:bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E5E0D6] shadow-subtle transition flex flex-col gap-1 active:scale-[0.99]"
                  >
                    <span className="font-bold text-sm text-[#171717]">
                      {act.label}
                    </span>
                    <span className="text-xs text-[#6B6760] leading-relaxed">
                      {act.desc}
                    </span>
                  </button>
                ))}

              {selectedPath === 'people' &&
                t.peopleActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleStartTimerAndAction('people', act.id)}
                    className="w-full text-right bg-white hover:bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E5E0D6] shadow-subtle transition flex flex-col gap-1 active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#171717]">
                        {act.label}
                      </span>
                      <Phone size={14} className="text-[#3E6B57]" />
                    </div>
                    <span className="text-xs text-[#6B6760] leading-relaxed">
                      {act.desc}
                    </span>
                  </button>
                ))}
            </div>

            <button
              onClick={() => setStep('initial_rate')}
              className="w-full py-2 text-xs text-[#6B6760] hover:text-[#171717]"
            >
              مرحله قبل
            </button>
          </div>
        )}

        {/* STEP 3: 90-Second Active Experience & Timer */}
        {step === 'timer_action' && (
          <div className="space-y-5 py-4 text-center">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E45A2A]">
                تمرین ۹۰ ثانیه‌ای
              </span>
              <h3 className="text-xl font-bold text-[#171717]">
                فقط با این لحظه بمان
              </h3>
            </div>

            {/* Breathing Animation / Counter Visualizer */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              {/* Circular track */}
              <div
                className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                  breathPhase === 'in'
                    ? 'border-[#E45A2A] scale-105 bg-[#FDF1EC]'
                    : breathPhase === 'hold'
                    ? 'border-[#C98A28] scale-100 bg-[#FAF5EB]'
                    : 'border-[#3E6B57] scale-95 bg-[#EFF6F2]'
                }`}
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-4xl font-black text-[#171717]">
                  {secondsLeft}s
                </span>
                <span className="text-xs font-semibold text-[#171717] mt-1">
                  {breathPhase === 'in' && t.breathingIn}
                  {breathPhase === 'hold' && t.breathingHold}
                  {breathPhase === 'out' && t.breathingOut}
                </span>
              </div>
            </div>

            {/* Action Reminder Banner */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#E5E0D6] text-xs text-[#2A2A2A] leading-relaxed">
              موج ترشح بیوشیمیایی وسوسه مانند موج دریا اوج می‌گیرد و پس از ۹۰ ثانیه فروکش می‌کند. لازم نیست کاری بکنی، فقط تماشا کن.
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('re_rate')}
                className="w-full py-3 bg-[#171717] text-white rounded-2xl text-xs font-bold hover:bg-[#2A2A2A]"
              >
                پایان زودهنگام تمرین
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Re-Rate Craving */}
        {step === 're_rate' && (
          <div className="space-y-5 py-3">
            <div className="text-center space-y-1">
              <CheckCircle size={32} className="text-[#3E6B57] mx-auto" />
              <h3 className="text-xl font-bold text-[#171717]">
                {t.reRateCravingTitle}
              </h3>
              <p className="text-xs text-[#6B6760]">
                شدت اولیه تو {initialIntensity} بود. الان کجایی؟
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-subtle text-center space-y-4">
              <div className="text-4xl font-black text-[#E45A2A]">
                {finalIntensity}
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={finalIntensity}
                onChange={(e) => setFinalIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-[#E45A2A] h-2 bg-[#F0ECE1] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#6B6760] px-1 font-medium">
                <span>0 (آرام و رها)</span>
                <span>5 (متوسط)</span>
                <span>10 (بسیار بالا)</span>
              </div>
            </div>

            <button
              onClick={handleReRateSubmit}
              className="w-full py-3.5 bg-[#3E6B57] text-white rounded-2xl font-bold text-sm hover:bg-[#345949] transition shadow-md active:scale-[0.99]"
            >
              ثبت ارزیابی و پایان (+۲ RP)
            </button>
          </div>
        )}

        {/* STEP 5: High Escalation (intensity still high >= 6) */}
        {step === 'high_escalation' && (
          <div className="space-y-5 py-3">
            <div className="bg-[#FDF2EE] border border-[#F6DCD2] p-4 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold text-[#E45A2A] uppercase">
                اقدام محافظتی
              </span>
              <p className="text-sm font-bold text-[#171717]">
                {t.cravingStillHigh}
              </p>
              <p className="text-xs text-[#6B6760] leading-relaxed">
                تنها ماندن با وسوسه شدید خطرناک است. همین حالا یک گفت‌وگوی کوتاه چنددقیقه‌ای با راهنما برقرار کن.
              </p>
            </div>

            {sponsorContact && sponsorContact.phone ? (
              <a
                href={`tel:${sponsorContact.phone}`}
                className="w-full py-3.5 bg-[#E45A2A] text-white rounded-2xl font-bold text-sm hover:bg-[#D44B1C] transition shadow-md flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                <span>
                  {t.btnCallSponsorNow} ({sponsorContact.name || 'راهنما'})
                </span>
              </a>
            ) : (
              <button
                onClick={() => {
                  closeModal();
                  // prompt user to register contact
                  alert('لطفاً شماره راهنمایت را در بخش تماس ضروری ثبت کن.');
                }}
                className="w-full py-3.5 bg-[#E45A2A] text-white rounded-2xl font-bold text-sm hover:bg-[#D44B1C] transition shadow-md flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                <span>{t.btnCallSponsorNow}</span>
              </button>
            )}

            <button
              onClick={finishCravingFlow}
              className="w-full py-2.5 bg-white border border-[#E5E0D6] text-[#171717] rounded-xl text-xs font-bold hover:bg-[#FAF8F5]"
            >
              تماس گرفتم / آرام‌تر شدم (پایان)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
