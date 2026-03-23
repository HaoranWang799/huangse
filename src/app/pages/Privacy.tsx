import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Shield } from 'lucide-react';
import { loadAppData, updatePrivacy } from '../utils/appStore';

export default function Privacy() {
  const navigate = useNavigate();
  const initialPrivacy = loadAppData().privacy;
  const [privacy, setPrivacy] = useState(initialPrivacy);

  const setField = (key: keyof typeof privacy) => {
    const next = {
      ...privacy,
      [key]: !privacy[key],
    };
    setPrivacy(next);
    updatePrivacy(next);
  };

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
          <h1 className="text-xl font-semibold">隐私与安全</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-base font-medium">隐私控制</h2>
          </div>

          <div className="space-y-3">
            <button onClick={() => setField('profileVisible')} className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left">
              <span>公开个人资料</span>
              <span className="text-sm text-muted-foreground">{privacy.profileVisible ? '开启' : '关闭'}</span>
            </button>

            <button onClick={() => setField('analyticsEnabled')} className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left">
              <span>使用分析数据</span>
              <span className="text-sm text-muted-foreground">{privacy.analyticsEnabled ? '开启' : '关闭'}</span>
            </button>

            <button onClick={() => setField('personalizedRecommendation')} className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left">
              <span>个性化推荐</span>
              <span className="text-sm text-muted-foreground">{privacy.personalizedRecommendation ? '开启' : '关闭'}</span>
            </button>

            <button onClick={() => setField('allowEmailNotification')} className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left">
              <span>邮件通知</span>
              <span className="text-sm text-muted-foreground">{privacy.allowEmailNotification ? '开启' : '关闭'}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
          修改后自动保存到本地，立即生效。
        </div>
      </div>
    </div>
  );
}
