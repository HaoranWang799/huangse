export interface TtsRequest {
  text: string;
  voiceId?: string;
  title?: string;
  model?: string;
  format?: 'mp3' | 'wav' | 'opus';
  speakingRate?: number;
  pitch?: number;
  stylePrompt?: string;
  provider?: string;
}

interface TtsJsonResponse {
  audioUrl?: string;
  audioBase64?: string;
  mimeType?: string;
}

const TTS_ENDPOINT = import.meta.env.VITE_TTS_ENDPOINT as string | undefined;
const TTS_API_KEY = import.meta.env.VITE_TTS_API_KEY as string | undefined;
const TTS_MODEL = import.meta.env.VITE_TTS_MODEL as string | undefined;
const TTS_PROVIDER = import.meta.env.VITE_TTS_PROVIDER as string | undefined;

export async function requestRealTtsAudio(request: TtsRequest): Promise<string | null> {
  if (!TTS_ENDPOINT) {
    return null;
  }

  const response = await fetch(TTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(TTS_API_KEY ? { Authorization: `Bearer ${TTS_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      text: request.text,
      voiceId: request.voiceId,
      title: request.title,
      model: request.model || TTS_MODEL || 'eleven_turbo_v2_5',
      provider: request.provider || TTS_PROVIDER || 'elevenlabs',
      format: request.format || 'mp3',
      speakingRate: request.speakingRate,
      pitch: request.pitch,
      stylePrompt: request.stylePrompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS request failed: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.startsWith('audio/')) {
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  }

  const json = (await response.json()) as TtsJsonResponse;

  if (json.audioUrl) {
    return json.audioUrl;
  }

  if (json.audioBase64) {
    const mimeType = json.mimeType || 'audio/mpeg';
    return `data:${mimeType};base64,${json.audioBase64}`;
  }

  return null;
}

export function hasRealTtsConfigured() {
  return Boolean(TTS_ENDPOINT);
}
