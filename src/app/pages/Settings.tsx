import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Save } from 'lucide-react';
import { loadAppData, updateProfile } from '../utils/appStore';

export default function Settings() {
  const navigate = useNavigate();
  const profile = loadAppData().profile;
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSave = () => {
    updateProfile({
      name: name.trim() || profile.name,
      email: email.trim() || profile.email,
      avatar: avatar.trim() || (name.trim()[0] || 'U').toUpperCase(),
    });
    window.alert('账户设置已保存。');
    navigate(-1);
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
          <h1 className="text-xl font-semibold">账户设置</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">昵称</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">邮箱</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">头像文字</label>
          <input
            maxLength={2}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value.toUpperCase())}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 outline-none focus:border-primary"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-white flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          保存设置
        </button>

        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
          这些设置会保存在当前浏览器中。
        </div>
      </div>
    </div>
  );
}
