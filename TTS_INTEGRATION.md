# TTS 集成说明

## 目标

当前前端已经默认优先调用真实 TTS 服务，只有在服务不可用时才回退到浏览器 `speechSynthesis`。

要达到更逼真、更拟人的效果，建议始终让前端命中一个你自己的 TTS 代理服务，再由代理服务去连接任意语音供应商。

这样做有 4 个好处：

1. 前端协议稳定，不被某一家供应商绑死
2. API Key 不暴露在浏览器
3. 可以统一做风格提示、限流、鉴权、日志
4. 后续换供应商时只改代理层

## 前端环境变量

在项目根目录创建 `.env.local`：

```bash
VITE_TTS_ENDPOINT=http://localhost:8787/tts
VITE_TTS_API_KEY=
VITE_TTS_MODEL=eleven_turbo_v2_5
VITE_TTS_PROVIDER=elevenlabs
```

说明：

- `VITE_TTS_ENDPOINT`: 你的后端代理地址
- `VITE_TTS_API_KEY`: 如果你的代理需要额外鉴权，可以在这里填
- `VITE_TTS_MODEL`: 默认模型名
- `VITE_TTS_PROVIDER`: 默认供应商标识

## 前端请求协议

前端会向 `VITE_TTS_ENDPOINT` 发送 `POST` 请求：

```json
{
  "text": "要朗读的文本",
  "voiceId": "soft",
  "title": "月光对话",
  "model": "neural-premium",
  "provider": "custom",
  "format": "mp3",
  "speakingRate": 0.9,
  "pitch": 0.05,
  "stylePrompt": "真实、细腻、贴耳、呼吸感明显、停顿自然、像真人轻声说话"
}
```

## 后端响应协议

代理服务返回任一形式都可以：

### 方式 1：直接返回音频流

`Content-Type` 为 `audio/mpeg`、`audio/wav` 等。

### 方式 2：返回 JSON

```json
{
  "audioUrl": "https://example.com/audio/123.mp3"
}
```

或：

```json
{
  "audioBase64": "BASE64_AUDIO",
  "mimeType": "audio/mpeg"
}
```

## 推荐架构

```text
React 前端
  -> 你自己的 /tts 代理
    -> 供应商 A / 供应商 B / 自研模型
```

## 推荐主方案：ElevenLabs

如果你的主语言是英文，并且目标是“最自然、最像真人、最有情绪感”，推荐把 ElevenLabs 作为主供应商。

原因：

1. 英文语音表现强
2. 情绪感和角色感更明显
3. 适合沉浸陪伴、低语、叙事、角色台词
4. 接口简单，落地快

参考：

- ElevenLabs TTS 能力: https://elevenlabs.io/docs/capabilities/text-to-speech
- Create speech API: https://elevenlabs.io/docs/api-reference/text-to-speech/
- Models: https://elevenlabs.io/docs/models/
- Premade voices: https://elevenlabs.io/docs/product/voices/default-voices

## ElevenLabs 代理环境变量

本仓库示例代理已经支持 ElevenLabs。

创建后端环境变量：

```bash
TTS_PORT=8787
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=your_key
ELEVENLABS_MODEL_ID=eleven_turbo_v2_5
ELEVENLABS_OUTPUT_FORMAT=mp3_44100_128
ELEVENLABS_VOICE_SOFT=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_VOICE_MATURE=TxGEqnHWrfWFTfGW9XjX
ELEVENLABS_VOICE_PLAYFUL=pNInz6obpgDQGcFmaJgB
ELEVENLABS_VOICE_CONFIDENT=onwK4e9ZLuTAKqWW03F9
```

说明：

- 这些 voice id 使用 ElevenLabs 常见英文预制声音，后续你可以替换成你试听后更满意的声音
- 推荐默认模型：`eleven_turbo_v2_5`
- 如果你更看重绝对音质，可以改成：`eleven_multilingual_v2`

## ElevenLabs 请求流程

代理服务会请求：

```text
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

并传入：

- `text`
- `model_id`
- `output_format`
- `voice_settings`

## ElevenLabs 英文陪伴语气策略

本项目默认会根据角色类型附带不同的 voice settings，例如：

1. `soft`
   更温柔，更稳定，更适合贴耳陪伴
2. `mature`
   更沉稳，更低压，更像成熟叙述
3. `playful`
   更灵动，更轻快
4. `confident`
   更清晰，更靠前，更有掌控感

这些参数都在代理层统一控制，前端无需知道供应商细节。

## Azure 仍可作为备用方案

如果你后续有企业部署、地区合规或成本方面考虑，Azure 仍然是很好的备用方案。

当前仓库中：

- `elevenlabs` 是主推荐
- `azure` 仍保留可扩展空间

## 推荐的真人级优化方向

如果你要“最逼真最拟人”，供应商要尽量支持这些能力：

1. 情绪或风格控制
2. 语速与停顿控制
3. 多说话人或角色声线
4. 高采样率输出
5. 流式返回或低延迟合成
6. SSML 或同类标记能力

## 本仓库已提供的示例

目录：

```text
examples/tts-server/server.mjs
```

它是一个通用代理样例，当前支持：

1. `mock` 模式：方便本地联调
2. `elevenlabs` 模式：对接 ElevenLabs
3. `azure` 模式：可扩展备用
4. `custom` 模式：对接你自己的供应商 HTTP API

## 启动本地代理示例

```bash
node examples/tts-server/server.mjs
```

默认监听：

```text
http://localhost:8787/tts
```

## 示例代理环境变量

```bash
TTS_PORT=8787
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=
ELEVENLABS_MODEL_ID=eleven_turbo_v2_5
ELEVENLABS_OUTPUT_FORMAT=mp3_44100_128
ELEVENLABS_VOICE_SOFT=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_VOICE_MATURE=TxGEqnHWrfWFTfGW9XjX
ELEVENLABS_VOICE_PLAYFUL=pNInz6obpgDQGcFmaJgB
ELEVENLABS_VOICE_CONFIDENT=onwK4e9ZLuTAKqWW03F9
```

## 切换到真实供应商

当你拿到供应商文档后，只需要做两件事：

1. 把 `TTS_PROVIDER=custom`
2. 在 `examples/tts-server/server.mjs` 的 `callCustomProvider` 中，按供应商要求改请求体和返回解析

前端无需再改页面代码。
