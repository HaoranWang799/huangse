import { useNavigate } from 'react-router';
import { TrendingUp, Clock, Zap, Heart, Calendar } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Insights() {
  const navigate = useNavigate();

  const weeklyData = [
    { day: '周一', sessions: 2, minutes: 45 },
    { day: '周二', sessions: 3, minutes: 60 },
    { day: '周三', sessions: 1, minutes: 30 },
    { day: '周四', sessions: 4, minutes: 75 },
    { day: '周五', sessions: 2, minutes: 50 },
    { day: '周六', sessions: 3, minutes: 65 },
    { day: '周日', sessions: 2, minutes: 40 },
  ];

  const stats = [
    { icon: Clock, label: '平均时长', value: '18分钟', change: '+2分钟', color: 'from-primary to-accent' },
    { icon: Zap, label: 'AI模式占比', value: '85%', change: '+12%', color: 'from-accent to-[#ec4899]' },
    { icon: Heart, label: '完成率', value: '92%', change: '+5%', color: 'from-[#ec4899] to-primary' },
    { icon: TrendingUp, label: '连续天数', value: '7天', change: '进行中', color: 'from-primary to-accent' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl">健康洞察</h1>
            <button className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">您的个人健康旅程</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl">{stat.value}</p>
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg mb-4">每周活跃度</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272f" />
              <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#131318',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSessions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Session Duration */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg mb-4">会话时长（分钟）</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272f" />
              <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#131318',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="minutes" radius={[8, 8, 0, 0]} fill="url(#barGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg mb-4">您的偏好</h2>
          <div className="space-y-4">
            {[
              { label: '浪漫', value: 45, color: '#8b5cf6' },
              { label: '温柔', value: 30, color: '#c084fc' },
              { label: '活泼', value: 15, color: '#ec4899' },
              { label: '神秘', value: 10, color: '#6366f1' },
            ].map((pref) => (
              <div key={pref.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{pref.label}</span>
                  <span className="text-sm text-muted-foreground">{pref.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pref.value}%`,
                      backgroundColor: pref.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-2xl p-6 border border-primary/30">
          <h2 className="text-lg mb-3">AI推荐</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm mb-1">尝试晚间会话</p>
                <p className="text-xs text-muted-foreground">
                  您在晚上8-10点的参与度提高了40%
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="text-sm mb-1">探索新场景</p>
                <p className="text-xs text-muted-foreground">
                  根据您的偏好，您可能会喜欢奇幻主题
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm mb-1">保持连续记录</p>
                <p className="text-xs text-muted-foreground">
                  您已经连续7天了，继续保持！
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            🔒 所有数据已加密并本地存储。您的洞察是私密的��永远不会被分享。
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}