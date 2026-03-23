import { useNavigate } from 'react-router';
import { 
  Sparkles, TrendingUp, Heart, Zap, ChevronRight, 
  Play, Crown, Bluetooth, Clock, Star, Gift 
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { CompanionCard } from '../components/CompanionCard';
import { getPlanLimits, getRemainingGenerations, loadAppData } from '../utils/appStore';

export default function Home() {
  const navigate = useNavigate();
  const appData = loadAppData();
  const planLimits = getPlanLimits(appData.subscription.plan);
  const remaining = getRemainingGenerations(appData);

  const quickActions = [
    { icon: Sparkles, label: '创建场景', path: '/create', gradient: 'from-primary to-accent' },
    { icon: Bluetooth, label: '硬件控制', path: '/hardware', gradient: 'from-pink-600 to-purple-600', highlight: true },
    { icon: Play, label: '继续会话', path: '/session', gradient: 'from-accent to-primary' },
    { icon: TrendingUp, label: '健康报告', path: '/insights', gradient: 'from-[#ec4899] to-accent' },
  ];

  const companions = [
    {
      name: 'Luna',
      description: '温柔体贴的陪伴者，带给你宁静的存在感',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      rating: 4.9,
      users: '15.2K',
      tags: ['温柔', '浪漫'],
    },
    {
      name: 'Aria',
      description: '自信活泼，带着冒险精神',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      rating: 4.8,
      users: '12.8K',
      tags: ['活泼', '自信'],
    },
    {
      name: 'Nova',
      description: '神秘迷人，善于深度对话',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.7,
      users: '10.5K',
      tags: ['神秘', '成熟'],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">欢迎回来</p>
            <h1 className="text-2xl">你好，{appData.profile.name}</h1>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >
            <span className="text-lg">A</span>
          </button>
        </div>

        {/* 商业化信息前置 - 免费额度提示 */}
        <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-[#ec4899]/20 rounded-2xl p-4 border border-primary/30 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-medium">{appData.subscription.plan.toUpperCase()} 版本</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {remaining === null ? '本月不限生成次数' : `本月剩余 ${remaining} 次生成`}
              </p>
            </div>
            <button 
              onClick={() => navigate('/subscription')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm hover:opacity-90 transition-opacity flex items-center gap-1"
            >
              <span>升级至 Plus</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{
                width: remaining === null || planLimits.maxGenerations === null
                  ? '100%'
                  : `${Math.max(0, (remaining / planLimits.maxGenerations) * 100)}%`,
              }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3" />
            <span>升级至 Plus 解锁 30 次/月 + 15 分钟场景</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${action.gradient} text-white hover:opacity-90 transition-all ${
                action.highlight ? 'ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/30' : ''
              }`}
            >
              {action.highlight && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs animate-pulse">
                  热门
                </div>
              )}
              <action.icon className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">{action.label}</div>
            </button>
          ))}
        </div>

        {/* 会员推荐横幅 */}
        <div 
          onClick={() => navigate('/subscription')}
          className="relative bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 rounded-2xl p-6 mb-6 overflow-hidden cursor-pointer group"
        >
          {/* 背景动效 */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 blur-2xl group-hover:blur-xl transition-all" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="font-medium">Premium 专属权益</span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              解锁无限场景 · 30分钟长剧本 · 专属语音 · 优先生成
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light">$9.99</span>
              <span className="text-sm text-white/60">/月</span>
              <div className="ml-auto px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-sm">
                立即升级 →
              </div>
            </div>
          </div>
        </div>

        {/* 裂变活动 Banner */}
        <div 
          onClick={() => navigate('/referral')}
          className="relative bg-gradient-to-r from-green-900/50 via-emerald-900/50 to-green-900/50 rounded-2xl p-6 mb-8 overflow-hidden cursor-pointer group"
        >
          {/* 背景动效 */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 blur-2xl group-hover:blur-xl transition-all" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-6 h-6 text-green-400" />
              <span className="font-medium">邀请好友，赚取奖励</span>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500 text-white text-xs animate-pulse">
                限时
              </span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              每成功邀请一位好友，您获得 <span className="text-green-400 font-bold">$50</span> 奖励
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">已有 12 位好友通过您的邀请加入</span>
              <div className="ml-auto px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-sm flex items-center gap-1">
                立即邀请
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">热门推荐</h2>
          <button 
            onClick={() => navigate('/explore')}
            className="text-sm text-primary hover:underline"
          >
            查看全部
          </button>
        </div>
      </div>

      {/* Companions */}
      <div className="px-6 space-y-4 mb-8">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.name}
            companion={companion}
            onClick={() => navigate('/create')}
          />
        ))}
      </div>

      {/* Weekly Stats */}
      <div className="px-6 mb-8">
        <h2 className="text-xl mb-4">本周统计</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl mb-1">{appData.stats.totalSessions}</div>
            <div className="text-xs text-muted-foreground">次会话</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl mb-1">{appData.stats.totalMinutes}</div>
            <div className="text-xs text-muted-foreground">分钟</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl mb-1">{remaining === null ? '∞' : remaining}</div>
            <div className="text-xs text-muted-foreground">次免费剩余</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}