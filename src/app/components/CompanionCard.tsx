import { Heart, Star } from 'lucide-react';

interface CompanionCardProps {
  companion: {
    name: string;
    description: string;
    image: string;
    rating?: number;
    users?: string;
    tags?: string[];
  };
  onClick?: () => void;
}

export function CompanionCard({
  companion,
  onClick,
}: CompanionCardProps) {
  const { name, description, image, rating = 4.8, users = '12.3K', tags = [] } = companion;
  
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-transparent">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors">
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">{users} 用户</span>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}