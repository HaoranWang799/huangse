import type { GeneratedScenario } from './scenarioSession';

export type SubscriptionPlan = 'free' | 'plus' | 'premium';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface PrivacySettings {
  profileVisible: boolean;
  analyticsEnabled: boolean;
  personalizedRecommendation: boolean;
  allowEmailNotification: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  holderName: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
  createdAt: string;
}

export interface StoredScenario {
  id: string;
  createdAt: string;
  favorite: boolean;
  downloaded: boolean;
  playCount: number;
  scenario: GeneratedScenario;
}

export interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  streakDays: number;
}

export interface AppData {
  profile: UserProfile;
  privacy: PrivacySettings;
  subscription: {
    plan: SubscriptionPlan;
    generatedThisMonth: number;
    diamonds: number;
  };
  paymentMethods: PaymentMethod[];
  scenarios: StoredScenario[];
  stats: SessionStats;
}

export interface PlanLimits {
  maxGenerations: number | null;
  maxDuration: number;
  allowPremiumVoices: boolean;
}

export interface GenerationCheckResult {
  ok: boolean;
  message?: string;
}

const STORAGE_KEY = 'app-data-v1';

const defaultData: AppData = {
  profile: {
    name: 'Alex Rivera',
    email: 'alex@email.com',
    avatar: 'A',
  },
  privacy: {
    profileVisible: true,
    analyticsEnabled: true,
    personalizedRecommendation: true,
    allowEmailNotification: true,
  },
  subscription: {
    plan: 'free',
    generatedThisMonth: 0,
    diamonds: 0,
  },
  paymentMethods: [],
  scenarios: [],
  stats: {
    totalSessions: 0,
    totalMinutes: 0,
    streakDays: 1,
  },
};

function safeLocalStorageGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);
}

function safeLocalStorageSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
}

export function loadAppData(): AppData {
  const raw = safeLocalStorageGet(STORAGE_KEY);
  if (!raw) return defaultData;

  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      ...defaultData,
      ...parsed,
      profile: {
        ...defaultData.profile,
        ...(parsed.profile || {}),
      },
      privacy: {
        ...defaultData.privacy,
        ...(parsed.privacy || {}),
      },
      subscription: {
        ...defaultData.subscription,
        ...(parsed.subscription || {}),
      },
      paymentMethods: Array.isArray(parsed.paymentMethods) ? parsed.paymentMethods : [],
      scenarios: Array.isArray(parsed.scenarios) ? parsed.scenarios : [],
      stats: {
        ...defaultData.stats,
        ...(parsed.stats || {}),
      },
    };
  } catch {
    return defaultData;
  }
}

export function saveAppData(data: AppData): void {
  safeLocalStorageSet(STORAGE_KEY, JSON.stringify(data));
}

export function getPlanLimits(plan: SubscriptionPlan): PlanLimits {
  switch (plan) {
    case 'plus':
      return {
        maxGenerations: 30,
        maxDuration: 15,
        allowPremiumVoices: true,
      };
    case 'premium':
      return {
        maxGenerations: null,
        maxDuration: 30,
        allowPremiumVoices: true,
      };
    case 'free':
    default:
      return {
        maxGenerations: 3,
        maxDuration: 10,
        allowPremiumVoices: false,
      };
  }
}

export function getRemainingGenerations(data: AppData): number | null {
  const limits = getPlanLimits(data.subscription.plan);
  if (limits.maxGenerations === null) return null;
  return Math.max(0, limits.maxGenerations - data.subscription.generatedThisMonth);
}

