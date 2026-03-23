import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { 
  X, Battery, Play, Pause, Settings2, Activity, Zap, Waves, MoveUpRight, FastForward
} from 'lucide-react';
import VoiceWave from '../components/VoiceWave';
import { BottomNav } from '../components/BottomNav';
import { loadGeneratedScenario, type GeneratedScenario } from '../utils/scenarioSession';
import { hasRealTtsConfigured, requestRealTtsAudio } from '../utils/ttsClient';

const getVoiceProfile = (voiceId?: string) => {
  const profiles: Record<string, {
    speakingRate: number;
    pitch: number;
    browserRate: number;
    browserPitch: number;
    stylePrompt: string;
  }> = {
    soft: {
      speakingRate: 0.9,
      pitch: 0.05,
      browserRate: 0.82,
      browserPitch: 1.08,
      stylePrompt: '真实、细腻、贴耳、呼吸感明显、停顿自然、像真人轻声说话',
    },
    mature: {
      speakingRate: 0.92,
      pitch: -0.08,
      browserRate: 0.86,
      browserPitch: 0.96,
      stylePrompt: '成熟、低沉、贴近耳边、自然呼吸、语速稳定、真人感强',
    },
    playful: {
      speakingRate: 0.98,
      pitch: 0.12,
      browserRate: 0.9,
      browserPitch: 1.12,
      stylePrompt: '自然、灵动、带轻微笑意、像真人陪伴聊天，不要机械',
    },
    confident: {
      speakingRate: 0.95,
      pitch: 0,
      browserRate: 0.88,
      browserPitch: 1.02,
      stylePrompt: '自信、稳定、贴耳低语、真实、情绪克制但有人味',
    },
  };

  return profiles[voiceId || 'soft'] || profiles.soft;
};

const speakText = (text: string, preferredVoiceId?: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API not supported in this browser');
    return;
  }

  try {
    // 停止之前的语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 设置中文语言
    utterance.lang = 'zh-CN';
    
    // 寻找高质量的中文女声
    const voices = window.speechSynthesis.getVoices();
    const chineseVoices = voices.filter(v => v.lang.includes('zh-CN') || v.lang.includes('zh'));
    
    const preferredVoiceMap: Record<string, string[]> = {
      soft: ['xiaoxiao', 'female', '女'],
      mature: ['yunxi', 'xiaoyi', 'male', '男'],
      playful: ['xiaomo', 'xiaoxuan', 'child'],
      confident: ['yunjian', 'xiaoqiu', 'female'],
    };

    const preferredKeywords = preferredVoiceMap[preferredVoiceId || 'soft'] || preferredVoiceMap.soft;

    const femaleVoice = chineseVoices.find(v => 
      preferredKeywords.some((keyword) => v.name.toLowerCase().includes(keyword.toLowerCase())) ||
      v.name.toLowerCase().includes('female') || 
      v.name.includes('女') ||
      v.name.includes('Woman')
    ) || chineseVoices[0];
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    const voiceProfile = getVoiceProfile(preferredVoiceId);
    
    // 浏览器语音天生会偏机械，这里只做保守优化
    utterance.rate = voiceProfile.browserRate;
    utterance.pitch = voiceProfile.browserPitch;
    utterance.volume = 0.95;
    
    // 添加事件监听
    utterance.onstart = () => console.log('语音开始:', text);
    utterance.onend = () => console.log('语音结束');
    utterance.onerror = (e) => console.warn('语音错误:', e);
    
    // 播放语音
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('语音播放出错:', error);
  }
};

// 阶段定义及对应光效颜色
const PHASES = [
  { id: 'preheat', name: '预热阶段', time: '0:00', startTime: 0, color: 'from-orange-500 to-red-500', glow: 'rgba(255, 100, 0, 0.4)' },
  { id: 'ongoing', name: '进行中', time: '2:00', startTime: 120, color: 'from-purple-500 to-pink-500', glow: 'rgba(200, 0, 255, 0.4)' },
  { id: 'preclimax', name: '高潮前奏', time: '4:00', startTime: 240, color: 'from-fuchsia-500 to-rose-500', glow: 'rgba(255, 0, 150, 0.5)' },
  { id: 'climax', name: '巅峰时刻', time: '6:00', startTime: 360, color: 'from-pink-400 to-white', glow: 'rgba(255, 200, 255, 0.6)' },
  { id: 'afterglow', name: '余韵回荡', time: '8:00', startTime: 480, color: 'from-indigo-500 to-purple-500', glow: 'rgba(100, 0, 255, 0.3)' },
];

