import { useNavigate } from 'react-router';
import { ChevronLeft, Search, BookOpen, MessageCircle, Shield, Zap, Heart, Settings } from 'lucide-react';

export default function Help() {
  const navigate = useNavigate();

  const categories = [
    {
      title: '新手入门',
      icon: Zap,
      color: 'from-primary to-accent',
      articles: [
        '如何创建您的第一个场景',
        '了解陪伴者个性',
        '设置您的偏好',
        '语音和音频设置',
      ],
    },
    {
      title: '隐私与安全',
      icon: Shield,
      color: 'from-accent to-[#ec4899]',
      articles: [
        '我们如何保护您的数据',
        '端到端加密说明',
        '管理您的隐私设置',
        '数据删除和导出',
      ],
    },
    {
      title: '功能介绍',
      icon: Heart,
      color: 'from-[#ec4899] to-primary',
      articles: [
        '使用沉浸式会话',
        '连接智能设备',
        '了解健康洞察',
        '订阅权益说明',
      ],
    },
    {
      title: '账户与设置',
      icon: Settings,
      color: 'from-primary to-accent',
      articles: [
        '管理您的订阅',
        '更新个人信息',
        '通知偏好设置',
        '登录问题排查',
      ],
    },
  ];

  const faqs = [
    {
      q: '我的数据是否私密和安全？',
      a: '是的，您的所有数据都经过端到端加密，并本地存储在您的设备上。我们绝不会分享或出售您的个人信息。',
    },
    {
      q: '我可以随时取消订阅吗？',
      a: '当然可以。您可以随时从个人设置中取消订阅。您将保留访问权限直至当前计费周期结束。',
    },
    {
      q: '智能设备连接如何工作？',
      a: '我们的应用通过蓝牙连接兼容的智能设备。所有连接都是安全的并经过加密以保护您的隐私。',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl">帮助中心</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索帮助内容..."
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg mb-3">按类别浏览</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.title}
                  className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-colors text-left"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm mb-1">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {category.articles.length} 篇文章
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        {categories.map((category) => (
          <div key={category.title} className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                {(() => {
                  const Icon = category.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <h2 className="text-lg">{category.title}</h2>
            </div>
            <div className="space-y-3">
              {category.articles.map((article, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                >
                  <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{article}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* FAQs */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg mb-4">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <h3 className="text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-2xl p-6 border border-primary/30">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg mb-2">仍需帮助？</h2>
            <p className="text-sm text-muted-foreground mb-4">
              我们的支持团队24/7全天候为您服务
            </p>
            <button className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-full py-3 font-medium hover:opacity-90 transition-opacity">
              联系支持
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            🔒 支持对话已加密且保密
          </p>
        </div>
      </div>
    </div>
  );
}
