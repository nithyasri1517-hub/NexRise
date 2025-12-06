import { cn } from '@/lib/utils';

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'high' | 'medium' | 'low';
}

interface SkillsGapChartProps {
  skills: SkillGap[];
  currentSkills: string[];
  skillsToLearn: string[];
}

const priorityColors = {
  high: 'bg-accent',
  medium: 'bg-gold',
  low: 'bg-brown-light'
};

const priorityLabels = {
  high: 'High Priority',
  medium: 'Medium',
  low: 'Low Priority'
};

const SkillsGapChart = ({ skills, currentSkills, skillsToLearn }: SkillsGapChartProps) => {
  return (
    <div className="space-y-6">
      {/* Skills Gap Visualization */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">
          Skills Gap Analysis
        </h3>
        
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div 
              key={skill.skill} 
              className="section-fade-in"
              style={{ opacity: 0, animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  skill.priority === 'high' && "bg-accent/10 text-accent",
                  skill.priority === 'medium' && "bg-gold/10 text-gold",
                  skill.priority === 'low' && "bg-brown-light/10 text-brown-light"
                )}>
                  {priorityLabels[skill.priority]}
                </span>
              </div>
              
              <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                {/* Required Level Background */}
                <div 
                  className="absolute inset-y-0 left-0 bg-border rounded-full"
                  style={{ width: `${skill.requiredLevel}%` }}
                />
                {/* Current Level */}
                <div 
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full transition-all duration-1000",
                    priorityColors[skill.priority]
                  )}
                  style={{ width: `${skill.currentLevel}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Current: {skill.currentLevel}%</span>
                <span>Required: {skill.requiredLevel}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
          {Object.entries(priorityColors).map(([priority, color]) => (
            <div key={priority} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", color)} />
              <span className="text-xs text-muted-foreground capitalize">{priority} Priority</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current vs To Learn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Skills */}
        <div className="p-6 rounded-xl border border-border bg-card section-fade-in" style={{ opacity: 0 }}>
          <h4 className="font-display font-semibold text-foreground mb-4">
            Your Current Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="p-6 rounded-xl border border-border bg-card section-fade-in stagger-2" style={{ opacity: 0 }}>
          <h4 className="font-display font-semibold text-foreground mb-4">
            Skills to Acquire
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillsToLearn.map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1.5 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGapChart;
