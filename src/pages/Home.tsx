import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, TrendingUp, Lightbulb, Users } from 'lucide-react';

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Career Path Discovery",
    description: "Get personalized career recommendations based on your unique skills and interests."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Skills Gap Analysis",
    description: "Identify exactly what skills you need to develop to reach your career goals."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Custom Learning Roadmap",
    description: "Receive a step-by-step learning plan tailored to your timeline and objectives."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to get industry-relevant recommendations that evolve with the market."
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-beige-warm to-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 section-fade-in" style={{ opacity: 0 }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">AI-Powered Career Guidance</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 section-fade-in stagger-1" style={{ opacity: 0 }}>
              Find your path.{' '}
              <span className="text-accent">Fix your gap.</span>{' '}
              Rise higher.
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto section-fade-in stagger-2" style={{ opacity: 0 }}>
              NexRise uses intelligent analysis to map your skills, identify growth opportunities, 
              and create a personalized roadmap to your dream career.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 section-fade-in stagger-3" style={{ opacity: 0 }}>
              <Link to="/career-form">
                <Button variant="hero" size="xl">
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  View Sample Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How NexRise Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI-driven platform analyzes your profile and delivers actionable insights 
              to accelerate your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-card transition-all duration-300 section-fade-in"
                style={{ opacity: 0, animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Rise?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Take the first step towards your ideal career. Our AI will analyze your profile 
              and create a customized growth plan in minutes.
            </p>
            <Link to="/career-form">
              <Button variant="warm" size="xl">
                Begin Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
