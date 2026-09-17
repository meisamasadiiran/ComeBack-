import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, GitCommit, Trash2, Check, RefreshCw, AlertCircle } from 'lucide-react';

export const IfThenModal: React.FC = () => {
  const { activeModal, closeModal, ifThenPlans, addIfThenPlan, deleteIfThenPlan, reviewIfThenPlan, t, openHelp } = useApp();

  const [ifTrigger, setIfTrigger] = useState('');
  const [thenAction, setThenAction] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (activeModal !== 'ifThen') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!ifTrigger.trim() || !thenAction.trim()) return;

    const success = addIfThenPlan(ifTrigger.trim(), thenAction.trim());
    if (!success) {
      setErrorMsg(t.ifThenMaxReached);
    } else {
      setIfTrigger('');
      setThenAction('');
    }
  };

  const activePlans = ifThenPlans.filter((p) => p.active);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <GitCommit size={20} />
            <span className="font-bold text-base text-[#171717]">
              {t.ifThenTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openHelp('ifThen')}
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

        <p className="text-xs text-[#6B6760] mb-3 leading-relaxed">
          {t.ifThenSubtitle}
        </p>

        {/* Active Plans List (Max 2) */}
        <div className="space-y-3 mb-4">
          {activePlans.length === 0 ? (
            <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] text-center text-xs text-[#6B6760]">
              {t.noActiveIfThen}
            </div>
          ) : (
            activePlans.map((plan, index) => (
              <div
                key={plan.id}
                className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E45A2A]">
                    برنامه {index + 1} از ۲
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reviewIfThenPlan(plan.id)}
                      className="text-[11px] bg-[#EFF6F2] text-[#3E6B57] px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-[#D9EFE3]"
                    >
                      <RefreshCw size={11} />
                      <span>{t.btnMarkReviewed}</span>
                    </button>
                    <button
                      onClick={() => deleteIfThenPlan(plan.id)}
                      className="p-1 text-[#B83A32] hover:bg-[#FDF2F1] rounded-lg"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#2A2A2A] space-y-1.5 leading-relaxed">
                  <div className="bg-[#FAF5EB] p-2.5 rounded-xl border border-[#F2E5D0]">
                    <strong className="text-[#C98A28]">{t.ifThenPromptIf} </strong>
                    <span>{plan.ifTrigger}</span>
                  </div>
                  <div className="bg-[#EFF6F2] p-2.5 rounded-xl border border-[#C5DFD0]">
                    <strong className="text-[#3E6B57]">{t.ifThenPromptThen} </strong>
                    <span>{plan.thenAction}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Builder Form */}
        {activePlans.length < 2 ? (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-[#E5E0D6] space-y-3 shadow-subtle">
            <span className="text-xs font-bold text-[#171717] block">
              طراحی برنامه جدید:
            </span>

            {errorMsg && (
              <div className="p-2.5 bg-[#FDF2F1] text-[#B83A32] rounded-xl text-xs flex items-center gap-1.5">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#171717] block mb-1">
                {t.ifThenPromptIf} (محرک / موقعیت حساس):
              </label>
              <input
                type="text"
                required
                value={ifTrigger}
                onChange={(e) => setIfTrigger(e.target.value)}
                placeholder={t.ifThenIfPlaceholder}
                className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#171717] block mb-1">
                {t.ifThenPromptThen} (اقدام مشخص و فوری):
              </label>
              <textarea
                rows={2}
                required
                value={thenAction}
                onChange={(e) => setThenAction(e.target.value)}
                placeholder={t.ifThenThenPlaceholder}
                className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#171717] text-white rounded-xl font-bold text-xs hover:bg-[#2A2A2A] flex items-center justify-center gap-1"
            >
              <Check size={14} />
              <span>{t.saveIfThenBtn}</span>
            </button>
          </form>
        ) : (
          <div className="p-3 bg-[#FAF5EB] text-[#C98A28] rounded-2xl border border-[#F2E5D0] text-xs text-center">
            {t.ifThenMaxReached}
          </div>
        )}
      </div>
    </div>
  );
};
