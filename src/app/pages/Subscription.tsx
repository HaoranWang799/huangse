import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Crown, Sparkles, Zap } from 'lucide-react';
import { addDiamonds, loadAppData, setSubscriptionPlan } from '../utils/appStore';

export default function Subscription() {
  const navigate = useNavigate();
  const appData = loadAppData();

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: '永久',
      features: [
        '每月 3 次场景生成',
        '最长 10 分钟场景',
        '基础语音（2种）',
        '基础模板访问',
        '社区内容浏览',
      ],
      limitations: [
        '❌ 无高级语音',
        '❌ 无长时长场景',
        '❌ 无AI智能节奏',
        '❌ 无优先生成',
      ],
      gradient: 'from-muted to-muted',
      buttonText: '当前方案',
      disabled: true,
      planId: 'free',
    },
    {
      name: 'Plus',
      price: 9.99,
      period: '月',
      popular: true,
      features: [
        '每月 30 次场景生成',
        '最长 15 分钟场景',
        '高级语音（6种）',
        '更多模板访问',
        'AI智能节奏模式',
        '优先生成队列',
        '高级洞察分析',
      ],
      gradient: 'from-primary to-accent',
      buttonText: '升级至 Plus',
      icon: Sparkles,
      highlight: '最受欢迎 · 性价比之选',
      planId: 'plus',
    },
    {
      name: 'Premium',
      price: 19.99,
      period: '月',
      features: [
        '✨ 无限场景生成',
        '✨ 最长 30 分钟场景',
        '✨ 所有高级语音（10+）',
        '✨ 独家模板库',
        '✨ AI超级智能模式',
        '✨ 即时生成（零等待）',
        '✨ 更强硬件联动模式',
        '✨ 专属洞察与指导',
        '✨ 抢先体验新功能',
      ],
      gradient: 'from-accent to-[#ec4899]',
      buttonText: '升级至 Premium',
      icon: Crown,
      highlight: '极致体验 · 无限可能',
      planId: 'premium',
    },
  ];

  const coinPackages = [
    { amount: 100, price: 4.99, bonus: 0 },
    { amount: 500, price: 19.99, bonus: 50, popular: true },
    { amount: 1200, price: 39.99, bonus: 200 },
    { amount: 3000, price: 89.99, bonus: 600 },
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === appData.subscription.plan) {
      window.alert('当前已是该套餐。');
      return;
    }

    if (planId !== 'free' && appData.paymentMethods.length === 0) {
      window.alert('请先添加支付方式，再升级套餐。');
      navigate('/payment');
      return;
    }

    setSubscriptionPlan(planId as 'free' | 'plus' | 'premium');
    window.alert(`已切换到 ${planId.toUpperCase()} 套餐。`);
    window.location.reload();
  };

  const handleBuyDiamonds = (amount: number, bonus: number) => {
    if (appData.paymentMethods.length === 0) {
      window.alert('请先添加支付方式再购买钻石。');
      navigate('/payment');
      return;
    }
    const total = amount + bonus;
    const newBalance = addDiamonds(total);
    window.alert(`购买成功，已到账 ${total} 钻石。当前余额：${newBalance}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-xl">订阅方案</h1>
            <p className="text-sm text-muted-foreground">选择您的体验</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-12">
        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl p-6 border transition-all ${
                  plan.popular
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs">
                    最受欢迎
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {Icon && <Icon className="w-5 h-5 text-primary" />}
                      <h3 className="text-xl">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                  {Icon && (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={plan.planId === appData.subscription.plan}
                  onClick={() => handlePlanSelect(plan.planId)}
                  className={`w-full py-3 rounded-xl transition-all ${
                    plan.planId === appData.subscription.plan
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90'
                      : 'bg-card border-2 border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {plan.planId === appData.subscription.plan ? '当前方案' : plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Coin Packages */}
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-xl">钻石套餐</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            使用钻石解锁高级模板和独家内容
          </p>
          <div className="grid grid-cols-2 gap-3">
            {coinPackages.map((pkg) => (
              <div
                key={pkg.amount}
                onClick={() => handleBuyDiamonds(pkg.amount, pkg.bonus)}
                className={`bg-card rounded-2xl p-4 border transition-all cursor-pointer hover:border-primary/50 ${
                  pkg.popular ? 'border-primary' : 'border-border'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs mb-2">
                    超值推荐
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl">{pkg.amount}</span>
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-xs text-green-500 mb-2">+{pkg.bonus} 赠送</div>
                )}
                <div className="text-sm text-muted-foreground">${pkg.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg mb-4">为什么要升级？</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">无限创意</p>
                <p className="text-sm text-muted-foreground">
                  生成任意数量的场景，没有每月限制
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-[#ec4899] flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">高级语音</p>
                <p className="text-sm text-muted-foreground">
                  访问独家语音风格和高保真音质
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ec4899] to-primary flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">高级洞察</p>
                <p className="text-sm text-muted-foreground">
                  深度分析和AI驱动的推荐，获得更好的体验
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-muted-foreground">安全支付</p>
          </div>
          <div className="text-center p-3 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-1">↩️</div>
            <p className="text-xs text-muted-foreground">随时取消</p>
          </div>
          <div className="text-center p-3 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-1">🎁</div>
            <p className="text-xs text-muted-foreground">免费试用</p>
          </div>
        </div>
      </div>
    </div>
  );
}