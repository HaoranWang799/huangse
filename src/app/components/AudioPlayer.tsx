import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  title?: string;
  duration?: number;
}

export function AudioPlayer({ title = '沉浸式会话', duration = 180 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground mb-1">正在播放</p>
        <h3 className="text-lg">{title}</h3>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center justify-center gap-1 h-24 mb-6">
        {[...Array(40)].map((_, i) => {
          const height = isPlaying
            ? Math.sin(currentTime * 0.5 + i * 0.3) * 40 + 45
            : 20 + Math.random() * 30;
          return (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-primary via-accent to-primary/50 rounded-full transition-all duration-150"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-1 bg-secondary rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 flex items-center justify-center transition-opacity"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          )}
        </button>
        <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}