import { Home, ShoppingBag, PlusCircle, Zap, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: '首页', path: '/home' },
    { icon: Zap, label: '控制', path: '/hardware', highlight: true },
    { icon: PlusCircle, label: '创建', path: '/create' },
    { icon: ShoppingBag, label: '商城', path: '/explore' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-all relative ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* 控制按钮特殊样式 */}
                {item.highlight && !isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                )}
                
                {item.highlight && isActive ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-50" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : item.highlight ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                ) : (
                  <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
                )}
                
                <span className={`text-xs ${item.highlight ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
