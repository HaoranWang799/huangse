import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, SlidersHorizontal, TrendingUp, Star, Crown, Flame, Clock, Zap, Bluetooth, Play, Heart, Download, Share2, Sparkle } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Explore() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('recommended');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedIntensity, setSelectedIntensity] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const tabs = [
    { id: 'recommended', label: '推荐', icon: Star },
    { id: 'hot', label: '热门', icon: Flame },
    { id: 'new', label: '最新', icon: Zap },
    { id: 'premium', label: '会员专区', icon: Crown },
  ];

  const roleFilters = [
    { id: 'all', label: '全部角色' },
    { id: 'gentle', label: '温柔型' },
    { id: 'confident', label: '自信型' },
    { id: 'playful', label: '俏皮型' },
    { id: 'mysterious', label: '神秘型' },
  ];

  const intensityFilters = [
    { id: 'all', label: '全部强度' },
    { id: 'soft', label: '温和' },
    { id: 'medium', label: '适中' },
    { id: 'intense', label: '强烈' },
  ];

  const durationFilters = [
    { id: 'all', label: '全部时长' },
    { id: 'short', label: '5-10分钟' },
    { id: 'medium', label: '10-20分钟' },
    { id: 'long', label: '20分钟+' },
  ];

  const templates = [
    {
      id: 1,
      title: '月光对话',
      description: '在星空下的温柔夜晚，深度亲密的对话体验',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
      role: '温柔型',
      intensity: '温和',
      duration: '15分钟',
      downloads: '15.2K',
      rating: 4.9,
      isPremium: false,
      isHot: true,
      isNew: false,
      hardwareSupport: true,
      tags: ['浪漫', '夜晚', '温柔'],
      likes: '2.4K',
      favorites: '856',
    },
    {
      id: 2,
      title: '激情冒险',
      description: '刺激的冒险旅程,充满惊喜和挑战',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      role: '自信型',
      intensity: '强烈',
      duration: '30分钟',
      downloads: '12.8K',
      rating: 4.8,
      isPremium: true,
      isHot: false,
      isNew: false,
      hardwareSupport: true,
      tags: ['刺激', '冒险', '激情'],
      likes: '1.9K',
      favorites: '723',
    },
    {
      id: 3,
      title: '甜蜜约会',
      description: '温馨浪漫的约会场景，甜蜜的互动时光',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
      role: '俏皮型',
      intensity: '适中',
      duration: '20分钟',
      downloads: '10.5K',
      rating: 4.7,
      isPremium: false,
      isHot: false,
      isNew: true,
      hardwareSupport: true,
      tags: ['甜蜜', '约会', '浪漫'],
      likes: '1.5K',
      favorites: '612',
    },
    {
      id: 4,
      title: '神秘邂逅',
      description: '充满神秘感的邂逅，探索未知的刺激',
      image: 'https://images.unsplash.com/photo-1511994714008-b6c44e9d5752?w=400&h=300&fit=crop',
      role: '神秘型',
      intensity: '强烈',
      duration: '25分钟',
      downloads: '9.3K',
      rating: 4.9,
      isPremium: true,
      isHot: true,
      isNew: false,
      hardwareSupport: true,
      tags: ['神秘', '刺激', '探索'],
      likes: '2.1K',
      favorites: '891',
    },
    {
      id: 5,
      title: '午后阳光',
      description: '慵懒的午后时光，温暖的陪伴体验',
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      role: '温柔型',
      intensity: '温和',
      duration: '10分钟',
      downloads: '11.7K',
      rating: 4.6,
      isPremium: false,
      isHot: false,
      isNew: true,
      hardwareSupport: false,
      tags: ['温暖', '放松', '陪伴'],
      likes: '1.2K',
      favorites: '445',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-2xl mb-4">模板商城</h1>
          
          {/* Search */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索场景模板..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary outline-none transition-colors"
              />
            </div>
            <button className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2 rounded-xl border whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-primary to-accent text-white border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 筛选区域 */}
        <div className="space-y-4">
          {/* 角色筛选 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">角色类型</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {roleFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedRole(filter.id)}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap text-sm transition-all ${
                    selectedRole === filter.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 强度筛选 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">强度</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {intensityFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedIntensity(filter.id)}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap text-sm transition-all ${
                    selectedIntensity === filter.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 时长筛选 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">时长</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {durationFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedDuration(filter.id)}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap text-sm transition-all ${
                    selectedDuration === filter.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 结果统计 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">找到 {templates.length} 个模板</p>
          <button className="text-sm text-primary hover:underline">按热度排序</button>
        </div>

        {/* 模板列表 */}
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate('/create')}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer group"
            >
              {/* 封面图 - 动态预览区 */}
              <div className="relative h-48 overflow-hidden group/preview">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* 动态预览播放按钮 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
                
                {/* 顶部标签组 */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {/* 热门标签 */}
                    {template.isHot && (
                      <span className="px-2 py-1 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs flex items-center gap-1 backdrop-blur-sm shadow-lg">
                        <Flame className="w-3 h-3" />
                        热门
                      </span>
                    )}
                    {/* 新上线标签 */}
                    {template.isNew && (
                      <span className="px-2 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs flex items-center gap-1 backdrop-blur-sm shadow-lg">
                        <Sparkle className="w-3 h-3" />
                        新上线
                      </span>
                    )}
                  </div>
                  {/* 会员标识 */}
                  {template.isPremium && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs flex items-center gap-1 backdrop-blur-sm shadow-lg">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                </div>

                {/* 底部数据 */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {template.downloads}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {template.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white font-medium">{template.rating}</span>
                  </div>
                </div>
              </div>

              {/* 内容信息 */}
              <div className="p-4">
                <h3 className="text-lg mb-2">{template.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {template.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.hardwareSupport && (
                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 text-purple-300 text-xs flex items-center gap-1">
                      <Bluetooth className="w-3 h-3" />
                      支持硬件联动
                    </span>
                  )}
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 底部信息 */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{template.role}</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {template.intensity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {template.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>

                {/* 预览/使用按钮 */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-sm">
                    预览
                  </button>
                  <button className="py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity text-sm">
                    使用此模板
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 */}
        <button className="w-full py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
          加载更多模板
        </button>
      </div>

      <BottomNav />
    </div>
  );
}