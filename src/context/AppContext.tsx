import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  EmergencyContact,
  MorningCheckIn,
  EveningCheckIn,
  MeetingSession,
  IfThenPlan,
  QuickNote,
  SanctuaryEntry,
  RecoveryCapitalPillar,
  AfterSlipRecord,
  CravingRecord,
  ReturnEvent,
  MilestoneNote,
  RewardItem,
  AppSettings,
  ActiveTab,
} from '../types';
import { translations } from '../i18n/translations';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['fa'];
  
  // Clean Days State
  cleanStartDate: string;
  setCleanStartDate: (date: string) => void;
  cleanDays: number;
  longestDays: number;
  
  // Return Points (RP) & Comeback system
  totalRP: number;
  addRP: (points: number, titleFa: string, titleEn: string, type: ReturnEvent['type']) => void;
  returnEvents: ReturnEvent[];
  comebackMoments: { date: string; actionTaken: string }[];
  recordSlipAndComeback: (actionTaken: string, timelineData?: any) => void;
  
  // Emergency Contacts
  contacts: EmergencyContact[];
  updateContact: (id: string, name: string, phone: string, customLabel?: string) => void;
  addCustomContact: (name: string, phone: string, label: string) => void;
  deleteContact: (id: string) => void;
  
  // Check-ins
  todayMorningCheckIn: MorningCheckIn | null;
  saveMorningCheckIn: (checkIn: Omit<MorningCheckIn, 'date' | 'completedAt'>) => void;
  todayEveningCheckIn: EveningCheckIn | null;
  saveEveningCheckIn: (checkIn: Omit<EveningCheckIn, 'date' | 'completedAt'>) => void;
  
  // 90 in 90
  meetings90: MeetingSession[];
  logMeeting: (meeting: Omit<MeetingSession, 'sessionNumber' | 'completedAt'>) => void;
  
  // If–Then Plans (Max 2 active)
  ifThenPlans: IfThenPlan[];
  addIfThenPlan: (ifTrigger: string, thenAction: string) => boolean;
  deleteIfThenPlan: (id: string) => void;
  reviewIfThenPlan: (id: string) => void;
  
  // Journal
  quickNotes: QuickNote[];
  addQuickNote: (text: string, category: QuickNote['category']) => void;
  deleteQuickNote: (id: string) => void;
  sanctuaryEntries: SanctuaryEntry[];
  addSanctuaryEntry: (entry: Omit<SanctuaryEntry, 'id' | 'createdAt'>) => void;
  
  // Recovery Capital
  recoveryPillars: RecoveryCapitalPillar[];
  updatePillar: (id: string, score: number, note: string) => void;
  
  // Milestones & Letters
  milestoneNotes: MilestoneNote[];
  saveMilestoneNote: (milestoneKey: string, noteToDay1Self: string) => void;
  
  // Rewards
  rewards: RewardItem[];
  claimReward: (id: string) => boolean;
  
  // Settings & Storage
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  clearAllData: () => void;
  
  // UI & Active Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Modal Triggers
  activeModal: string | null;
  openModal: (modalName: string, extraData?: any) => void;
  closeModal: () => void;
  modalExtraData: any;
  
  // Universal Help Sheet
  activeHelpSection: string | null;
  openHelp: (sectionKey: string) => void;
  closeHelp: () => void;
  
  // Onboarding
  isOnboarded: boolean;
  completeOnboarding: (daysClean: number, langChoice: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'comeback_app_';

function getTodayDateStr(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

const DEFAULT_RECOVERY_PILLARS: RecoveryCapitalPillar[] = [
  { id: 'self', titleKey: 'self', score: 3, note: '', lastUpdated: new Date().toISOString() },
  { id: 'family', titleKey: 'family', score: 3, note: '', lastUpdated: new Date().toISOString() },
  { id: 'people', titleKey: 'people', score: 4, note: '', lastUpdated: new Date().toISOString() },
  { id: 'work', titleKey: 'work', score: 3, note: '', lastUpdated: new Date().toISOString() },
  { id: 'money', titleKey: 'money', score: 3, note: '', lastUpdated: new Date().toISOString() },
  { id: 'home', titleKey: 'home', score: 4, note: '', lastUpdated: new Date().toISOString() },
  { id: 'skill', titleKey: 'skill', score: 3, note: '', lastUpdated: new Date().toISOString() },
  { id: 'meaning', titleKey: 'meaning', score: 4, note: '', lastUpdated: new Date().toISOString() },
];

const DEFAULT_CONTACTS: EmergencyContact[] = [
  { id: 'sponsor', type: 'sponsor', name: '', phone: '' },
  { id: 'spouse', type: 'spouse', name: '', phone: '' },
  { id: 'family', type: 'family', name: '', phone: '' },
];

const DEFAULT_REWARDS: RewardItem[] = [
  {
    id: 'coffee',
    titleFa: 'یک فنجان قهوه عالی',
    titleEn: 'A quality cup of coffee',
    descriptionFa: 'لذت بردن آرام از یک طعم دلپذیر در کافه‌ای امن',
    descriptionEn: 'A quiet mindful pause with a warm drink',
    category: 'coffee',
    requiredRP: 15,
    claimed: false,
  },
  {
    id: 'walk',
    titleFa: 'پیاده‌روی آرام در طبیعت',
    titleEn: 'A peaceful walk in nature',
    descriptionFa: 'تنفس هوای آزاد و اتصال با زمین و درختان',
    descriptionEn: 'Breathing fresh air and grounding in nature',
    category: 'walk',
    requiredRP: 25,
    claimed: false,
  },
  {
    id: 'book',
    titleFa: 'کتاب جدید برای رشد یا بهبودی',
    titleEn: 'A recovery or growth book',
    descriptionFa: 'تغذیه ذهن با بینش تازه و یادگیری مهارتی نو',
    descriptionEn: 'Nourishing the mind with a new perspective',
    category: 'reading',
    requiredRP: 40,
    claimed: false,
  },
  {
    id: 'friend',
    titleFa: 'مکالمه عمیق با دوست یا peer امن',
    titleEn: 'Call with a peer supporter',
    descriptionFa: 'گفت‌وگوی همدلانه و بدون قضاوت در کمال آرامش',
    descriptionEn: 'A deep, honest, and comforting conversation',
    category: 'call',
    requiredRP: 50,
    claimed: false,
  },
  {
    id: 'ticket',
    titleFa: 'بلیت گردش شهری یا سینما',
    titleEn: 'Ticket for a movie or transit',
    descriptionFa: 'تفریح سالم و ساختن لحظاتی دلنشین بدون هیچ محرکی',
    descriptionEn: 'Wholesome entertainment without triggers',
    category: 'ticket',
    requiredRP: 70,
    claimed: false,
  },
  {
    id: 'peace',
    titleFa: 'یک بعدازظهر صلح و عزت‌نفس',
    titleEn: 'An afternoon of serenity',
    descriptionFa: 'تجربه استقلال، تسلط بر هیجان و صلح با خویشتن',
    descriptionEn: 'Experiencing independence and self-peace',
    category: 'inner',
    requiredRP: 100,
    claimed: false,
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEY_PREFIX + 'lang') as Language) || 'fa';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang];

  // 2. Onboarding state
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'onboarded') === 'true';
  });

  // 3. Clean start date state
  const [cleanStartDate, setCleanStartDateState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'clean_start_date');
    if (saved) return saved;
    // Default 3 days ago as highlighted in the spec
    const d = new Date();
    d.setDate(d.getDate() - 3);
    return d.toISOString().split('T')[0];
  });

  const setCleanStartDate = (date: string) => {
    setCleanStartDateState(date);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'clean_start_date', date);
  };

  // Calculate clean days dynamically
  const cleanDays = Math.max(
    0,
    Math.floor((new Date().getTime() - new Date(cleanStartDate).getTime()) / (1000 * 60 * 60 * 24))
  );

  const [longestDays, setLongestDays] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'longest_days');
    return saved ? parseInt(saved, 10) : 3;
  });

  useEffect(() => {
    if (cleanDays > longestDays) {
      setLongestDays(cleanDays);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'longest_days', cleanDays.toString());
    }
  }, [cleanDays, longestDays]);

  // 4. Return Points (RP) system
  const [totalRP, setTotalRP] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'rp');
    return saved ? parseInt(saved, 10) : 28; // Start with healthy baseline
  });

  const [returnEvents, setReturnEvents] = useState<ReturnEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'return_events');
    return saved ? JSON.parse(saved) : [
      {
        id: 'init_1',
        date: getTodayDateStr(),
        titleFa: 'شروع مسیر با کامبک',
        titleEn: 'Started journey with Comeback',
        points: 10,
        type: 'checkin',
      }
    ];
  });

  const [comebackMoments, setComebackMoments] = useState<{ date: string; actionTaken: string }[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'comebacks');
    return saved ? JSON.parse(saved) : [];
  });

  const addRP = (points: number, titleFa: string, titleEn: string, type: ReturnEvent['type']) => {
    setTotalRP(prev => {
      const next = prev + points;
      localStorage.setItem(STORAGE_KEY_PREFIX + 'rp', next.toString());
      return next;
    });
    const newEvent: ReturnEvent = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      titleFa,
      titleEn,
      points,
      type,
    };
    setReturnEvents(prev => {
      const updated = [newEvent, ...prev].slice(0, 100);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'return_events', JSON.stringify(updated));
      return updated;
    });
  };

  // Crucial rule: If user slips, points are NOT erased!
  const recordSlipAndComeback = (actionTaken: string, timelineData?: any) => {
    // 1. Reset current clean start date to today without touching total RP!
    const todayStr = getTodayDateStr();
    setCleanStartDate(todayStr);

    // 2. Add special Comeback Moment
    const newMoment = { date: new Date().toISOString(), actionTaken };
    const updatedMoments = [newMoment, ...comebackMoments];
    setComebackMoments(updatedMoments);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'comebacks', JSON.stringify(updatedMoments));

    // 3. Award Comeback Points! (+3 RP for completing after-slip protocol)
    addRP(3, 'ثبت پروتکل بازگشت (COMEBACK)', 'Completed After-Slip protocol (COMEBACK)', 'comeback_badge');

    // 4. Save to After-Slip history
    const savedLogs = localStorage.getItem(STORAGE_KEY_PREFIX + 'after_slip_logs');
    const logs: AfterSlipRecord[] = savedLogs ? JSON.parse(savedLogs) : [];
    const newRecord: AfterSlipRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      medicalFlagsChecked: true,
      safeActionChosen: actionTaken,
      timeline: timelineData,
      createdAt: new Date().toISOString(),
    };
    logs.unshift(newRecord);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'after_slip_logs', JSON.stringify(logs.slice(0, 30)));
  };

  // 5. Contacts
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'contacts');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
  });

  const updateContact = (id: string, name: string, phone: string, customLabel?: string) => {
    setContacts(prev => {
      const updated = prev.map(c => (c.id === id ? { ...c, name, phone, customLabel: customLabel || c.customLabel } : c));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'contacts', JSON.stringify(updated));
      return updated;
    });
  };

  const addCustomContact = (name: string, phone: string, label: string) => {
    setContacts(prev => {
      const newContact: EmergencyContact = {
        id: 'contact_' + Date.now(),
        type: 'custom',
        name,
        phone,
        customLabel: label,
      };
      const updated = [...prev, newContact];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'contacts', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteContact = (id: string) => {
    setContacts(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'contacts', JSON.stringify(updated));
      return updated;
    });
  };

  // 6. Check-ins
  const [morningCheckIns, setMorningCheckIns] = useState<MorningCheckIn[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'morning_checkins');
    return saved ? JSON.parse(saved) : [];
  });

  const [eveningCheckIns, setEveningCheckIns] = useState<EveningCheckIn[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'evening_checkins');
    return saved ? JSON.parse(saved) : [];
  });

  const todayStr = getTodayDateStr();
  const todayMorningCheckIn = morningCheckIns.find(c => c.date === todayStr) || null;
  const todayEveningCheckIn = eveningCheckIns.find(c => c.date === todayStr) || null;

  const saveMorningCheckIn = (checkIn: Omit<MorningCheckIn, 'date' | 'completedAt'>) => {
    const fullCheckIn: MorningCheckIn = {
      ...checkIn,
      date: todayStr,
      completedAt: new Date().toISOString(),
    };
    setMorningCheckIns(prev => {
      const filtered = prev.filter(c => c.date !== todayStr);
      const updated = [fullCheckIn, ...filtered];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'morning_checkins', JSON.stringify(updated.slice(0, 90)));
      return updated;
    });
    addRP(1, 'ثبت چک‌این صبح', 'Morning Check-in logged', 'checkin');
  };

  const saveEveningCheckIn = (checkIn: Omit<EveningCheckIn, 'date' | 'completedAt'>) => {
    const fullCheckIn: EveningCheckIn = {
      ...checkIn,
      date: todayStr,
      completedAt: new Date().toISOString(),
    };
    setEveningCheckIns(prev => {
      const filtered = prev.filter(c => c.date !== todayStr);
      const updated = [fullCheckIn, ...filtered];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'evening_checkins', JSON.stringify(updated.slice(0, 90)));
      return updated;
    });
    addRP(1, 'ثبت چک‌این شب', 'Evening Check-in logged', 'checkin');
    if (checkIn.wentMeeting === 'yes') {
      addRP(2, 'حضور در جلسه بهبودی', 'Attended recovery meeting', 'meeting');
    }
    if (checkIn.calledSponsor) {
      addRP(3, 'تماس با راهنما', 'Called sponsor', 'sponsor');
    }
    if (checkIn.wroteStep) {
      addRP(2, 'نوشتن قدم NA', 'Wrote on NA step', 'step');
    }
    if (checkIn.didService) {
      addRP(2, 'انجام خدمت', 'Did recovery service', 'service');
    }
  };

  // 7. 90 in 90 meetings
  const [meetings90, setMeetings90] = useState<MeetingSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'meetings90');
    return saved ? JSON.parse(saved) : [];
  });

  const logMeeting = (meeting: Omit<MeetingSession, 'sessionNumber' | 'completedAt'>) => {
    setMeetings90(prev => {
      const nextNum = prev.length + 1;
      const newSession: MeetingSession = {
        ...meeting,
        sessionNumber: nextNum,
        completedAt: new Date().toISOString(),
      };
      const updated = [newSession, ...prev];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'meetings90', JSON.stringify(updated));
      return updated;
    });
    addRP(2, `ثبت جلسه ${meetings90.length + 1} از ۹۰`, `Logged meeting ${meetings90.length + 1} of 90`, 'meeting');
  };

  // 8. If–Then Plans (Max 2 active)
  const [ifThenPlans, setIfThenPlans] = useState<IfThenPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'ifthen');
    return saved ? JSON.parse(saved) : [
      {
        id: 'default_plan_1',
        ifTrigger: 'با کسی دعوا کردم و خواستم از خانه بیرون بزنم',
        thenAction: 'قبل از هر تصمیمی ۱۰ دقیقه صبر می‌کنم، با راهنما تماس می‌گیرم و به جای تنها ماندن پیش یک آدم امن می‌روم',
        active: true,
        createdAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
      }
    ];
  });

  const addIfThenPlan = (ifTrigger: string, thenAction: string): boolean => {
    const activeCount = ifThenPlans.filter(p => p.active).length;
    if (activeCount >= 2) {
      return false;
    }
    const newPlan: IfThenPlan = {
      id: 'plan_' + Date.now(),
      ifTrigger,
      thenAction,
      active: true,
      createdAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
    };
    const updated = [newPlan, ...ifThenPlans];
    setIfThenPlans(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'ifthen', JSON.stringify(updated));
    addRP(2, 'ساخت برنامه «اگر... آنگاه...»', 'Created If–Then plan', 'if_then');
    return true;
  };

  const deleteIfThenPlan = (id: string) => {
    setIfThenPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'ifthen', JSON.stringify(updated));
      return updated;
    });
  };

  const reviewIfThenPlan = (id: string) => {
    setIfThenPlans(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, reviewedAt: new Date().toISOString() } : p));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'ifthen', JSON.stringify(updated));
      return updated;
    });
  };

  // 9. Quick Notes & Sanctuary
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'quick_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const addQuickNote = (text: string, category: QuickNote['category']) => {
    const newNote: QuickNote = {
      id: 'note_' + Date.now(),
      text,
      category,
      createdAt: new Date().toISOString(),
    };
    setQuickNotes(prev => {
      const updated = [newNote, ...prev];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'quick_notes', JSON.stringify(updated.slice(0, 50)));
      return updated;
    });
  };

  const deleteQuickNote = (id: string) => {
    setQuickNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'quick_notes', JSON.stringify(updated));
      return updated;
    });
  };

  const [sanctuaryEntries, setSanctuaryEntries] = useState<SanctuaryEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'sanctuary');
    return saved ? JSON.parse(saved) : [];
  });

  const addSanctuaryEntry = (entry: Omit<SanctuaryEntry, 'id' | 'createdAt'>) => {
    const newEntry: SanctuaryEntry = {
      ...entry,
      id: 'sanctuary_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSanctuaryEntries(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'sanctuary', JSON.stringify(updated.slice(0, 50)));
      return updated;
    });
    addRP(1, 'ثبت تأمل در خلوتگاه', 'Logged sanctuary reflection', 'checkin');
  };

  // 10. Recovery Capital
  const [recoveryPillars, setRecoveryPillars] = useState<RecoveryCapitalPillar[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'recovery_pillars');
    return saved ? JSON.parse(saved) : DEFAULT_RECOVERY_PILLARS;
  });

  const updatePillar = (id: string, score: number, note: string) => {
    setRecoveryPillars(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, score, note, lastUpdated: new Date().toISOString() } : p));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'recovery_pillars', JSON.stringify(updated));
      return updated;
    });
  };

  // 11. Milestones
  const [milestoneNotes, setMilestoneNotes] = useState<MilestoneNote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'milestones');
    return saved ? JSON.parse(saved) : [];
  });

  const saveMilestoneNote = (milestoneKey: string, noteToDay1Self: string) => {
    setMilestoneNotes(prev => {
      const filtered = prev.filter(m => m.milestoneKey !== milestoneKey);
      const updated = [{ milestoneKey, unlockedAt: new Date().toISOString(), noteToDay1Self }, ...filtered];
      localStorage.setItem(STORAGE_KEY_PREFIX + 'milestones', JSON.stringify(updated));
      return updated;
    });
  };

  // 12. Rewards
  const [rewards, setRewards] = useState<RewardItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'rewards');
    return saved ? JSON.parse(saved) : DEFAULT_REWARDS;
  });

  const claimReward = (id: string): boolean => {
    const reward = rewards.find(r => r.id === id);
    if (!reward || reward.claimed) return false;
    if (totalRP < reward.requiredRP) return false;

    setRewards(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, claimed: true, claimedAt: new Date().toISOString() } : r));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'rewards', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  // 13. Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'settings');
    return saved
      ? JSON.parse(saved)
      : {
          notificationsEnabled: true,
          aiAssistanceEnabled: true,
          localOnlyPrivacy: true,
        };
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEY_PREFIX + 'settings', JSON.stringify(updated));
      return updated;
    });
  };

  // 14. Data Backup / Restore / Clear
  const exportData = (): string => {
    const allData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      cleanStartDate,
      longestDays,
      totalRP,
      returnEvents,
      comebackMoments,
      contacts,
      morningCheckIns,
      eveningCheckIns,
      meetings90,
      ifThenPlans,
      quickNotes,
      sanctuaryEntries,
      recoveryPillars,
      milestoneNotes,
      rewards,
      settings,
    };
    return JSON.stringify(allData, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.cleanStartDate) setCleanStartDate(parsed.cleanStartDate);
      if (parsed.totalRP !== undefined) setTotalRP(parsed.totalRP);
      if (parsed.returnEvents) setReturnEvents(parsed.returnEvents);
      if (parsed.comebackMoments) setComebackMoments(parsed.comebackMoments);
      if (parsed.contacts) setContacts(parsed.contacts);
      if (parsed.morningCheckIns) setMorningCheckIns(parsed.morningCheckIns);
      if (parsed.eveningCheckIns) setEveningCheckIns(parsed.eveningCheckIns);
      if (parsed.meetings90) setMeetings90(parsed.meetings90);
      if (parsed.ifThenPlans) setIfThenPlans(parsed.ifThenPlans);
      if (parsed.quickNotes) setQuickNotes(parsed.quickNotes);
      if (parsed.sanctuaryEntries) setSanctuaryEntries(parsed.sanctuaryEntries);
      if (parsed.recoveryPillars) setRecoveryPillars(parsed.recoveryPillars);
      if (parsed.milestoneNotes) setMilestoneNotes(parsed.milestoneNotes);
      if (parsed.rewards) setRewards(parsed.rewards);
      return true;
    } catch {
      return false;
    }
  };

  const clearAllData = () => {
    localStorage.clear();
    window.location.reload();
  };

  // 15. Navigation & UI modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalExtraData, setModalExtraData] = useState<any>(null);

  const openModal = (modalName: string, extraData?: any) => {
    setActiveModal(modalName);
    setModalExtraData(extraData || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalExtraData(null);
  };

  // 16. Universal Help "ⓘ"
  const [activeHelpSection, setActiveHelpSection] = useState<string | null>(null);

  const openHelp = (sectionKey: string) => {
    setActiveHelpSection(sectionKey);
  };

  const closeHelp = () => {
    setActiveHelpSection(null);
  };

  // 17. Complete onboarding
  const completeOnboarding = (daysClean: number, langChoice: Language) => {
    setLang(langChoice);
    const d = new Date();
    d.setDate(d.getDate() - daysClean);
    setCleanStartDate(d.toISOString().split('T')[0]);
    setIsOnboarded(true);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'onboarded', 'true');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        cleanStartDate,
        setCleanStartDate,
        cleanDays,
        longestDays,
        totalRP,
        addRP,
        returnEvents,
        comebackMoments,
        recordSlipAndComeback,
        contacts,
        updateContact,
        addCustomContact,
        deleteContact,
        todayMorningCheckIn,
        saveMorningCheckIn,
        todayEveningCheckIn,
        saveEveningCheckIn,
        meetings90,
        logMeeting,
        ifThenPlans,
        addIfThenPlan,
        deleteIfThenPlan,
        reviewIfThenPlan,
        quickNotes,
        addQuickNote,
        deleteQuickNote,
        sanctuaryEntries,
        addSanctuaryEntry,
        recoveryPillars,
        updatePillar,
        milestoneNotes,
        saveMilestoneNote,
        rewards,
        claimReward,
        settings,
        updateSettings,
        exportData,
        importData,
        clearAllData,
        activeTab,
        setActiveTab,
        activeModal,
        openModal,
        closeModal,
        modalExtraData,
        activeHelpSection,
        openHelp,
        closeHelp,
        isOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
