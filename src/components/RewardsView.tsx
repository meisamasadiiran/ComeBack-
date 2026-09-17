import React from 'react';
import { useApp } from '../context/AppContext';
import { Gift, CheckCircle2, Coffee, Footprints, BookOpen, PhoneCall, Ticket, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardsView: React.FC = () => {
  const { totalRP, rewards, claimReward, t, openHelp } = useApp();

  const handleClaim = (id: string, title: string) => {
    const success = claimReward(id);
    if (success) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E45A2A', '#3E6B57', '#C98A28'],
        });
      } catch {}
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'coffee':
        return <Coffee size={20} className="text-[#C98A28]" />;
      case 'walk':
        return <Footprints size={20} className="text-[#3E6B57]" />;
      case 'reading':
        return <BookOpen size={20} className="text-[#3568A8]" />;
      case 'call':
        return <PhoneCall size={20} className="text-[#E45A2A]" />;
      case 'ticket':
        return <Ticket size={20} className="text-[#8B5CF6]" />;
      case 'inner':
        return <Smile size={20} className="text-[#E45A2A]" />;
      default:
        return <Gift size={20} className="text-[#E45A2A]" />;
    }
  };

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Gift size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              {t.rewardsTitle}
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
          {t.rewardsSubtitle}
        </p>

        {/* Total RP Header */}
        <div className="mt-4 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] flex items-center justify-between">
          <span className="text-xs font-bold text-[#171717]">
            موجودی Return Points تو:
          </span>
          <span className="text-base font-black text-[#E45A2A]">
            {totalRP} RP
          </span>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-3">
        {rewards.map((reward) => {
          const canClaim = totalRP >= reward.requiredRP && !reward.claimed;

          return (
            <div
              key={reward.id}
              className={`p-4 rounded-3xl border transition ${
                reward.claimed
                  ? 'bg-[#EFF6F2] border-[#C5DFD0]'
                  : 'bg-white border-[#E5E0D6] shadow-subtle'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D6] flex items-center justify-center flex-shrink-0">
                    {getIcon(reward.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#171717]">
                      {reward.titleFa}
                    </h3>
                    <p className="text-xs text-[#6B6760] mt-0.5 leading-relaxed">
                      {reward.descriptionFa}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-xs font-bold text-[#171717] mb-2 font-mono">
                    {reward.requiredRP} RP
                  </span>

                  {reward.claimed ? (
                    <span className="text-[11px] font-bold text-[#3E6B57] bg-white px-2.5 py-1 rounded-xl border border-[#C5DFD0] flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>{t.rewardClaimed}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleClaim(reward.id, reward.titleFa)}
                      disabled={!canClaim}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        canClaim
                          ? 'bg-[#171717] text-white hover:bg-[#2A2A2A] shadow-sm'
                          : 'bg-[#F0ECE5] text-[#A8A29E] cursor-not-allowed'
                      }`}
                    >
                      {t.claimRewardBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
