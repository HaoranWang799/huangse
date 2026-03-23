import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Download } from 'lucide-react';
import { loadAppData, updateScenarioFlags } from '../utils/appStore';

export default function Downloads() {
  const navigate = useNavigate();
  const downloadedScenarios = useMemo(
    () => loadAppData().scenarios.filter((item) => item.downloaded),
    [],
  );

  const handleRemoveDownload = (id: string) => {
    updateScenarioFlags(id, { downloaded: false });
    window.location.reload();
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
          <h1 className="text-xl font-semibold">已下载模板</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {downloadedScenarios.length === 0 ? (
          <p className="text-muted-foreground">您还没有下载任何模板</p>
        ) : (
          <div className="space-y-4">
            {downloadedScenarios.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => navigate('/result', { state: { scenario: item.scenario } })}
                  className="w-full text-left"
                >
                  <img src={item.scenario.coverImage} alt={item.scenario.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-1">{item.scenario.title}</h2>
                    <p className="text-sm text-muted-foreground">{item.scenario.durationLabel} · {item.scenario.voice}</p>
                  </div>
                </button>
                <div className="border-t border-border p-3">
                  <button
                    onClick={() => handleRemoveDownload(item.id)}
                    className="flex items-center gap-2 text-sm text-destructive hover:opacity-80"
                  >
                    <Download className="h-4 w-4" />
                    取消保存
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