export function canGenerateScenario(data: AppData, duration: number, isPremiumVoice: boolean): GenerationCheckResult {
  const limits = getPlanLimits(data.subscription.plan);

  if (isPremiumVoice && !limits.allowPremiumVoices) {
    return {
      ok: false,
      message: '当前套餐不支持高级语音，请升级后重试。',
    };
  }

  if (duration > limits.maxDuration) {
    return {
      ok: false,
      message: `当前套餐最长支持 ${limits.maxDuration} 分钟。`,
    };
  }

  const remaining = getRemainingGenerations(data);
  if (remaining !== null && remaining <= 0) {
    return {
      ok: false,
      message: '本月生成次数已用完，请升级套餐或下月再试。',
    };
  }

  return { ok: true };
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createScenarioRecord(scenario: GeneratedScenario): StoredScenario {
  const id = createId('scn');
  return {
    id,
    createdAt: new Date().toISOString(),
    favorite: false,
    downloaded: false,
    playCount: 0,
    scenario: {
      ...scenario,
      id,
    },
  };
}

export function addScenarioToLibrary(scenario: GeneratedScenario): StoredScenario {
  const data = loadAppData();
  const record = createScenarioRecord(scenario);
  data.scenarios = [record, ...data.scenarios];
  data.subscription.generatedThisMonth += 1;
  saveAppData(data);
  return record;
}

export function updateScenarioFlags(id: string, patch: Partial<Pick<StoredScenario, 'favorite' | 'downloaded'>>): StoredScenario | null {
  const data = loadAppData();
  const index = data.scenarios.findIndex((item) => item.id === id);
  if (index < 0) return null;

  const updated: StoredScenario = {
    ...data.scenarios[index],
    ...patch,
  };
  data.scenarios[index] = updated;
  saveAppData(data);
  return updated;
}

export function incrementScenarioPlay(id: string): void {
  const data = loadAppData();
  const target = data.scenarios.find((item) => item.id === id);
  if (!target) return;
  target.playCount += 1;
  data.stats.totalSessions += 1;
  data.stats.totalMinutes += target.scenario.durationMinutes;
  saveAppData(data);
}

export function updateProfile(patch: Partial<UserProfile>): UserProfile {
  const data = loadAppData();
  data.profile = {
    ...data.profile,
    ...patch,
  };
  if (!data.profile.avatar) {
    data.profile.avatar = (data.profile.name?.[0] || 'U').toUpperCase();
  }
  saveAppData(data);
  return data.profile;
}

export function updatePrivacy(patch: Partial<PrivacySettings>): PrivacySettings {
  const data = loadAppData();
  data.privacy = {
    ...data.privacy,
    ...patch,
  };
  saveAppData(data);
  return data.privacy;
}

export function setSubscriptionPlan(plan: SubscriptionPlan): AppData['subscription'] {
  const data = loadAppData();
  data.subscription.plan = plan;
  saveAppData(data);
  return data.subscription;
}

export function addPaymentMethod(input: Omit<PaymentMethod, 'id' | 'createdAt' | 'isDefault'> & { isDefault?: boolean }): PaymentMethod {
  const data = loadAppData();
  const shouldSetDefault = input.isDefault || data.paymentMethods.length === 0;

  if (shouldSetDefault) {
    data.paymentMethods = data.paymentMethods.map((item) => ({
      ...item,
      isDefault: false,
    }));
  }

  const method: PaymentMethod = {
    id: createId('pay'),
    createdAt: new Date().toISOString(),
    isDefault: Boolean(shouldSetDefault),
    brand: input.brand,
    holderName: input.holderName,
    last4: input.last4,
    expiry: input.expiry,
  };

  data.paymentMethods = [method, ...data.paymentMethods];
  saveAppData(data);
  return method;
}

export function removePaymentMethod(id: string): void {
  const data = loadAppData();
  const removed = data.paymentMethods.find((item) => item.id === id);
  data.paymentMethods = data.paymentMethods.filter((item) => item.id !== id);

  if (removed?.isDefault && data.paymentMethods.length > 0) {
    data.paymentMethods[0].isDefault = true;
  }

  saveAppData(data);
}

export function setDefaultPaymentMethod(id: string): void {
  const data = loadAppData();
  data.paymentMethods = data.paymentMethods.map((item) => ({
    ...item,
    isDefault: item.id === id,
  }));
  saveAppData(data);
}

export function addDiamonds(amount: number): number {
  const data = loadAppData();
  data.subscription.diamonds += amount;
  saveAppData(data);
  return data.subscription.diamonds;
}
