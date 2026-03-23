import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Volume2, Zap, Crown, Loader2 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { saveGeneratedScenario, type GeneratedScenario } from '../utils/scenarioSession';
import { buildScenarioNarration } from '../utils/scenarioNarration';

export default function CreateScenario() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [intensity, setIntensity] = useState(50);
  const [duration, setDuration] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Prompt引导 - 角色类型
  const roleTypes = [
    { id: 'gentle', label: '温柔型', emoji: '🌸' },
    { id: 'confident', label: '自信型', emoji: '💪' },
    { id: 'playful', label: '俏皮型', emoji: '😊' },
    { id: 'mysterious', label: '神秘型', emoji: '🌙' },
    { id: 'mature', label: '成熟型', emoji: '👔' },
    { id: 'sweet', label: '甜美型', emoji: '🍬' },
  ];

  // 场景类型
  const sceneTypes = [
    { id: 'romantic', label: '浪漫约会', emoji: '💖' },
    { id: 'fantasy', label: '奇幻冒险', emoji: '🔮' },
    { id: 'intimate', label: '亲密对话', emoji: '💬' },
    { id: 'relax', label: '放松舒缓', emoji: '🧘' },
    { id: 'exciting', label: '刺激冒险', emoji: '⚡' },
    { id: 'bedtime', label: '睡前陪伴', emoji: '🌙' },
  ];

  // 强度风格
  const intensityStyles = [
    { id: 'soft', label: '温和', emoji: '🌊' },
    { id: 'medium', label: '适中', emoji: '🔥' },
    { id: 'intense', label: '强烈', emoji: '💥' },
  ];

  const voices = [
    { id: 'soft', label: '轻柔', description: '温和舒缓的声音', isPremium: false },
    { id: 'mature', label: '成熟', description: '低沉自信的声音', isPremium: false },
    { id: 'playful', label: '活泼', description: '轻快愉悦的声音', isPremium: true },
    { id: 'confident', label: '自信', description: '大胆果断的声音', isPremium: true },
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const resolveSelectedTagLabels = () => {
    const allTags = [...roleTypes, ...sceneTypes, ...intensityStyles];
    return selectedTags
      .map((tagId) => allTags.find((tag) => tag.id === tagId)?.label)
      .filter(Boolean) as string[];
  };

  const buildScenario = (): GeneratedScenario => {
    const tagLabels = resolveSelectedTagLabels();
    const selectedVoiceMeta = voices.find((voice) => voice.id === selectedVoice);
    const selectedRole = roleTypes.find((role) => selectedTags.includes(role.id))?.label || '温柔型';
    const selectedScene = sceneTypes.find((scene) => selectedTags.includes(scene.id))?.label || '亲密对话';
    const selectedIntensity = intensityStyles.find((style) => selectedTags.includes(style.id))?.label || '适中';
    const promptText = aiPrompt.trim();
    const narration = buildScenarioNarration({
      prompt: promptText,
      roleLabel: selectedRole,
      sceneLabel: selectedScene,
      intensityLabel: selectedIntensity,
      voiceLabel: selectedVoiceMeta?.label || '轻柔',
      voiceDescription: selectedVoiceMeta?.description || '温和舒缓的声音',
      durationMinutes: duration,
    });

    return {
      title: narration.title,
      subtitle: narration.subtitle,
      coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
      tags: tagLabels.length > 0 ? tagLabels : ['温柔型', '浪漫约会', '温和'],
      voiceId: selectedVoice || 'soft',
      voice: `${selectedVoiceMeta?.label || '轻柔'}声线`,
      durationMinutes: duration,
      durationLabel: `${duration}分钟`,
      mode: 'AI智能模式',
      hardwareSupport: true,
      description: narration.description,
      intensity: selectedIntensity,
      rhythmPattern: '渐进式',
      prompt: promptText || `${selectedScene}，${selectedVoiceMeta?.description || '温和舒缓的声音'}`,
      fullNarration: narration.fullNarration,
      phaseLines: narration.phaseLines,
      speakingLead: narration.speakingLead,
    };
  };

  const handleGenerate = () => {
    const scenario = buildScenario();
    saveGeneratedScenario(scenario);
    setIsGenerating(true);
    // 模拟AI生成过程
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/result', { state: { scenario } });
    }, 2000);
  };

  const canGenerate = selectedTags.length > 0 && selectedVoice;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <h1 className="text-xl">AI智能创建</h1>
          <p className="text-sm text-muted-foreground">选择标签快速生成专属场景</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* AI生成中状态 */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card rounded-3xl p-8 border border-border text-center max-w-sm mx-4">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <Loader2 className="w-20 h-20 text-primary animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-accent animate-pulse" />
              </div>
              <h3 className="text-xl mb-4">AI正在生成您的专属场景</h3>
              
              {/* 生成步骤 */}
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-white/80">AI正在组合剧情</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-white/80">AI正在匹配声线</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                  </div>
                  <span className="text-white/50">AI正在生成节奏曲线</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                  </div>
                  <span className="text-white/50">AI正在同步硬件控制参数</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* 免费额度提醒 */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Free 版本</p>
                <p className="text-xs text-muted-foreground">本月剩余 2/3 次生成</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/subscription')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm hover:opacity-90 transition-opacity"
            >
              升级至 Plus
            </button>
          </div>
        </div>

        {/* 智能创建输入框 */}
        <div>
          <label className="block mb-3 text-sm text-muted-foreground">
            <Sparkles className="inline w-4 h-4 mr-1" />
            智能创建
          </label>
          <div className="relative">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="描述你想要的场景...（例如：温柔的睡前陪伴，带有轻柔的音乐）"
              className="w-full p-4 rounded-xl bg-card border border-border focus:border-primary outline-none transition-colors resize-none"
              rows={3}
            />
            {aiPrompt.length > 0 && (
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isGenerating ? '生成中...' : 'AI 生成'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 快捷标签选择 - 角色类型 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-muted-foreground">
              <Sparkles className="inline w-4 h-4 mr-1" />
              选择角色类型
            </label>
            <span className="text-xs text-primary">可多选</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {roleTypes.map((role) => (
              <button
                key={role.id}
                onClick={() => toggleTag(role.id)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedTags.includes(role.id)
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">{role.emoji}</div>
                <div className="text-xs">{role.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 快捷标签选择 - 场景类型 */}
        <div>
          <label className="block mb-3 text-sm text-muted-foreground">
            <Sparkles className="inline w-4 h-4 mr-1" />
            选择场景类型
          </label>
          <div className="grid grid-cols-3 gap-2">
            {sceneTypes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => toggleTag(scene.id)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedTags.includes(scene.id)
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">{scene.emoji}</div>
                <div className="text-xs">{scene.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 快捷标签选择 - 强度风格 */}
        <div>
          <label className="block mb-3 text-sm text-muted-foreground">
            <Zap className="inline w-4 h-4 mr-1" />
            选择强度风格
          </label>
          <div className="grid grid-cols-3 gap-2">
            {intensityStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => toggleTag(style.id)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedTags.includes(style.id)
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">{style.emoji}</div>
                <div className="text-xs">{style.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 已选标签预览 - 自然语言摘要 */}
        {selectedTags.length > 0 && selectedVoice && (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">AI将为您生成：</p>
                <p className="text-white/90 leading-relaxed">
                  一个 <span className="text-primary font-medium">{voices.find(v => v.id === selectedVoice)?.label}声线</span> + {selectedTags.map((tagId) => {
                    const allTags = [...roleTypes, ...sceneTypes, ...intensityStyles];
                    const tag = allTags.find(t => t.id === tagId);
                    return tag ? tag.label : '';
                  }).filter(Boolean).join(' + ')} + <span className="text-accent font-medium">{duration}分钟</span> 的专属场景
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagId) => {
                const allTags = [...roleTypes, ...sceneTypes, ...intensityStyles];
                const tag = allTags.find(t => t.id === tagId);
                return tag ? (
                  <span
                    key={tagId}
                    className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-1"
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* 语音风格 */}
        <div>
          <label className="block mb-3 text-sm text-muted-foreground">
            <Volume2 className="inline w-4 h-4 mr-1" />
            语音风格
          </label>
          <div className="space-y-2">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                disabled={voice.isPremium}
                className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedVoice === voice.id
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                } ${voice.isPremium ? 'opacity-60' : ''}`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{voice.label}</span>
                    {voice.isPremium && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        会员
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{voice.description}</div>
                </div>
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* 时长选择 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-muted-foreground">会话时长</label>
            <span className="text-xs text-muted-foreground">免费版限10分钟</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 30].map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                disabled={mins > 10}
                className={`p-3 rounded-xl border transition-all ${
                  duration === mins
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                } ${mins > 10 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="font-medium">{mins}</div>
                <div className="text-xs text-muted-foreground">分钟</div>
                {mins > 10 && (
                  <div className="text-[10px] text-primary mt-1">会员</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI智能生成场景</span>
        </button>

        {/* 提示文字 */}
        <p className="text-xs text-center text-muted-foreground">
          AI将根据您选择的标签自动生成最适合的场景内容
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
