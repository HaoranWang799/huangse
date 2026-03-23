import React, { useState, useEffect } from 'react';

interface VoiceWaveProps {
  isPlaying: boolean;
  barCount?: number;
  refreshRate?: number; // ms
}

export default function VoiceWave({ 
  isPlaying, 
  barCount = 30,
  refreshRate = 120
}: VoiceWaveProps) {
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: barCount }, () => 20)
  );

  // 使用正弦波 + 随机成分模拟语音波形
  useEffect(() => {
    let animationFrame: NodeJS.Timeout;
    let time = 0;

    const generateWave = () => {
      const newHeights = Array.from({ length: barCount }, (_, i) => {
        // 基础正弦波（创建周期性变化）
        const baseWave = Math.sin((time + i * 0.5) / 10) * 30 + 40;
        
        // 添加随机波动（增加自然感）
        const randomNoise = Math.random() * 30 - 15;
        
        // 添加频率响应（模拟不同频率的语音成分）
        const freqResponse = Math.sin((time * 2 + i) / 8) * 20 + 20;
        
        // 综合计算
        const height = Math.max(15, Math.min(95, baseWave + randomNoise * 0.3 + freqResponse * 0.2));
        return height;
      });

      setHeights(newHeights);
      time += 1;
    };

    if (isPlaying) {
      animationFrame = setInterval(generateWave, refreshRate);
    } else {
      // 暂停时逐渐回到静止状态
      setHeights(prev => 
        prev.map(h => Math.max(15, h - (h - 20) * 0.15))
      );
    }

    return () => clearInterval(animationFrame);
  }, [isPlaying, barCount, refreshRate]);

  return (
    <div className="flex items-end justify-center gap-1 h-12 px-5">
      {heights.map((height, i) => (
        <div
          key={i}
          className={`flex-1 rounded-full bg-gradient-to-t from-purple-500 via-pink-500 to-purple-400 transition-all ${
            isPlaying ? 'duration-75' : 'duration-200'
          }`}
          style={{
            height: `${Math.max(24, height - 10)}%`,
            minHeight: '8px',
            maxWidth: '6px',
            opacity: 0.9,
            boxShadow: isPlaying 
              ? `0 0 ${Math.min(15, height / 5)}px rgba(236, 72, 153, ${height / 100})` 
              : 'none',
            transform: isPlaying ? `scaleY(1)` : `scaleY(0.8)`,
          }}
        />
      ))}
    </div>
  );
}
