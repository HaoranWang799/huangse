import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 首页不显示返回按钮
  const isHome = location.pathname === '/home' || location.pathname === '/';
  
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-background sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-white">你的她</h1>
      </div>
    </div>
  );
}
