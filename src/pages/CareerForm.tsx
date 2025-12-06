import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TextAreaField from '@/components/form/TextAreaField';
import SelectField from '@/components/form/SelectField';
import Loader from '@/components/shared/Loader';
import { useRecommendations } from '@/hooks/useRecommendations';
import { 
  BRANCHES, 
  YEARS, 
  INTEREST_EXAMPLES, 
  SKILLS_EXAMPLES, 
  EXPERIENCE_EXAMPLES 
} from '@/utils/constants';
import { FormData } from '@/utils/api';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CareerForm = () => {
  const navigate = useNavigate();
  const { fetchRecommendations, loading } = useRecommendations();
  
  const [formData, setFormData] = useState<FormData>({
    interests: '',
    skills: '',
    branch: '',
    year: '',
    goal: '',
    experience: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = await fetchRecommendations(formData);
      // Store in sessionStorage for dashboard
      sessionStorage.setItem('recommendations', JSON.stringify(data));
      sessionStorage.setItem('formData', JSON.stringify(formData));
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized career recommendations are ready.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" text="Analyzing your profile..." />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm mx-auto">
            Our AI is evaluating your skills and matching you with ideal career paths
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10 section-fade-in" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Career Assessment</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Tell Us About Yourself
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Share your background and aspirations. The more detail you provide, 
            the more personalized your recommendations will be.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft section-fade-in stagger-1" style={{ opacity: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SelectField
                label="Branch/Field of Study"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                options={BRANCHES}
                placeholder="Select your branch"
                required
              />
              <SelectField
                label="Current Year/Stage"
                name="year"
                value={formData.year}
                onChange={handleChange}
                options={YEARS}
                placeholder="Select your year"
                required
              />
            </div>

            <TextAreaField
              label="Your Interests & Passions"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Describe what excites you about technology, what problems you want to solve..."
              hint={INTEREST_EXAMPLES}
              required
              rows={4}
            />
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft section-fade-in stagger-2" style={{ opacity: 0 }}>
            <TextAreaField
              label="Current Skills & Technologies"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your technical skills, programming languages, tools, soft skills..."
              hint={SKILLS_EXAMPLES}
              required
              rows={4}
            />

            <div className="mt-6">
              <TextAreaField
                label="Experience & Projects"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe any projects, internships, courses, or relevant experience..."
                hint={EXPERIENCE_EXAMPLES}
                rows={4}
              />
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft section-fade-in stagger-3" style={{ opacity: 0 }}>
            <TextAreaField
              label="Career Goals & Aspirations"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="What do you want to achieve in your career? Where do you see yourself in 2-5 years?"
              hint="Be specific about your goals - job role, company type, industry, location preferences, salary expectations, etc."
              required
              rows={4}
            />
          </div>

          <div className="flex justify-center pt-4 section-fade-in stagger-4" style={{ opacity: 0 }}>
            <Button 
              type="submit" 
              variant="hero" 
              size="xl"
              disabled={loading}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate My Career Roadmap
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;
