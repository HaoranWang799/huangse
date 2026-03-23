import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Heart } from 'lucide-react';
import { loadAppData, updateScenarioFlags } from '../utils/appStore';

export default function Saved() {
  const navigate = useNavigate();
  const savedScenarios = useMemo(
    () => loadAppData().scenarios.filter((item) => item.favorite),
    [],
  );

  const handleCancelFavorite = (id: string) => {
    updateScenarioFlags(id, { favorite: false });
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
          <h1 className="text-xl font-semibold">收藏的场景</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {savedScenarios.length === 0 ? (
          <p className="text-muted-foreground">您还没有收藏任何场景</p>
        ) : (
          <div className="space-y-4">
            {savedScenarios.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => navigate('/result', { state: { scenario: item.scenario } })}
                  className="w-full text-left"
                >
                  <img src={item.scenario.coverImage} alt={item.scenario.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-1">{item.scenario.title}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{item.scenario.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.scenario.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/15 px-2 py-1 text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="border-t border-border p-3">
                  <button
                    onClick={() => handleCancelFavorite(item.id)}
                    className="flex items-center gap-2 text-sm text-destructive hover:opacity-80"
                  >
                    <Heart className="h-4 w-4" />
                    取消收藏
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
