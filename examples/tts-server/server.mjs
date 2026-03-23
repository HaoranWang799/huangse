import { createServer } from 'node:http';

const PORT = Number(process.env.TTS_PORT || 8787);
const PROVIDER = process.env.TTS_PROVIDER || 'mock';
const PROVIDER_ENDPOINT = process.env.TTS_PROVIDER_ENDPOINT || '';
const PROVIDER_API_KEY = process.env.TTS_PROVIDER_API_KEY || '';
const PROVIDER_MODEL = process.env.TTS_PROVIDER_MODEL || 'neural-premium';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
const ELEVENLABS_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_turbo_v2_5';
const ELEVENLABS_OUTPUT_FORMAT = process.env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128';
const ELEVENLABS_VOICE_SOFT = process.env.ELEVENLABS_VOICE_SOFT || 'EXAVITQu4vr4xnSDxMaL';
const ELEVENLABS_VOICE_MATURE = process.env.ELEVENLABS_VOICE_MATURE || 'TxGEqnHWrfWFTfGW9XjX';
const ELEVENLABS_VOICE_PLAYFUL = process.env.ELEVENLABS_VOICE_PLAYFUL || 'pNInz6obpgDQGcFmaJgB';
const ELEVENLABS_VOICE_CONFIDENT = process.env.ELEVENLABS_VOICE_CONFIDENT || 'onwK4e9ZLuTAKqWW03F9';
const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY || '';
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || '';
const AZURE_SPEECH_VOICE = process.env.AZURE_SPEECH_VOICE || 'zh-CN-Xiaoxiao:DragonHDFlashLatestNeural';
const AZURE_SPEECH_OUTPUT_FORMAT = process.env.AZURE_SPEECH_OUTPUT_FORMAT || 'audio-24khz-96kbitrate-mono-mp3';

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
}

function audio(res, statusCode, buffer, contentType = 'audio/mpeg') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Content-Length': buffer.length,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(buffer);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw);
}

function buildMockPayload(requestBody) {
  return {
    ok: true,
    provider: 'mock',
    message: 'Mock 模式不会生成真实语音，请配置真实供应商接口。',
    echo: {
      textLength: String(requestBody.text || '').length,
      voiceId: requestBody.voiceId || 'soft',
      model: requestBody.model || PROVIDER_MODEL,
    },
  };
}

