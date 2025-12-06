import { CareerPath } from '@/utils/api';
import { TrendingUp, Sparkles, Target, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerCardsProps {
  careers: CareerPath[];
}

const iconMap = [
  <TrendingUp className="w-6 h-6" />,
  <Sparkles className="w-6 h-6" />,
  <Target className="w-6 h-6" />,
  <Briefcase className="w-6 h-6" />
];

const CareerCards = ({ careers }: CareerCardsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-semibold text-foreground">
        Recommended Career Paths
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careers.map((career, index) => (
          <div
            key={career.name}
            className={cn(
              "group p-6 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300 section-fade-in",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {iconMap[index % iconMap.length]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-display font-semibold text-foreground truncate">
                    {career.name}
                  </h4>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent shrink-0">
                    {career.matchScore}% Match
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {career.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerCards;
