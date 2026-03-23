import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Play, Heart, Share2, Download, Zap, Volume2, Clock, Sparkles, Bluetooth } from 'lucide-react';
import { loadGeneratedScenario, type GeneratedScenario } from '../utils/scenarioSession';
import { incrementScenarioPlay, updateScenarioFlags, loadAppData } from '../utils/appStore';

export default function ScenarioResult() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const matchedRecord = useMemo(() => {
    if (scenario.id) {
      return loadAppData().scenarios.find((item) => item.id === scenario.id) || null;
    }
    return null;
  }, [scenario.id]);

  const [isFavorite, setIsFavorite] = useState(Boolean(matchedRecord?.favorite));
  const [isDownloaded, setIsDownloaded] = useState(Boolean(matchedRecord?.downloaded));

  const handleStart = () => {
    if (scenario.id) {
      incrementScenarioPlay(scenario.id);
    }
    navigate('/hardware', { state: { scenario } });
  };

  const handleFavorite = () => {
    if (!scenario.id) return;
    const updated = updateScenarioFlags(scenario.id, { favorite: !isFavorite });
    if (updated) {
      setIsFavorite(updated.favorite);
    }
  };

  const handleDownload = () => {
    if (!scenario.id) return;
    const updated = updateScenarioFlags(scenario.id, { downloaded: !isDownloaded });
    if (updated) {
      setIsDownloaded(updated.downloaded);
    }
  };

  const handleShare = async () => {
    const shareText = `${scenario.title} - ${scenario.subtitle}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: scenario.title,
          text: shareText,
        });
        return;
      } catch {
        // ignore and fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      window.alert('已复制分享文案到剪贴板。');
    } catch {
      window.alert('当前环境不支持自动复制，请手动分享。');
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/create')}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl">生成完成</h1>
            <p className="text-sm text-muted-foreground">您的专属场景已准备就绪</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 成功提示 */}
        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-4 border border-green-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium mb-1">AI生成成功！</p>
            <p className="text-sm text-white/70">已根据您的偏好生成专属场景</p>
          </div>
        </div>

        {/* 场景封面 */}
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={scenario.coverImage}
            alt={scenario.title}
            className="w-full h-64 object-cover"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* 硬件联动标识 */}
          {scenario.hardwareSupport && (
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm flex items-center gap-2 backdrop-blur-sm shadow-lg">
              <Bluetooth className="w-4 h-4" />
              <span>支持硬件联动</span>
            </div>
          )}

          {/* 场景信息 */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-light mb-2">{scenario.title}</h2>
            <p className="text-white/80 mb-4">{scenario.subtitle}</p>
            
            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {scenario.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 场景详情 */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
          <h3 className="text-lg mb-4">场景详情</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">语音</p>
                <p className="font-medium">{scenario.voice}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">时长</p>
                <p className="font-medium">{scenario.durationLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">模式</p>
                <p className="font-medium">{scenario.mode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">强度</p>
                <p className="font-medium">{scenario.intensity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 场景描述 */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
          <h3 className="text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI生成概要
          </h3>
          <p className="text-white/80 leading-relaxed">
            {scenario.description}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-3">语音脚本预览</h3>
          <p className="text-sm text-muted-foreground mb-3">{scenario.speakingLead}</p>
          <p className="text-white/80 leading-7">
            {scenario.fullNarration}
          </p>
        </div>

        {/* AI生成参数 */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-4">AI生成参数</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">节奏模式</span>
              <span className="font-medium">{scenario.rhythmPattern}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">智能调节</span>
              <span className="font-medium text-green-400">已启用</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">硬件同步</span>
              <span className="font-medium text-green-400">已支持</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-3">
          {/* 主操作按钮 */}
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
          >
            <Play className="w-5 h-5" />
            <span className="font-medium">开始体验</span>
          </button>

          {/* 次要操作 */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={handleFavorite} className="py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col items-center gap-1">
              <Heart className="w-5 h-5" />
              <span className="text-xs">{isFavorite ? '已收藏' : '收藏'}</span>
            </button>
            <button onClick={handleDownload} className="py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col items-center gap-1">
              <Download className="w-5 h-5" />
              <span className="text-xs">{isDownloaded ? '已保存' : '保存模板'}</span>
            </button>
            <button onClick={handleShare} className="py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col items-center gap-1">
              <Share2 className="w-5 h-5" />
              <span className="text-xs">分享</span>
            </button>
          </div>
        </div>

        {/* 重新生成 */}
        <button
          onClick={() => navigate('/create')}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/80"
        >
          重新生成
        </button>
      </div>
    </div>
  );
}
