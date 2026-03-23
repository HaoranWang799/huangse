export interface GeneratedScenario {
  id?: string;
  title: string;
  subtitle: string;
  coverImage: string;
  tags: string[];
  voiceId: string;
  voice: string;
  durationMinutes: number;
  durationLabel: string;
  mode: string;
  hardwareSupport: boolean;
  description: string;
  intensity: string;
  rhythmPattern: string;
  prompt: string;
  fullNarration: string;
  phaseLines: Record<string, string>;
  speakingLead: string;
}

const STORAGE_KEY = 'generated-scenario';

export function saveGeneratedScenario(scenario: GeneratedScenario) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scenario));
}

export function loadGeneratedScenario(): GeneratedScenario | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as GeneratedScenario;
  } catch {
    return null;
  }
}
