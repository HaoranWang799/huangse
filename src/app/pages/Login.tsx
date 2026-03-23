import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Sparkles, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && ageConfirmed) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Logo */}
      <div className="mt-12 mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl mb-2">欢迎回来</h1>
        <p className="text-muted-foreground">您的私密AI陪伴者在等候</p>
      </div>

      {/* Privacy Banner */}
      <div className="bg-card rounded-2xl p-4 border border-primary/20 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm mb-1">私密与安全</p>
            <p className="text-xs text-muted-foreground">
              端到端加密。您的数据始终由您掌控。
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm mb-2">邮箱</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">密码</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Age Confirmation */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-border accent-primary"
              required
            />
            <span className="text-sm text-muted-foreground">
              我确认我已年满18周岁，并同意{' '}
              <span className="text-primary">服务条款</span>和{' '}
              <span className="text-primary">隐私政策</span>。
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!ageConfirmed}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          登录
        </button>

        {/* Social Login */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">或使用以下方式继续</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm">Google</span>
          </button>
          <button
            type="button"
            className="py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="text-sm">Apple</span>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          还没有账户？{' '}
          <button type="button" className="text-primary hover:underline">
            注册
          </button>
        </p>
      </form>
    </div>
  );
}