import { CheckCircle2, Circle } from 'lucide-react';
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

      <div className="relative">
        {roadmap.map((phase, phaseIndex) => (
          <div 
            key={phase.phase}
            className={cn(
              "relative pl-8 pb-8 last:pb-0 section-fade-in",
            )}
            style={{ opacity: 0, animationDelay: `${phaseIndex * 0.15}s` }}
          >
            {/* Timeline Line */}
            {phaseIndex < roadmap.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
            )}

            {/* Timeline Dot */}
            <div className={cn(
              "absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center",
              phaseIndex === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
            )}>
              {phaseIndex === 0 ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>

            {/* Content */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h4 className="font-display font-semibold text-foreground">
                  {phase.phase}
                </h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary w-fit">
                  {phase.duration}
                </span>
              </div>

              <ul className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <li 
                    key={taskIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
