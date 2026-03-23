// 音频管理工具
// 使用 Web Audio API 生成音效和背景音

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('AudioContext initialization failed:', e);
      }
    }
  }

  /**
   * 初始化音频上下文（需要用户交互）
   */
  initializeAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isInitialized = true;
      } catch (e) {
        console.warn('Failed to initialize AudioContext:', e);
      }
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(e => console.warn('Failed to resume audio:', e));
    }
  }

  /**
   * 播放"开始"音效 - 明亮上升音
   */
  playPlaySound() {
    this.initializeAudioContext();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.15);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0, now + 0.15);

      oscillator.start(now);
      oscillator.stop(now + 0.15);
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  /**
   * 播放"暂停"音效 - 柔和下降音
   */
  playPauseSound() {
    this.initializeAudioContext();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.15);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0, now + 0.15);

      oscillator.start(now);
      oscillator.stop(now + 0.15);
    } catch (e) {
      console.warn('Error playing pause sound:', e);
    }
  }

  /**
   * 播放"阶段切换"音效 - 小清晰音
   */
  playPhaseChangeSound() {
    this.initializeAudioContext();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0, now + 0.1);

      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (e) {
      console.warn('Error playing phase change sound:', e);
    }
  }

  /**
   * 使用 Web Speech API 播放 AI 台词
   */
  speakVoiceLine(text: string) {
    if (!('speechSynthesis' in window)) {
      console.warn('Web Speech API not supported');
      return;
    }

    try {
      // 停止之前的语音
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 稍微慢一点
      utterance.pitch = 1.1; // 略高的音调
      utterance.volume = 0.8;
      utterance.onstart = () => console.log('Speech started:', text);
      utterance.onerror = (e) => console.warn('Speech error:', e);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Error speaking voice line:', e);
    }
  }

  /**
   * 停止语音
   */
  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * 生成白噪音（用于背景音）
   * 返回一个 AudioBuffer 可用于循环播放
   */
  generateWhiteNoise(duration: number = 2): AudioBuffer {
    if (!this.audioContext) {
      throw new Error('AudioContext not initialized');
    }

    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const audioBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const data = audioBuffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return audioBuffer;
  }

  /**
   * 获取 AudioContext（确保已初始化）
   */
  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }
}

// 创建全局实例
export const audioManager = new AudioManager();
