import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Pause, Play, Bluetooth, Zap } from 'lucide-react';

export default function ImmersiveSession() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [intensity, setIntensity] = useState(50);
  const duration = 900; // 15 minutes in seconds

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnd = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">设备已连接</span>
        </div>
        <button
          onClick={handleEnd}
          className="w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center hover:border-destructive/50 hover:text-destructive transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-24">
        {/* Companion Info */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary/30">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
              alt="Luna"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl mb-1">Luna</h2>
          <p className="text-muted-foreground">月光对话</p>
        </div>

        {/* Audio Waveform Visualization */}
        <div className="relative w-full max-w-md mb-12">
          <div className="flex items-center justify-center gap-1 h-48">
            {[...Array(50)].map((_, i) => {
              const height = isPlaying
                ? Math.sin(currentTime * 0.3 + i * 0.2) * 60 + 70
                : 30;
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary via-accent to-primary/50 rounded-full transition-all duration-150"
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
          
          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50 flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <div className="text-4xl font-light mb-2 tabular-nums">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-muted-foreground">
            共 {formatTime(duration)}
          </div>
        </div>

        {/* Progress Ring */}
        <div className="relative w-48 h-48 mb-12">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - currentTime / duration)}`}
              className="transition-all duration-300"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Device Status */}
        <div className="w-full max-w-md bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bluetooth className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">智能设备</p>
                <p className="text-sm text-muted-foreground">同步中</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-500">活跃</span>
            </div>
          </div>

          {/* Intensity Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm">强度</span>
              </div>
              <span className="text-sm text-primary">{intensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-secondary appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent"
            />
          </div>
        </div>

        {/* End Session Button */}
        <button
          onClick={handleEnd}
          className="px-8 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-destructive/50 hover:text-destructive transition-colors"
        >
          结束会话
        </button>
      </div>
    </div>
  );
}
