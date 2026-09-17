export type Language = 'fa' | 'en';

export type ContactType = 'sponsor' | 'spouse' | 'family' | 'custom';

export interface EmergencyContact {
  id: string;
  type: ContactType;
  name: string;
  phone: string;
  customLabel?: string;
}

export type MoodType = 'good' | 'normal' | 'hard';
export type SleepType = 'good' | 'normal' | 'poor';

export interface MorningCheckIn {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  sleep: SleepType;
  hardFactor: string;
  priorities: string[]; // exactly up to 3 items
  completedAt: string;
}

export interface EveningCheckIn {
  date: string; // YYYY-MM-DD
  wentMeeting: 'yes' | 'no' | 'no_meeting';
  calledSponsor: boolean;
  wroteStep: boolean;
  didService: boolean;
  helperNote: string;
  tomorrowOneStep: string;
  completedAt: string;
}

export interface MeetingSession {
  sessionNumber: number; // 1 to 90
  date: string;
  name?: string;
  type: 'in-person' | 'online';
  takeaway: string;
  spokeWithSomeone: boolean;
  completedAt: string;
}

export interface IfThenPlan {
  id: string;
  ifTrigger: string;
  thenAction: string;
  active: boolean;
  createdAt: string;
  reviewedAt: string;
}

export type QuickNoteCategory = 'today' | 'later' | 'idea';

export interface QuickNote {
  id: string;
  text: string;
  category: QuickNoteCategory;
  createdAt: string;
}

export interface SanctuaryEntry {
  id: string;
  date: string;
  whatHappened: string;
  whatBothered: string;
  whatBroughtJoy: string;
  whatLearned: string;
  tomorrowWish: string;
  audioDurationSeconds?: number;
  audioBlobUrl?: string;
  createdAt: string;
}

export interface RecoveryCapitalPillar {
  id: string;
  titleKey: string; // 'self' | 'family' | 'people' | 'work' | 'money' | 'home' | 'skill' | 'meaning'
  score: number; // 1 to 5
  note: string;
  lastUpdated: string;
}

export interface AfterSlipTimeline {
  where: string;
  withWhom: string;
  whatHappened: string;
  whatFelt: string;
  whatThought: string;
  firstPivotPoint: string;
  whatHelpedReturn: string;
}

export interface AfterSlipRecord {
  id: string;
  date: string;
  medicalFlagsChecked: boolean;
  safeActionChosen: string;
  timeline?: AfterSlipTimeline;
  createdAt: string;
}

export interface CravingRecord {
  id: string;
  date: string;
  initialIntensity: number; // 0-10
  category: 'body' | 'mind' | 'people';
  actionDetail: string;
  finalIntensity: number; // 0-10
  createdAt: string;
}

export type ReturnEventType = 
  | 'checkin'
  | 'craving'
  | 'sponsor'
  | 'meeting'
  | 'step'
  | 'service'
  | 'safe_person'
  | 'after_slip'
  | 'if_then'
  | 'therapist'
  | 'comeback_badge';

export interface ReturnEvent {
  id: string;
  date: string;
  titleFa: string;
  titleEn: string;
  points: number;
  type: ReturnEventType;
}

export interface MilestoneNote {
  milestoneKey: string; // e.g. '30days', '90days', '1year'
  unlockedAt: string;
  noteToDay1Self: string;
}

export interface RewardItem {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  category: 'coffee' | 'walk' | 'reading' | 'call' | 'recharge' | 'ticket' | 'inner';
  requiredRP: number;
  claimed: boolean;
  claimedAt?: string;
}

export interface AppSettings {
  notificationsEnabled: boolean;
  aiAssistanceEnabled: boolean;
  localOnlyPrivacy: boolean;
}

export type ActiveTab = 'today' | 'return' | 'journey' | 'journal' | 'more';