// 根据时间计算当前阶段
const getPhaseFromTime = (timeSeconds: number) => {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (timeSeconds >= PHASES[i].startTime) {
      return PHASES[i];
    }
  }
  return PHASES[0];
};

export default function HardwareControl() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [frequency, setFrequency] = useState(60);
  const [isAiMode, setIsAiMode] = useState(true);
  const [activeRhythm, setActiveRhythm] = useState('auto');
  const [currentTime, setCurrentTime] = useState(0); // 从0秒开始
  const [ttsMode, setTtsMode] = useState<'real' | 'fallback'>('fallback');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedVoiceLine, setDisplayedVoiceLine] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const spokenLineRef = useRef<string>('');
  const fallbackScenario: GeneratedScenario = {
    title: '月光对话',
    subtitle: '温柔浪漫的夜晚时光',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    tags: ['温柔型', '浪漫约会', '温和'],
    voiceId: 'soft',
    voice: '轻柔声线',
    durationMinutes: 10,
    durationLabel: '10分钟',
    mode: 'AI智能模式',
    hardwareSupport: true,
    description: '在星空下的温柔夜晚，深度亲密的对话体验。AI将根据场景节奏智能调节设备，为您带来沉浸式的体验。',
    intensity: '温和',
    rhythmPattern: '渐进式',
    prompt: '温柔的月光对话',
    fullNarration: '这是为你定制的沉浸式陪伴场景。AI会从开场铺垫、情绪推进到余韵收束，为你生成一整段连续的语音引导。',
    phaseLines: {
      preheat: '先慢慢进入状态，让呼吸放松下来。',
      ongoing: '我会顺着你的幻想继续往前走。',
      preclimax: '把注意力留在我们共同构造的画面里。',
      climax: '现在来到情绪最投入的阶段。',
      afterglow: '把刚才最有感觉的片段留在脑海里。',
    },
    speakingLead: '轻柔声线，温和节奏',
  };
  const scenario = ((location.state as { scenario?: GeneratedScenario } | null)?.scenario)
    || loadGeneratedScenario()
    || fallbackScenario;
  const duration = scenario.durationMinutes * 60;
  const hasRealTts = hasRealTtsConfigured();
  
  // 根据当前时间计算当前阶段
  const currentPhase = getPhaseFromTime(currentTime);
  
  // 获取当前阶段的台词
  const currentVoiceLine = scenario.phaseLines?.[currentPhase.id] || '...';

  // 模拟波形数据
  const [waveforms, setWaveforms] = useState(Array.from({ length: 40 }, () => Math.random() * 50 + 10));

  const stopActiveVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioUrlRef.current?.startsWith('blob:')) {
      URL.revokeObjectURL(audioUrlRef.current);
    }
    audioUrlRef.current = null;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const playVoiceLine = async (text: string) => {
    if (!text) return;

    stopActiveVoice();
    const voiceProfile = getVoiceProfile(scenario.voiceId);

    try {
      const audioUrl = await requestRealTtsAudio({
        text,
        voiceId: scenario.voiceId,
        title: scenario.title,
        format: 'mp3',
        model: 'neural-premium',
        provider: 'custom',
        speakingRate: voiceProfile.speakingRate,
        pitch: voiceProfile.pitch,
        stylePrompt: voiceProfile.stylePrompt,
      });

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audioUrlRef.current = audioUrl;
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
        setTtsMode('real');
        setIsSpeaking(true);
        await audio.play();
        return;
      }
    } catch (error) {
      console.warn('Real TTS unavailable, falling back to speechSynthesis:', error);
    }

    setTtsMode('fallback');
    setIsSpeaking(true);
    speakText(text, scenario.voiceId);
    window.setTimeout(() => setIsSpeaking(false), 2400);
  };

  useEffect(() => {
    return () => {
      stopActiveVoice();
    };
  }, []);

  // 当阶段改变时，更新台词并朗读
  useEffect(() => {
    if (isPlaying && currentVoiceLine) {
      setTimeout(() => {
        playVoiceLine(currentVoiceLine);
      }, 300);
    }
  }, [currentPhase.id]);

  // 播放/暂停时朗读台词
  useEffect(() => {
    if (isPlaying) {
      // 延迟一下让开始音效先播放
      setTimeout(() => {
        if (currentVoiceLine && spokenLineRef.current !== currentVoiceLine) {
          spokenLineRef.current = currentVoiceLine;
          playVoiceLine(currentVoiceLine);
        }
      }, 200);
    } else {
      // 暂停时停止语音
      stopActiveVoice();
      spokenLineRef.current = '';
    }
  }, [isPlaying, currentVoiceLine, currentPhase.id]);

  useEffect(() => {
    setDisplayedVoiceLine('');

    if (!currentVoiceLine) {
      return;
    }

    if (!isPlaying) {
      setDisplayedVoiceLine(currentVoiceLine);
      return;
    }

    let charIndex = 0;
    const typingTimer = window.setInterval(() => {
      charIndex += 1;
      setDisplayedVoiceLine(currentVoiceLine.slice(0, charIndex));
      if (charIndex >= currentVoiceLine.length) {
        window.clearInterval(typingTimer);
      }
    }, 45);

    return () => window.clearInterval(typingTimer);
  }, [currentVoiceLine, isPlaying]);

  // 动画循环：根据频率更新波形和设备震动状态
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveforms(prev => prev.map(() => Math.random() * (frequency * 0.8) + 20));
        setCurrentTime(prev => (prev + 1) % duration);
      }, 1000 / (frequency / 10 + 1)); // 频率越高，波形刷新越快
    } else {
      setWaveforms(Array.from({ length: 40 }, () => 20)); // 停止时平缓
    }
    return () => clearInterval(interval);
  }, [isPlaying, frequency, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col overflow-hidden">
      
      {/* --- 顶部状态栏 --- */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <div className="w-8 h-8"></div>
        <div className="flex items-center space-x-3 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-md border border-white/5">
          {/* 连接指示 */}
          <div className="flex items-center text-emerald-400 text-xs font-medium">
            <div className="relative w-4 h-4 mr-1">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-1 border border-emerald-400 rounded-sm transform rotate-45"></div>
            </div>
            已连接
          </div>
          <div className="w-px h-3 bg-white/20"></div>
          <div className="flex items-center text-zinc-300 text-xs">
            <Battery size={14} className="mr-1 text-blue-400" />
            87%
          </div>
        </div>
      </div>

      {/* --- 标题区域 --- */}
      <div className="px-6 mb-4">
        <h1 className="text-2xl font-bold tracking-wider mb-1">{scenario.title}</h1>
        <div className="flex items-center text-xs text-zinc-400 space-x-2">
          <span className="flex items-center"><Zap size={12} className="mr-1 text-purple-400"/> {scenario.mode}</span>
          <span>•</span>
          <span>{scenario.tags.slice(0, 2).join(' · ')}</span>
          <span>•</span>
          <span>剩余 {scenario.durationLabel}</span>
        </div>
      </div>

      {/* 滚动区域容器 */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pb-28 space-y-4">
          
          {/* --- 阶段提示 --- */}
          <div className="relative z-20">
            <div className="flex items-center justify-between bg-zinc-900/60 border border-purple-500/20 rounded-full px-4 py-2 backdrop-blur-md">
              <div className="flex items-center">
                <div 
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentPhase.color} mr-2`}
                  style={{ boxShadow: `0_0_8px_${currentPhase.glow}` }}
                ></div>
                <span className="text-sm font-medium">{currentPhase.name}</span>
              </div>
              <span className="text-xs text-purple-400 opacity-80 animate-pulse">
                {ttsMode === 'real' ? '高拟真语音已接入' : hasRealTts ? '语音服务连接中' : '当前为浏览器语音回退'}
              </span>
            </div>
          </div>

          {/* --- 核心视觉区 --- */}
          <div className="relative z-10">
            <div className="relative w-full min-h-[620px] rounded-[32px] bg-gradient-to-b from-zinc-900/40 to-black border border-white/5 overflow-hidden px-5 pt-6 pb-8 shadow-2xl">
              
              {/* 背景光晕 */}
              <div 
                className="absolute inset-0 opacity-20 transition-colors duration-1000 blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${currentPhase.glow}, transparent 70%)` }}
              />

              {/* 背景波形 */}
              <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20">
                {waveforms.map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-gradient-to-t ${currentPhase.color} transition-all duration-300`}
                    style={{ height: `${h}%`, opacity: isPlaying ? 0.8 : 0.3 }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex min-h-[580px] flex-col items-center">
                {/* 设备主体 */}
                <div className={`w-full max-w-[140px] flex items-center justify-center transition-transform duration-75 ${isPlaying ? 'scale-[1.02] translate-y-[-1px]' : 'scale-100'} ${isPlaying && frequency > 70 ? 'animate-[vibrate_0.1s_infinite]' : ''}`}>
                  <div className="relative w-20 h-44 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-full border-[0.5px] border-zinc-700/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_20px_40px_rgba(0,0,0,0.5)] flex flex-col items-center py-4">
                    
                    <div className="absolute top-0 w-16 h-4 bg-gradient-to-b from-white/10 to-transparent rounded-t-full"></div>
                    
                    <div className="mt-4 relative w-12 h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
                      <div 
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${currentPhase.color} transition-all duration-300`}
                        style={{ width: `${intensity}%`, boxShadow: `0 0 10px ${currentPhase.glow}` }}
                      />
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full">
                      <div className="relative w-10 h-16 bg-black rounded-full shadow-inner flex items-center justify-center border border-white/5">
                        <div 
                          className={`w-4 h-8 rounded-full bg-gradient-to-b ${currentPhase.color} transition-all duration-300`}
                          style={{ 
                            opacity: isPlaying ? (intensity / 100 + 0.2) : 0.2,
                            filter: isPlaying ? `drop-shadow(0 0 ${10 + (intensity/10)}px ${currentPhase.glow})` : 'none',
                            transform: isPlaying ? `scaleY(${1 + (frequency/100)*0.5})` : 'scaleY(1)'
                          }}
                        />
                      </div>
                    </div>

                    <div className="mb-2 w-10 h-1 rounded-full bg-white/10"></div>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>

                {/* 动态AI台词 - 对话气泡 */}
                <div className={`relative z-10 mt-6 w-full px-3 transition-all duration-500 ${
                  isPlaying ? 'opacity-100' : 'opacity-40'
                }`}>
                  <div className="mx-auto max-w-[360px] rounded-[28px] border border-purple-500/25 bg-gradient-to-br from-purple-900/35 to-pink-900/20 px-5 py-4 backdrop-blur-md shadow-lg shadow-purple-500/10">
                    <p className="min-h-[96px] text-center text-[15px] leading-8 text-purple-100">
                      {displayedVoiceLine || currentVoiceLine}
                    </p>
                    <div className="mt-3 text-center text-[11px] text-zinc-400">
                      {isSpeaking ? (ttsMode === 'real' ? `${scenario.voice} · 高拟真TTS` : `${scenario.voice} · 浏览器回退语音`) : scenario.speakingLead}
                    </div>
                  </div>
                </div>

                {/* 语音波形 - AI语音输出视觉化 */}
                <div className="relative z-10 mt-6 w-full">
                  <VoiceWave isPlaying={isPlaying} barCount={28} refreshRate={120} />
                </div>

                {/* 播放按钮 */}
                <div className="relative z-20 mt-6 flex flex-col items-center w-full">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 shadow-xl ${
                      isPlaying 
                        ? `bg-zinc-800 border border-white/10 text-white` 
                        : `bg-gradient-to-br ${currentPhase.color} text-white shadow-[0_0_20px_${currentPhase.glow}]`
                    }`}
                  >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-zinc-400 mb-1">{isPlaying ? '运行中...' : '点击开始体验'}</p>
                    <div className="font-mono text-2xl font-light tracking-wider">
                      {isPlaying ? formatTime(currentTime) : '0:00'} <span className="text-zinc-600 text-lg">/ {formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 时间轴 --- */}
          <div className="relative">
            <div className="text-xs text-zinc-500 mb-5">场景节奏时间轴</div>
            
            {/* 节点层 */}
            <div className="relative flex justify-between items-start w-full pb-8">
              {PHASES.map((phase, idx) => {
                const isActive = phase.id === currentPhase.id;
                const isPassed = currentTime >= phase.startTime + 120; // 每个阶段120秒
                return (
                  <div 
                    key={phase.id} 
                    className="relative flex flex-col items-center cursor-pointer group"
                    onClick={() => setCurrentTime(phase.startTime)}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive 
                        ? 'bg-pink-500 border-white shadow-lg shadow-pink-500/60 scale-125' 
                        : isPassed
                          ? 'bg-pink-500 border-pink-500'
                          : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500'
                    }`}>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    <span className={`text-[10px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-white font-medium' : 'text-zinc-500'}`}>
                      {phase.name}
                    </span>
                    <span className={`text-[9px] font-mono mt-1 ${isActive ? 'text-pink-400' : 'text-zinc-600'}`}>
                      {phase.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 进度条层 - 在节点下方 */}
            <div className="relative w-full group">
              {/* 背景进度条显示 */}
              <div 
                className="relative w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden pointer-events-none"
                style={{
                  background: `linear-gradient(to right, 
                    rgb(168, 85, 247) 0%, 
                    rgb(168, 85, 247) ${(currentTime / duration) * 100}%, 
                    rgb(39, 39, 42) ${(currentTime / duration) * 100}%, 
                    rgb(39, 39, 42) 100%)`
                }}
              >
                {/* 进度条末端高光 */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-pink-400/60"
                  style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
              
              {/* 可交互的 range input - 支持连续时间拖拽 */}
              <input 
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="absolute top-1/2 left-0 w-full h-2.5 -translate-y-1/2 rounded-full appearance-none bg-transparent cursor-pointer z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-pink-400/60 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-pink-400/60 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing"
              />
            </div>
          </div>

          {/* --- 控制面板 --- */}
          <div className="bg-[#0a0a0c] border-t border-white/5 rounded-t-[32px] pt-6 mt-4 -mx-5 px-5">
            {/* 模式切换 */}
            <div className="flex bg-zinc-900/80 p-1 rounded-2xl mb-6">
              <button 
                onClick={() => setIsAiMode(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl flex justify-center items-center transition-all ${
                  isAiMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Zap size={16} className="mr-2" /> AI 智能
              </button>
              <button 
                onClick={() => setIsAiMode(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl flex justify-center items-center transition-all ${
                  !isAiMode 
                    ? 'bg-zinc-800 text-white shadow-lg border border-white/5' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Settings2 size={16} className="mr-2" /> 手动调节
              </button>
            </div>

            {/* 节奏模式 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-zinc-300">节奏模式</span>
                <span className="text-xs text-purple-400">AI推荐: 自适应</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: 'auto', icon: Activity, label: '自适应' },
                  { id: 'gentle', icon: Waves, label: '温和' },
                  { id: 'wave', icon: MoveUpRight, label: '波浪' },
                  { id: 'sprint', icon: FastForward, label: '冲刺' }
                ].map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setActiveRhythm(mode.id);
                        setIsAiMode(false);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
                        activeRhythm === mode.id
                          ? 'bg-purple-500/10 border-purple-500/50 text-purple-400'
                          : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                      }`}
                    >
                      <Icon size={20} className="mb-2" />
                      <span className="text-[11px]">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 强度与频率滑块 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* 强度 */}
              <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 blur-2xl rounded-full"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-sm font-medium flex items-center"><Zap size={14} className="mr-1 text-pink-500"/> 强度</span>
                  <span className="text-lg text-pink-400 font-mono">{intensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={intensity} 
                  onChange={(e) => {
                    setIntensity(Number(e.target.value));
                    setIsAiMode(false);
                  }}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500 relative z-10"
                  style={{
                    background: `linear-gradient(to right, #ec4899 ${intensity}%, #27272a ${intensity}%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-2 relative z-10">
                  <span>轻柔</span><span>强劲</span>
                </div>
              </div>

              {/* 频率 */}
              <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 blur-2xl rounded-full"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-sm font-medium flex items-center"><Activity size={14} className="mr-1 text-purple-500"/> 频率</span>
                  <span className="text-lg text-purple-400 font-mono">{frequency}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={frequency} 
                  onChange={(e) => {
                    setFrequency(Number(e.target.value));
                    setIsAiMode(false);
                  }}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 relative z-10"
                  style={{
                    background: `linear-gradient(to right, #a855f7 ${frequency}%, #27272a ${frequency}%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-2 relative z-10">
                  <span>缓慢</span><span>急促</span>
                </div>
              </div>
            </div>

            {/* 底部设备状态 */}
            <div className="flex items-center justify-around bg-zinc-900/30 border border-white/5 rounded-2xl py-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-emerald-400 font-medium mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></div>
                  正常
                </div>
                <span className="text-[10px] text-zinc-500">设备温度</span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <div className="text-blue-400 font-medium mb-1 font-mono">87%</div>
                <span className="text-[10px] text-zinc-500">剩余电量</span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <div className="text-purple-400 font-medium mb-1">优秀</div>
                <span className="text-[10px] text-zinc-500">连接信号</span>
              </div>
            </div>

            {/* 结束按钮 */}
            <button 
              onClick={() => navigate('/home')}
              className="w-full py-4 rounded-full border border-white/10 text-zinc-300 font-medium hover:bg-white/5 transition-colors mb-6"
            >
              结束体验
            </button>
          </div>
        </div>
      </div>

      {/* 动画定义 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes vibrate {
          0% { transform: translate(0, 0) scale(1.02); }
          25% { transform: translate(-0.5px, 0.5px) scale(1.02); }
          50% { transform: translate(0.5px, -0.5px) scale(1.02); }
          75% { transform: translate(-0.5px, -0.5px) scale(1.02); }
          100% { transform: translate(0.5px, 0.5px) scale(1.02); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      
      {/* 底部导航 */}
      <BottomNav />
    </div>
  );
}
