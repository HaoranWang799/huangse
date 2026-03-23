import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Gift, Copy, Share2, Users, DollarSign, Check, Sparkles } from 'lucide-react';

export default function Referral() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralCode = 'LUNA2024';
  const referralLink = 'https://app.example.com/ref/LUNA2024';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: '已邀请好友', value: '12', icon: Users },
    { label: '获得奖励', value: '$600', icon: DollarSign },
    { label: '待领取', value: '$150', icon: Gift },
  ];

  const recentReferrals = [
    { name: 'Emma W.', date: '2天前', reward: '$50', status: 'completed' },
    { name: 'Chris Z.', date: '5天前', reward: '$50', status: 'completed' },
    { name: 'Alex K.', date: '1周前', reward: '$50', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl">邀请好友</h1>
            <p className="text-sm text-muted-foreground">成功邀请即可获得奖励</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 主视觉卡片 */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-[#ec4899] opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          
          <div className="relative p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-light mb-2">邀请好友，赚取奖励</h2>
            <p className="text-white/80 mb-6">
              每成功邀请一位好友注册并订阅<br />
              您获得 <span className="text-3xl font-bold">$50</span> 奖励
            </p>
            
            {/* 奖励说明 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6 text-center">
              <p className="text-2xl font-light mb-1">$50</p>
              <p className="text-sm text-white/70">每次成功邀请的奖励</p>
            </div>

            {/* 额外奖励提示 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <p className="text-sm">邀请满10人，额外获得Plus会员1个月</p>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border text-center">
                <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-light mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* 邀请码 */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            您的专属邀请码
          </h3>
          
          <div className="space-y-3">
            {/* 邀请码 */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">邀请码</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-xl px-4 py-3 border border-border font-mono text-lg tracking-wider">
                  {referralCode}
                </div>
                <button
                  onClick={() => handleCopy(referralCode)}
                  className="px-4 py-3 rounded-xl bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 邀请链接 */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">邀请链接</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-xl px-4 py-3 border border-border text-sm truncate">
                  {referralLink}
                </div>
                <button
                  onClick={() => handleCopy(referralLink)}
                  className="px-4 py-3 rounded-xl bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* 分享按钮 */}
          <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            <span>分享给好友</span>
          </button>
        </div>

        {/* 邀请规则 */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-4">活动规则</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>好友通过您的邀请码或链接注册并完成首次订阅</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>您将获得 $50 账户余额，可用于订阅或购买</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>邀请人数无上限，邀请越多奖励越多</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>每邀请满10人，额外获得1个月Plus会员</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>奖励将在好友完成订阅后24小时内发放</span>
            </li>
          </ul>
        </div>

        {/* 最近邀请 */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-4">最近邀请</h3>
          <div className="space-y-3">
            {recentReferrals.map((ref, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium mb-0.5">{ref.name}</p>
                  <p className="text-xs text-muted-foreground">{ref.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${ref.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {ref.reward}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ref.status === 'completed' ? '已到账' : '待确认'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 text-center">
          <p className="text-lg mb-2">开始邀请，获得奖励！</p>
          <p className="text-sm text-muted-foreground mb-4">
            将您的专属链接分享给好友，一起享受高级体验
          </p>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto">
            <Share2 className="w-5 h-5" />
            <span>立即分享</span>
          </button>
        </div>
      </div>
    </div>
  );
}
