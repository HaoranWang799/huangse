import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  Flame, 
  Zap, 
  Trophy, 
  MapPin, 
  Users, 
  Camera, 
  Bot, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Crown,
  X,
  Download,
  Dumbbell,
  Target,
  CheckCircle2,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export default function HealthData() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isAILoading, setIsAILoading] = useState(true);
  const [qrLoadedError, setQrLoadedError] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const chartData = [
    { day: '周一', value: 18 },
    { day: '周二', value: 28 },
    { day: '周三', value: 12 },
    { day: '周四', value: 35 },
    { day: '周五', value: 24 },
    { day: '周六', value: 39 },
    { day: '今天', value: 23, isToday: true },
  ];

  const maxChartValue = Math.max(...chartData.map(d => d.value)) * 1.15;

  const svgWidth = 300;
  const svgHeight = 100;
  
  const points = chartData.map((d, i) => ({
    x: i * (svgWidth / (chartData.length - 1)),
    y: svgHeight - (d.value / maxChartValue) * (svgHeight - 20)
  }));

  const makeSmoothPath = (pts: any[]) => {
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const xMid = (pts[i].x + pts[i + 1].x) / 2;
      path += ` C ${xMid},${pts[i].y} ${xMid},${pts[i+1].y} ${pts[i+1].x},${pts[i+1].y}`;
    }
    return path;
  };

  const linePath = makeSmoothPath(points);
  const areaPath = `${linePath} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-200 font-sans pb-24 relative overflow-hidden">
      
      {/* 氛围光晕 */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-[-10%] w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 bg-[#07070A]/80 backdrop-blur-lg border-b border-white/[0.05] z-40 py-4">
        <div className="max-w-[420px] mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-medium tracking-wider text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></span>
            你的她
          </h1>
          <button className="text-slate-500 hover:text-slate-300 transition-colors">
            <Activity size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-[420px] mx-auto px-4 space-y-5 relative z-10">
        
        {/* Card 1: 本次使用状态 */}
        <section className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-6 shadow-2xl mt-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-slate-400">本次使用状态</h2>
            <div className="flex items-center gap-1 text-xs text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse"></span>
              Live
            </div>
          </div>

          <div className="flex gap-6 mb-8">
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" stroke="#ffffff10" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="45" 
                  stroke="url(#scoreGrad)" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray="282" 
                  strokeDashoffset="42"
                  className="drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">85</span>
                <span className="text-[10px] text-slate-500 mt-1">综合评分</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-grow">
              {[
                { label: '使用时长', value: '00:23:45', icon: Clock, color: 'text-slate-200' },
                { label: '个人状态', value: '兴奋', icon: Zap, color: 'text-fuchsia-400' },
                { label: '内容激烈度', value: '激烈', icon: Flame, color: 'text-violet-400' },
                { label: '硬度评分', value: 'A-', icon: ShieldCheck, color: 'text-indigo-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/20 rounded-2xl p-3 border border-white/[0.03] hover:bg-white/[0.05] transition-colors group cursor-pointer">
                  <div className="text-[11px] text-slate-500 mb-1 flex items-center justify-between">
                    {item.label}
                    <item.icon size={12} className="opacity-50" />
                  </div>
                  <div className={`text-base font-semibold ${item.color}`}>{item.value}</div>
                  <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    详情 <ChevronRight size={10} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
            <div className="flex flex-col gap-1 w-1/3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Zap size={14} className="text-slate-600" /> 疲软期
              </div>
              <div className="text-lg font-medium text-slate-300">12<span className="text-xs text-slate-500 ml-0.5">s</span></div>
            </div>
            <div className="w-px h-8 bg-white/[0.05]"></div>
            <div className="flex flex-col gap-1 w-1/3 pl-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                强硬度时间
              </div>
              <div className="text-lg font-medium text-slate-300">8<span className="text-xs text-slate-500 ml-0.5 mr-1">m</span>20<span className="text-xs text-slate-500 ml-0.5">s</span></div>
            </div>
            <div className="w-px h-8 bg-white/[0.05]"></div>
            <div className="flex flex-col gap-1 w-1/3 pl-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                综合评级
              </div>
              <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-500">
                A-
              </div>
            </div>
          </div>
        </section>

        {/* Card 2: 排名榜单 */}
        <section className="bg-gradient-to-b from-amber-500/[0.08] to-white/[0.02] backdrop-blur-xl border border-amber-500/20 rounded-[28px] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full"></div>
          
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] flex-shrink-0">
              <Crown size={32} className="text-amber-950" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-amber-200/80 tracking-widest mb-1">亚洲猛男榜</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl text-amber-100">第</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 drop-shadow-sm tracking-tight">
                  12,345
                </span>
                <span className="text-xl text-amber-100">位</span>
              </div>
              <p className="text-xs text-amber-400/80 bg-amber-500/10 inline-flex px-2 py-1 rounded-md border border-amber-500/20">
                击败全国 98% 的猛男
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/[0.05] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                <MapPin size={12} /> 本城排名
              </div>
              <div className="text-lg font-medium text-slate-200 mb-1">北京 <span className="text-rose-400 font-bold">第 888 名</span></div>
              <div className="text-[10px] text-slate-500">城市前 2%</div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/[0.05] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                <Users size={12} /> 好友排名
              </div>
              <div className="text-lg font-medium text-slate-200 mb-1">超越 <span className="text-violet-400 font-bold">92%</span></div>
              <div className="text-[10px] text-slate-500">的好友</div>
            </div>
          </div>
        </section>

        {/* 语录与操作区 */}
        <section className="space-y-4">
          <div className="bg-white/[0.02] border border-white/[0.03] rounded-2xl py-4 px-6 text-center">
            <p className="text-[13px] text-slate-300 font-medium flex items-center justify-center gap-2">
              <Flame size={14} className="text-rose-400" />
              实力已证明——你不只是参与者，你是今晚的王者
            </p>
            <p className="text-[11px] text-slate-500 mt-1">继续保持，王座只属于你</p>
          </div>

          <button 
            onClick={() => setShowShareModal(true)}
            className="w-full relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 border border-white/20 text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-medium text-lg shadow-xl transition-transform active:scale-[0.98]">
              <Camera size={20} />
              生成猛男战绩分享卡
            </div>
          </button>
        </section>

        {/* Card 3: 趋势图 */}
        <section className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-6">
          <h2 className="text-base font-semibold text-slate-200 mb-6 flex items-center justify-between relative z-10">
            近 7 天趋势
            <span className="text-xs font-normal text-slate-500 bg-black/20 px-2 py-1 rounded-lg">时长 (分钟)</span>
          </h2>
          
          <div className="px-2 mt-4">
            <div className="relative h-32 w-full">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <path d={areaPath} fill="url(#areaGrad)" />
                <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3" filter="url(#glow)" />

                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={chartData[i].isToday ? 5 : 3.5}
                    fill={chartData[i].isToday ? "#fff" : "#0a0510"}
                    stroke={chartData[i].isToday ? "#d946ef" : "url(#lineGrad)"}
                    strokeWidth={chartData[i].isToday ? 0 : 2}
                    filter={chartData[i].isToday ? "url(#glow)" : ""}
                    className={chartData[i].isToday ? "animate-pulse" : ""}
                  />
                ))}
              </svg>

              {chartData.map((data, idx) => {
                const bottomPercent = 100 - (points[idx].y / svgHeight) * 100;
                return (
                  <div 
                    key={idx} 
                    className="absolute top-0 bottom-0 w-8 -ml-4 flex flex-col items-center justify-end group cursor-pointer z-10"
                    style={{ left: `${(idx / (chartData.length - 1)) * 100}%` }}
                  >
                    <span
                      className={`absolute mb-3 transition-all duration-300 ease-out text-[11px] ${
                        data.isToday 
                          ? 'opacity-100 text-fuchsia-400 font-bold drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] -translate-y-1' 
                          : 'opacity-0 group-hover:opacity-100 text-slate-200 font-medium group-hover:-translate-y-1'
                      }`}
                      style={{ bottom: `${bottomPercent}%` }}
                    >
                      {data.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="relative w-full h-4 mt-4">
              {chartData.map((data, idx) => (
                <div 
                  key={idx} 
                  className="absolute top-0 w-10 -ml-5 text-center"
                  style={{ left: `${(idx / (chartData.length - 1)) * 100}%` }}
                >
                  <span className={`text-[10px] ${data.isToday ? 'text-fuchsia-400 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]' : 'text-slate-500'}`}>
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Card 4: AI 训练计划 */}
        <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/10 backdrop-blur-xl border border-indigo-500/20 rounded-[28px] p-6 text-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-slate-200">针对性训练计划</h2>
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Sparkles size={16} />
            </div>
          </div>

          <button 
            onClick={() => {
              setShowAIModal(true);
              setIsAILoading(true);
              setTimeout(() => setIsAILoading(false), 2000); 
            }}
            className="w-full relative z-10 bg-black/40 border border-indigo-500/30 hover:border-indigo-400/60 text-indigo-200 rounded-2xl py-3.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-[0_0_20px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] active:scale-[0.98]"
          >
            <Bot size={18} className="text-indigo-400" />
            AI 分析 & 智能生成训练计划
          </button>
          
          <p className="text-[11px] text-slate-500 mt-4">
            AI 将根据你的健康数据生成专属训练计划
          </p>
        </section>

      </div>

      {/* 悬浮消息提示框 */}
      <div 
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-600 text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium flex items-center gap-3">
          <Sparkles size={16} className="text-fuchsia-400" />
          {toastMessage}
        </div>
      </div>

      {/* 战绩分享卡弹窗 */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="bg-gradient-to-b from-[#1a1025] to-[#0a0510] rounded-[32px] w-full max-w-[340px] border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.2)] relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <div id="share-card-content" className="p-8 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-[50px]"></div>
              
              <div className="text-center relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-fuchsia-300 mb-6">
                  <Crown size={12} /> 亚洲猛男榜
                </div>
                <div className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-200 to-fuchsia-500 drop-shadow-lg mb-2">
                  85
                </div>
                <div className="text-sm text-slate-400 tracking-widest">本次综合评分</div>
              </div>

              <div className="space-y-4 relative z-10 mb-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-slate-400 text-sm">硬度评级</span>
                  <span className="text-fuchsia-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">A-</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-slate-400 text-sm">击败全国</span>
                  <span className="text-slate-200 font-bold">98% 的用户</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-slate-400 text-sm">持久巅峰</span>
                  <span className="text-slate-200 font-bold">8m 20s</span>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10 bg-black/30 p-3 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  {!qrLoadedError ? (
                    <img 
                      src="https://quickchart.io/qr?text=https://www.google.com&size=100&margin=1" 
                      alt="QR Code" 
                      className="w-10 h-10 rounded-[8px] bg-white p-0.5"
                      onError={() => setQrLoadedError(true)}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-[8px] bg-white flex items-center justify-center text-slate-800">
                      <QrCode size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-200">长按保存或扫码查看</div>
                  <div className="text-[10px] text-slate-500">加入「你的她」探索更多</div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button 
                onClick={() => { showToast('图片已保存到相册'); setShowShareModal(false); }}
                className="w-full bg-white text-black font-semibold rounded-2xl py-3.5 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <Download size={18} /> 保存高清战绩卡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI 训练计划弹窗 */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0b0c10] rounded-[32px] w-full max-w-[340px] border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
            <button 
              onClick={() => setShowAIModal(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {isAILoading ? (
              <div className="p-10 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full border-t-indigo-500 animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-purple-500/30 rounded-full border-b-purple-500 animate-[spin_2s_linear_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={32} className="text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-indigo-100 mb-2">AI 正在深度分析</h3>
                <p className="text-xs text-indigo-400/60 text-center">正在读取您的近期状态数据...<br/>为您匹配最优方案</p>
              </div>
            ) : (
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Target size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-200">专属特训方案已生成</h3>
                    <p className="text-xs text-indigo-400">预计提升硬度评级至 A+</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { title: '核心力量强化', desc: '深蹲与凯格尔运动结合', time: '15 mins', icon: Dumbbell, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                    { title: '心肺耐力突破', desc: '高强度 HIIT 间歇性训练', time: '20 mins', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                    { title: '敏捷与控制', desc: '神经元唤醒与节奏控制', time: '10 mins', icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className={`w-10 h-10 rounded-xl ${task.bg} flex items-center justify-center flex-shrink-0`}>
                        <task.icon size={18} className={task.color} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{task.title}</div>
                        <div className="text-[10px] text-slate-500">{task.desc}</div>
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 bg-black/30 px-2 py-1 rounded-md">
                        {task.time}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { showToast('已加入日程，今晚开始特训！'); setShowAIModal(false); }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl py-3.5 flex items-center justify-center gap-2 font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                >
                  <CheckCircle2 size={18} />
                  立即开启特训
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
