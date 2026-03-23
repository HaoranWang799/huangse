import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">支付方式</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">支付方式管理页面敬请期待...</p>
        </div>
      </div>
    </div>
  );
}
