import { useNavigate } from 'react-router';
import { 
  ChevronRight, Crown, Settings, Shield, Heart, 
  Download, Bluetooth, CreditCard, HelpCircle, LogOut, Gift 
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { loadAppData } from '../utils/appStore';

export default function Profile() {
  const navigate = useNavigate();
  const appData = loadAppData();
  const favoriteCount = appData.scenarios.filter((item) => item.favorite).length;
  const downloadedCount = appData.scenarios.filter((item) => item.downloaded).length;

  const menuSections = [
    {
      title: '账户',
      items: [
        { icon: Crown, label: '订阅管理', path: '/subscription', badge: appData.subscription.plan.toUpperCase() },
        { icon: Settings, label: '账户设置', path: '/settings' },
        { icon: Shield, label: '隐私与安全', path: '/privacy' },
      ],
    },
    {
      title: '内容',
      items: [
        { icon: Heart, label: '收藏的场景', path: '/saved', count: favoriteCount },
        { icon: Download, label: '已下载模板', path: '/downloads', count: downloadedCount },
      ],
    },
    {
      title: '设备',
      items: [
        { icon: Bluetooth, label: '设备管理', path: '/device' },
      ],
    },
    {
      title: '账单',
      items: [
        { icon: CreditCard, label: '支付方式', path: '/payment' },
      ],
    },
    {
      title: '支持',
      items: [
        { icon: HelpCircle, label: '帮助中心', path: '/help' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Profile */}
      <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent border-b border-border">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-primary" />
            <div className="flex-1">
              <h1 className="text-2xl mb-1">{appData.profile.name}</h1>
              <p className="text-sm text-muted-foreground">{appData.profile.email}</p>
            </div>
          </div>

          {/* 已连接设备卡 - P1强化设备露出 */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Bluetooth className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">已连接设备</p>
                  <p className="text-xs text-muted-foreground">MX Pro · 固件 v2.1.3</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-light text-blue-400 mb-0.5">87%</div>
                <div className="text-[10px] text-white/50">电量</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light text-green-400 mb-0.5">优秀</div>
                <div className="text-[10px] text-white/50">信号</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light text-white/80 mb-0.5">2分钟前</div>
                <div className="text-[10px] text-white/50">上次连接</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-border text-center">
              <div className="text-xl mb-1">{appData.stats.totalSessions}</div>
              <div className="text-xs text-muted-foreground">会话</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-border text-center">
              <div className="text-xl mb-1">{(appData.stats.totalMinutes / 60).toFixed(1)}小时</div>
              <div className="text-xs text-muted-foreground">总时长</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-border text-center">
              <div className="text-xl mb-1">{appData.stats.streakDays}</div>
              <div className="text-xs text-muted-foreground">连续天数</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="p-6 space-y-6">
        {/* 邀请活动 Banner */}
        <div 
          onClick={() => navigate('/referral')}
          className="relative bg-gradient-to-r from-green-900/50 via-emerald-900/50 to-green-900/50 rounded-2xl p-6 overflow-hidden cursor-pointer group"
        >
          {/* 背景动效 */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 blur-2xl group-hover:blur-xl transition-all" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-6 h-6 text-green-400" />
              <span className="font-medium text-lg">邀请好友，赚取奖励</span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              每成功邀请一位好友，您获得 <span className="text-green-400 font-bold">$50</span> 账户余额
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-light text-white mb-1">12</div>
                  <div className="text-xs text-white/60">已邀请</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-green-400 mb-1">$600</div>
                  <div className="text-xs text-white/60">已获得</div>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-sm flex items-center gap-1">
                立即邀请
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm text-muted-foreground mb-3 px-2">{section.title}</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors ${
                      index !== section.items.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && (
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Premium Promotion */}
        <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-2xl p-6 border border-primary/30">
          <Crown className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-lg mb-2">升级至尊享版</h3>
          <p className="text-sm text-muted-foreground mb-4">
            解锁无限场景、高级语音和独家内容
          </p>
          <button
            onClick={() => navigate('/subscription')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
          >
            查看方案
          </button>
        </div>

        {/* App Info */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">应用版本</span>
            <span className="text-sm">2.5.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">构建版本</span>
            <span className="text-sm">2024.03.22</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl bg-card border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-muted-foreground text-center">
          您的隐私是我们的首要任务。所有数据均已加密并安全存储。
        </p>
      </div>

      <BottomNav />
    </div>
  );
}