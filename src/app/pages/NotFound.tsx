import { useNavigate } from 'react-router';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-4xl mb-3">404</h1>
        <h2 className="text-xl mb-4">页面未找到</h2>
        
        {/* Description */}
        <p className="text-muted-foreground mb-8">
          您访问的页面不存在或已被移除。
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-full py-3 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            返回首页
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="w-full bg-card border border-border text-foreground rounded-full py-3 font-medium hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            探索
          </button>
        </div>
      </div>
    </div>
  );
}
