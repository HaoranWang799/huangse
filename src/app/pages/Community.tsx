import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TrendingUp, Star, Flame, Users, Sparkles, Heart, Download, Share2, Play, Clock, Zap, Bluetooth } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Community() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('recommended');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const tabs = [
    { id: 'recommended', label: '推荐', icon: Star },
    { id: 'hot', label: '热门', icon: Flame },
    { id: 'creators', label: '创作者', icon: Users },
    { id: 'latest', label: '最新', icon: Sparkles },
  ];

  const feedItems = [
    {
      id: 1,
      type: 'template',
      title: '月光对话·深夜版',
      description: '升级版的月光对话场景，增加了更多情感层次和互动细节',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
      creator: {
        name: 'Luna Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      tags: ['浪漫', '温柔', '深夜'],
      duration: '18分钟',
      intensity: '温和',
      likes: 2847,
      downloads: 1256,
      favorites: 892,
      rating: 4.9,
      hardwareSupport: true,
      isHot: true,
    },
    {
      id: 2,
      type: 'scenario',
      title: '雨夜告白',
      description: '在雨声中的温柔告白，适合需要情感连接的时刻',
      image: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=400&h=300&fit=crop',
      creator: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      tags: ['浪漫', '雨夜', '告白'],
      duration: '12分钟',
      intensity: '适中',
      likes: 1923,
      downloads: 845,
      favorites: 634,
      rating: 4.7,
      hardwareSupport: true,
      isHot: false,
    },
    {
      id: 3,
      type: 'creation',
      title: '午后咖啡馆',
      description: '慵懒的午后时光，在咖啡香中的轻松对话',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      creator: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      tags: ['放松', '日常', '温暖'],
      duration: '15分钟',
      intensity: '温和',
      likes: 1456,
      downloads: 678,
      favorites: 432,
      rating: 4.6,
      hardwareSupport: false,
      isHot: false,
    },
    {
      id: 4,
      type: 'popular',
      title: '星空露营',
      description: '在星空下的露营体验，感受大自然的浪漫',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop',
      creator: {
        name: 'Chris Zhang',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      tags: ['户外', '浪漫', '星空'],
      duration: '20分钟',
      intensity: '适中',
      likes: 3156,
      downloads: 1534,
      favorites: 1089,
      rating: 4.8,
      hardwareSupport: true,
      isHot: true,
    },
    {
      id: 5,
      type: 'trending',
      title: '海边日落',
      description: '在海边看日落的温柔时刻，沉浸在夕阳的余晖中',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      creator: {
        name: 'Sophie Lee',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      },
      tags: ['海边', '日落', '浪漫'],
      duration: '16分钟',
      intensity: '温和',
      likes: 2234,
      downloads: 967,
      favorites: 745,
      rating: 4.7,
      hardwareSupport: true,
      isHot: false,
    },
  ];

  const toggleLike = (id: number) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSavedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-2xl mb-4">社区动态</h1>

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

      {/* Feed Content */}
      <div className="p-6 space-y-6">
        {/* 社区热度提示 */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium mb-0.5">社区内容持续增长中</p>
              <p className="text-sm text-muted-foreground">本周新增 127 个优质场景</p>
            </div>
          </div>
        </div>

        {/* Feed 流 */}
        <div className="space-y-4">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all group"
            >
              {/* 创作者信息 */}
              <div className="p-4 flex items-center gap-3 border-b border-border">
                <img
                  src={item.creator.avatar}
                  alt={item.creator.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.creator.name}</p>
                  <p className="text-xs text-muted-foreground">2小时前</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/50 text-primary text-sm hover:bg-primary/30 transition-colors">
                  关注
                </button>
              </div>

              {/* 封面预览 */}
              <div className="relative h-48 overflow-hidden group/preview cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
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

                {/* 标签 */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {item.isHot && (
                      <span className="px-2 py-1 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs flex items-center gap-1 backdrop-blur-sm shadow-lg">
                        <Flame className="w-3 h-3" />
                        热门
                      </span>
                    )}
                  </div>
                </div>

                {/* 底部数据 */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {item.downloads}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white font-medium">{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* 内容信息 */}
              <div className="p-4">
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.hardwareSupport && (
                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 text-purple-300 text-xs flex items-center gap-1">
                      <Bluetooth className="w-3 h-3" />
                      支持硬件联动
                    </span>
                  )}
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 详情 */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.intensity}
                  </span>
                </div>

                {/* 互动操作区 */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                      likedPosts.includes(item.id)
                        ? 'bg-pink-600/20 border border-pink-500/50 text-pink-400'
                        : 'bg-card border border-border hover:border-primary/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.includes(item.id) ? 'fill-pink-400' : ''}`} />
                    <span className="text-sm">{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(item.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                      savedPosts.includes(item.id)
                        ? 'bg-primary/20 border border-primary/50 text-primary'
                        : 'bg-card border border-border hover:border-primary/50'
                    }`}
                  >
                    <Download className={`w-4 h-4 ${savedPosts.includes(item.id) ? 'fill-primary' : ''}`} />
                    <span className="text-sm">收藏</span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">分享</span>
                  </button>

                  <button
                    onClick={() => navigate('/create')}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    使用同款
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 */}
        <button className="w-full py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
          加载更多内容
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
