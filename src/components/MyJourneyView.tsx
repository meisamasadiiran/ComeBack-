import React from 'react';
import { useApp } from '../context/AppContext';
import { Route, Sparkles, Award, RotateCcw, Calendar, Phone, Heart, Shield, RefreshCw } from 'lucide-react';

export const MyJourneyView: React.FC = () => {
  const {
    cleanDays,
    longestDays,
    totalRP,
    returnEvents,
    comebackMoments,
    meetings90,
    ifThenPlans,
    contacts,
    t,
    openHelp,
  } = useApp();

  // Calculate sponsor calls and services from return events
  const sponsorCallsCount = returnEvents.filter((e) => e.type === 'sponsor').length;
  const servicesCount = returnEvents.filter((e) => e.type === 'service').length;
  const activeIfThenCount = ifThenPlans.filter((p) => p.active).length;

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Route size={22} />
            <h2 className="text-xl font-bold text-[#171717]">
              {t.journeyTitle}
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
          {t.brandManifesto}
        </p>

        {/* RP Highlight */}
        <div className="mt-4 p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B6760] block">
              {t.returnPointsLabel}
            </span>
            <span className="text-2xl font-black text-[#171717]">
              {totalRP} RP
            </span>
          </div>
          <span className="text-[11px] text-[#3E6B57] bg-[#EFF6F2] px-2.5 py-1 rounded-xl font-bold border border-[#C5DFD0]">
            مسیرت پاک نشده
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid (Notice: NO shaming slip counter!) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Clean Days Now */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#E45A2A]">
            <Calendar size={16} />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeyCleanNow}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {cleanDays}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              {t.journeyDays}
            </span>
          </div>
        </div>

        {/* Longest Period */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#3E6B57]">
            <Award size={16} />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeyLongest}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {longestDays}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              {t.journeyDays}
            </span>
          </div>
        </div>

        {/* Comebacks Count */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#C98A28]">
            <RotateCcw size={16} />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeyComebacks}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {comebackMoments.length}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              {t.journeyTimes}
            </span>
          </div>
        </div>

        {/* Total Meetings Logged */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#3568A8]">
            <Shield size={16} />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeyMeetings}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {meetings90.length}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              جلسه
            </span>
          </div>
        </div>

        {/* Sponsor Calls */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#171717]">
            <Phone size={16} className="text-[#3E6B57]" />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeySponsorCalls}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {sponsorCallsCount}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              تماس
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-1">
          <div className="flex items-center gap-1.5 text-[#171717]">
            <Heart size={16} className="text-[#E45A2A]" />
            <span className="text-xs font-semibold text-[#6B6760]">
              {t.journeyServices}
            </span>
          </div>
          <div className="text-2xl font-black text-[#171717]">
            {servicesCount}{' '}
            <span className="text-xs font-normal text-[#6B6760]">
              خدمت
            </span>
          </div>
        </div>
      </div>

      {/* Special Comeback Moments Card */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <div className="flex items-center gap-2 text-[#E45A2A]">
          <RefreshCw size={18} />
          <h3 className="font-bold text-sm text-[#171717]">
            {t.comebackHistoryTitle}
          </h3>
        </div>

        {comebackMoments.length === 0 ? (
          <p className="text-xs text-[#6B6760] leading-relaxed">
            {t.noComebacksYet}
          </p>
        ) : (
          <div className="space-y-2">
            {comebackMoments.map((moment, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#FDF1EC] rounded-2xl border border-[#F6DCD2] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-[#E45A2A] block">
                    COMEBACK #{comebackMoments.length - idx}
                  </span>
                  <span className="text-[#2A2A2A] mt-0.5 block">
                    {moment.actionTaken}
                  </span>
                </div>
                <span className="text-[10px] text-[#6B6760] font-mono">
                  {new Date(moment.date).toLocaleDateString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Return Points History Log */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D6] shadow-subtle space-y-3">
        <h3 className="font-bold text-sm text-[#171717]">
          {t.rpBreakdownTitle}
        </h3>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {returnEvents.map((ev) => (
            <div
              key={ev.id}
              className="flex items-center justify-between p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE8DE] text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E45A2A]" />
                <span className="font-medium text-[#171717]">
                  {ev.titleFa}
                </span>
              </div>
              <span className="font-bold text-[#3E6B57] font-mono">
                +{ev.points} RP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
