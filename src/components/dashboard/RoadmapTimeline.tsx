import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Phase {
  phase: string;
  duration: string;
  tasks: string[];
}

interface RoadmapTimelineProps {
  roadmap: Phase[];
}

const RoadmapTimeline = ({ roadmap }: RoadmapTimelineProps) => {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">
        Your Learning Roadmap
      </h3>

      <div className="space-y-4">
        {roadmap.map((phase, phaseIndex) => (
          <div 
            key={phase.phase}
            className="section-fade-in"
            style={{ opacity: 0, animationDelay: `${phaseIndex * 0.1}s` }}
          >
            <div className={cn(
              "p-4 rounded-lg border transition-all hover:shadow-soft",
              phaseIndex === 0 
                ? "bg-accent/5 border-accent/20" 
                : "bg-secondary/30 border-border"
            )}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold",
                    phaseIndex === 0 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {phaseIndex + 1}
                  </span>
                  <h4 className="font-display font-semibold text-foreground">
                    {phase.phase}
                  </h4>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {phase.duration}
                </span>
              </div>

              {/* Tasks as simple list */}
              <div className="ml-10 space-y-1.5">
                {phase.tasks.map((task, taskIndex) => (
                  <div 
                    key={taskIndex}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <ArrowRight className="w-3 h-3 text-accent shrink-0" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;