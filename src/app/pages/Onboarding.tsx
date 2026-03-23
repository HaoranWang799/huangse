import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Shield, Waves, ChevronRight } from 'lucide-react';

const slides = [
  {
    icon: Sparkles,
    title: '个性化AI场景',
    description: '利用先进AI技术，创建符合您个人喜好的独特亲密体验。',
  },
  {
    icon: Waves,
    title: '沉浸式音频与设备同步',
    description: '通过空间音频和智能设备集成，调动您的所有感官，建立更深层次的连接。',
  },
  {
    icon: Shield,
    title: '私密健康洞察',
    description: '您的数据完全安全。通过加密的个人分析追踪您的旅程。',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-8">
      {/* Logo */}
      <div className="mt-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent flex items-center justify-center mb-8">
          <Icon className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {slide.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span>{currentSlide === slides.length - 1 ? '开始使用' : '继续'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            跳过
          </button>
        )}
      </div>
    </div>
  );
}