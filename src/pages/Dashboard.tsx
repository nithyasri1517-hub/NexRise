import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CareerCards from '@/components/dashboard/CareerCards';
import SkillsGapChart from '@/components/dashboard/SkillsGapChart';
import RoadmapTimeline from '@/components/dashboard/RoadmapTimeline';
import Loader from '@/components/shared/Loader';
import { RecommendationResponse, FormData } from '@/utils/api';
import { ArrowLeft, RefreshCw, Download } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('recommendations');
    const storedForm = sessionStorage.getItem('formData');
    
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedForm) {
      setFormData(JSON.parse(storedForm));
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader size="lg" text="Loading your results..." />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="p-12 rounded-2xl bg-card border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              No Results Found
            </h2>
            <p className="text-muted-foreground mb-6">
              Complete the career assessment to get your personalized recommendations.
            </p>
            <Button onClick={() => navigate('/career-form')} variant="default">
              Take Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-beige-soft/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => navigate('/career-form')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Edit Assessment</span>
            </button>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Your Career Dashboard
            </h1>
            {formData && (
              <p className="text-muted-foreground mt-1">
                Analysis based on {formData.branch} • {formData.year}
              </p>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/career-form')}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Career Cards */}
          <div className="lg:col-span-2 space-y-6">
            <CareerCards careers={data.career_paths} />
            <SkillsGapChart 
              skills={data.confusion_matrix}
              currentSkills={data.current_skills}
              skillsToLearn={data.skills_to_learn}
            />
          </div>

          {/* Right Column - Roadmap */}
          <div className="lg:col-span-1">
            <RoadmapTimeline roadmap={data.roadmap} />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {data.career_paths.length}
            </div>
            <div className="text-sm text-muted-foreground">Career Matches</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl font-display font-bold text-accent">
              {data.skills_to_learn.length}
            </div>
            <div className="text-sm text-muted-foreground">Skills to Learn</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {data.roadmap.length}
            </div>
            <div className="text-sm text-muted-foreground">Learning Phases</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl font-display font-bold text-accent">
              {data.career_paths[0]?.matchScore || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Top Match Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
