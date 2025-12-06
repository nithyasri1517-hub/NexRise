export interface FormData {
  interests: string;
  skills: string;
  branch: string;
  year: string;
  goal: string;
  experience: string;
}

export interface CareerPath {
  name: string;
  reason: string;
  matchScore: number;
}

export interface RecommendationResponse {
  career_paths: CareerPath[];
  skills_to_learn: string[];
  current_skills: string[];
  roadmap: {
    phase: string;
    duration: string;
    tasks: string[];
  }[];
  confusion_matrix: {
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    priority: 'high' | 'medium' | 'low';
  }[];
}

// Mock API call - in production, this would call your backend
export const getRecommendations = async (formData: FormData): Promise<RecommendationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Parse skills from the form
  const userSkills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  // Return mock data based on input
  return {
    career_paths: [
      {
        name: "Full Stack Developer",
        reason: `Based on your interest in ${formData.interests.slice(0, 50)}... and background in ${formData.branch}, full stack development offers a balanced path combining frontend creativity with backend logic.`,
        matchScore: 92
      },
      {
        name: "Data Scientist",
        reason: "Your analytical skills and problem-solving interests align well with data science roles. The field offers excellent growth opportunities.",
        matchScore: 85
      },
      {
        name: "DevOps Engineer",
        reason: "With your technical foundation and interest in system optimization, DevOps engineering could be a rewarding career path.",
        matchScore: 78
      },
      {
        name: "Product Manager",
        reason: "Your communication skills and understanding of technology position you well for bridging technical and business teams.",
        matchScore: 72
      }
    ],
    skills_to_learn: [
      "React.js & Next.js",
      "Node.js & Express",
      "PostgreSQL & MongoDB",
      "Docker & Kubernetes",
      "AWS/Cloud Services",
      "System Design",
      "CI/CD Pipelines",
      "TypeScript"
    ],
    current_skills: userSkills.length > 0 ? userSkills : ["JavaScript", "HTML", "CSS", "Git"],
    roadmap: [
      {
        phase: "Foundation (Month 1-2)",
        duration: "8 weeks",
        tasks: [
          "Master JavaScript ES6+ fundamentals",
          "Learn React.js core concepts",
          "Build 2-3 small projects",
          "Version control with Git & GitHub"
        ]
      },
      {
        phase: "Backend Development (Month 3-4)",
        duration: "8 weeks",
        tasks: [
          "Node.js and Express.js mastery",
          "Database design with PostgreSQL",
          "RESTful API development",
          "Authentication & Authorization"
        ]
      },
      {
        phase: "Advanced Skills (Month 5-6)",
        duration: "8 weeks",
        tasks: [
          "TypeScript integration",
          "Docker containerization",
          "Cloud deployment (AWS/Vercel)",
          "Build a full-stack capstone project"
        ]
      },
      {
        phase: "Career Ready (Month 7-8)",
        duration: "8 weeks",
        tasks: [
          "System design fundamentals",
          "Technical interview preparation",
          "Portfolio website development",
          "Open source contributions"
        ]
      }
    ],
    confusion_matrix: [
      { skill: "JavaScript", currentLevel: 60, requiredLevel: 90, priority: 'high' },
      { skill: "React", currentLevel: 40, requiredLevel: 85, priority: 'high' },
      { skill: "Node.js", currentLevel: 30, requiredLevel: 80, priority: 'high' },
      { skill: "Databases", currentLevel: 25, requiredLevel: 75, priority: 'medium' },
      { skill: "DevOps", currentLevel: 15, requiredLevel: 60, priority: 'medium' },
      { skill: "System Design", currentLevel: 10, requiredLevel: 70, priority: 'low' },
    ]
  };
};
