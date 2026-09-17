import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TodayView } from './components/TodayView';
import { ReturnHubView } from './components/ReturnHubView';
import { MyJourneyView } from './components/MyJourneyView';
import { JournalView } from './components/JournalView';
import { MoreView } from './components/MoreView';

// Modals
import { WelcomeModal } from './components/WelcomeModal';
import { HelpModal } from './components/HelpModal';
import { CravingModal } from './components/CravingModal';
import { AfterSlipModal } from './components/AfterSlipModal';
import { NotFeelingWellModal } from './components/NotFeelingWellModal';
import { QuickNoteModal } from './components/QuickNoteModal';
import { MorningCheckInModal } from './components/MorningCheckInModal';
import { EveningCheckInModal } from './components/EveningCheckInModal';
import { EmergencyContactsModal } from './components/EmergencyContactsModal';
import { IfThenModal } from './components/IfThenModal';
import { ComebackAiModal } from './components/ComebackAiModal';
import { SettingsModal } from './components/SettingsModal';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171717] flex flex-col selection:bg-[#E45A2A] selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-16">
        {activeTab === 'today' && <TodayView />}
        {activeTab === 'return' && <ReturnHubView />}
        {activeTab === 'journey' && <MyJourneyView />}
        {activeTab === 'journal' && <JournalView />}
        {activeTab === 'more' && <MoreView />}
      </main>

      {/* Bottom 5-Tab Navigation */}
      <BottomNav />

      {/* Universal Modals & Overlays */}
      <WelcomeModal />
      <HelpModal />
      <CravingModal />
      <AfterSlipModal />
      <NotFeelingWellModal />
      <QuickNoteModal />
      <MorningCheckInModal />
      <EveningCheckInModal />
      <EmergencyContactsModal />
      <IfThenModal />
      <ComebackAiModal />
      <SettingsModal />
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