async function callCustomProvider(requestBody) {
  if (!PROVIDER_ENDPOINT) {
    throw new Error('TTS_PROVIDER_ENDPOINT is required when TTS_PROVIDER=custom');
  }

  const response = await fetch(PROVIDER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(PROVIDER_API_KEY ? { Authorization: `Bearer ${PROVIDER_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      text: requestBody.text,
      voiceId: requestBody.voiceId,
      title: requestBody.title,
      model: requestBody.model || PROVIDER_MODEL,
      format: requestBody.format || 'mp3',
      speakingRate: requestBody.speakingRate,
      pitch: requestBody.pitch,
      stylePrompt: requestBody.stylePrompt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Provider request failed: ${response.status} ${text}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.startsWith('audio/')) {
    const arrayBuffer = await response.arrayBuffer();
    return {
      type: 'audio',
      contentType,
      buffer: Buffer.from(arrayBuffer),
    };
  }

  const data = await response.json();
  return {
    type: 'json',
    payload: data,
  };
}

function getElevenLabsVoiceConfig(voiceId) {
  const map = {
    soft: {
      voiceId: ELEVENLABS_VOICE_SOFT,
      settings: {
        stability: 0.68,
        similarity_boost: 0.82,
        style: 0.2,
        speed: 0.92,
        use_speaker_boost: true,
      },
    },
    mature: {
      voiceId: ELEVENLABS_VOICE_MATURE,
      settings: {
        stability: 0.74,
        similarity_boost: 0.84,
        style: 0.16,
        speed: 0.9,
        use_speaker_boost: true,
      },
    },
    playful: {
      voiceId: ELEVENLABS_VOICE_PLAYFUL,
      settings: {
        stability: 0.6,
        similarity_boost: 0.78,
        style: 0.32,
        speed: 0.98,
        use_speaker_boost: true,
      },
    },
    confident: {
      voiceId: ELEVENLABS_VOICE_CONFIDENT,
      settings: {
        stability: 0.7,
        similarity_boost: 0.83,
        style: 0.24,
        speed: 0.94,
        use_speaker_boost: true,
      },
    },
  };

  return map[voiceId] || map.soft;
}

async function callElevenLabsProvider(requestBody) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is required when TTS_PROVIDER=elevenlabs');
  }

  const config = getElevenLabsVoiceConfig(requestBody.voiceId);
  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY,
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: requestBody.text,
      model_id: requestBody.model || ELEVENLABS_MODEL_ID,
      output_format: requestBody.format || ELEVENLABS_OUTPUT_FORMAT,
      language_code: 'en',
      voice_settings: config.settings,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`ElevenLabs TTS failed: ${response.status} ${text}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    type: 'audio',
    contentType: 'audio/mpeg',
    buffer: Buffer.from(arrayBuffer),
  };
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildAzureSsml(requestBody) {
  const voiceName = requestBody.voiceId === 'mature'
    ? 'zh-CN-Yunxiao:DragonHDFlashLatestNeural'
    : AZURE_SPEECH_VOICE;

  const rate = typeof requestBody.speakingRate === 'number'
    ? `${Math.round((requestBody.speakingRate - 1) * 100)}%`
    : '-8%';

  const pitch = typeof requestBody.pitch === 'number'
    ? `${Math.round(requestBody.pitch * 100)}Hz`
    : '-2Hz';

  const text = escapeXml(requestBody.text);

  return `
<speak version="1.0" xml:lang="zh-CN" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts">
  <voice name="${voiceName}">
    <mstts:express-as style="soft voice">
      <prosody rate="${rate}" pitch="${pitch}" volume="+0%">
        ${text}
      </prosody>
    </mstts:express-as>
  </voice>
</speak>`.trim();
}

async function callAzureProvider(requestBody) {
  if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
    throw new Error('AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are required when TTS_PROVIDER=azure');
  }

  const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const ssml = buildAzureSsml(requestBody);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': AZURE_SPEECH_OUTPUT_FORMAT,
      'User-Agent': 'immersive-companion-tts-proxy',
    },
    body: ssml,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Azure TTS failed: ${response.status} ${text}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    type: 'audio',
    contentType: 'audio/mpeg',
    buffer: Buffer.from(arrayBuffer),
  };
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  if (req.url !== '/tts' || req.method !== 'POST') {
    json(res, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = await readBody(req);

    if (!body.text || typeof body.text !== 'string') {
      json(res, 400, { error: 'Field "text" is required' });
      return;
    }

    if (PROVIDER === 'mock') {
      json(res, 200, buildMockPayload(body));
      return;
    }

    if (PROVIDER === 'elevenlabs') {
      const result = await callElevenLabsProvider(body);
      audio(res, 200, result.buffer, result.contentType);
      return;
    }

    if (PROVIDER === 'azure') {
      const result = await callAzureProvider(body);
      audio(res, 200, result.buffer, result.contentType);
      return;
    }

    if (PROVIDER === 'custom') {
      const result = await callCustomProvider(body);
      if (result.type === 'audio') {
        audio(res, 200, result.buffer, result.contentType);
        return;
      }

      json(res, 200, result.payload);
      return;
    }

    json(res, 400, { error: `Unsupported provider: ${PROVIDER}` });
  } catch (error) {
    json(res, 500, {
      error: 'TTS proxy failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(PORT, () => {
  console.log(`[tts-server] listening on http://localhost:${PORT}/tts`);
  console.log(`[tts-server] provider=${PROVIDER}`);
});
