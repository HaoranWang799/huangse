import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bluetooth, Battery, Zap, RefreshCw } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function DeviceConnect() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const connectedDevices = [
    { name: 'Luna设备专业版', battery: 85, status: '已连接', signal: 95 },
    { name: '沉浸式音频X1', battery: 62, status: '已连接', signal: 88 },
  ];

  const availableDevices = [
    { name: 'Nova陪伴者', battery: 100, status: '可用' },
    { name: 'Pulse同步v2', battery: 45, status: '可用' },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">设备连接</h1>
            <p className="text-sm text-muted-foreground">管理您的智能设备</p>
          </div>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-white ${isScanning ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Scanning Animation */}
        {isScanning && (
          <div className="bg-card rounded-2xl p-6 border border-primary/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bluetooth className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />
              </div>
              <div>
                <p className="font-medium">正在扫描设备...</p>
                <p className="text-sm text-muted-foreground">请稍候</p>
              </div>
            </div>
          </div>
        )}

        {/* Connected Devices */}
        <div>
          <h2 className="text-lg mb-4">已连接设备</h2>
          <div className="space-y-3">
            {connectedDevices.map((device) => (
              <div
                key={device.name}
                className="bg-card rounded-2xl p-4 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bluetooth className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-500">{device.status}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    断开连接
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">电量</p>
                      <p className="text-sm font-medium">{device.battery}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">信号</p>
                      <p className="text-sm font-medium">{device.signal}%</p>
                    </div>
                  </div>
                </div>

                {/* Signal Strength Bars */}
                <div className="mt-4">
                  <div className="flex items-end gap-1 h-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all ${
                          i < Math.floor(device.signal / 20)
                            ? 'bg-gradient-to-t from-primary to-accent'
                            : 'bg-secondary'
                        }`}
                        style={{ height: `${(i + 1) * 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Devices */}
        <div>
          <h2 className="text-lg mb-4">可用设备</h2>
          <div className="space-y-3">
            {availableDevices.map((device) => (
              <div
                key={device.name}
                className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Bluetooth className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Battery className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{device.battery}%</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm hover:opacity-90 transition-opacity">
                    连接
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-medium mb-4">同步设置</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">启动应用时自动连接</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">振动反馈</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">低电量通知</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
            </label>
          </div>
        </div>

        {/* Info */}
        <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">提示：</span>保持设备电量充足并在10米范围内以获得最佳连接。
            固件更新将自动应用。
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
