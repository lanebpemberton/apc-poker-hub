import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsItems } from '@/data/mockData';
import { Megaphone, Trophy, RefreshCw } from 'lucide-react';

const categoryConfig = {
  announcement: { label: 'Announcement', icon: Megaphone, color: 'bg-primary/20 text-primary' },
  winner: { label: 'Winner', icon: Trophy, color: 'bg-accent/20 text-accent' },
  update: { label: 'Update', icon: RefreshCw, color: 'bg-secondary text-foreground' },
};

export const NewsTab = () => {
  return (
    <div className="flex flex-col px-4 pt-4 pb-24">
      <h2 className="text-xl font-bold text-foreground mb-4">Latest News</h2>
      
      <div className="space-y-3">
        {newsItems.map((item) => {
          const config = categoryConfig[item.category];
          const Icon = config.icon;
          
          return (
            <Card key={item.id} className="hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {config.label}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{item.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};