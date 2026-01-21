export type QuestionType = 'choice' | 'slider';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[]; // For multiple choice
  minLabel?: string;  // For sliders
  maxLabel?: string;  // For sliders
  dimension?: string; // For AI Context
}

export const CAREER_QUESTIONS: Question[] = [
  {
    id: "initiative_role_preference",
    text: "When starting a new group project, what role do you naturally want?",
    type: "choice",
    options: [
      "Figuring out the logic and how it will work.",
      "Making it look good and easy to use.",
      "Setting the goals and motivating the team.",
      "Organizing the details and checking for mistakes."
    ],
    dimension: "RIASEC_Investigative"
  },
  {
    id: "operational_environment_vibe",
    text: "How do you prefer to work during the day?",
    type: "slider",
    minLabel: "Quiet & Alone",
    maxLabel: "Busy & With People",
    dimension: "Big5_Extraversion"
  },
  {
    id: "problem_solving_methodology",
    text: "How do you solve a confusing problem?",
    type: "choice",
    options: [
      "I look at the facts and data.",
      "I talk it out with others to agree on a plan.",
      "I build a quick test version to see what happens.",
      "I come up with a totally new and creative idea."
    ],
    dimension: "Cognitive_Style_Abstract"
  },
  {
    id: "structural_preference_continuum",
    text: "How much structure do you need to do your best work?",
    type: "slider",
    minLabel: "Go with the flow",
    maxLabel: "Step-by-step plan",
    dimension: "Big5_Conscientiousness"
  },
  {
    id: "value_delivery_priority",
    text: "What makes you feel most proud at the end of the day?",
    type: "choice",
    options: [
      "Helping someone overcome a personal challenge.",
      "Convincing people to agree on a big deal.",
      "Making a system run faster or better.",
      "Learning something new that changes how I think."
    ],
    dimension: "RIASEC_Social"
  },
  {
    id: "technical_vs_human_focus",
    text: "What are you more interested in understanding?",
    type: "slider",
    minLabel: "Technology & Systems",
    maxLabel: "People & Culture",
    dimension: "Domain_Interest_Systems"
  },
  {
    id: "conflict_navigation_style",
    text: "If your team disagrees on a plan, what do you do?",
    type: "choice",
    options: [
      "I use logic and facts to prove my point.",
      "I try to find a compromise so everyone is happy.",
      "I push for the boldest, most exciting idea.",
      "I point out the risks and what could go wrong."
    ],
    dimension: "Big5_Agreeableness"
  },
  {
    id: "learning_breadth_depth",
    text: "Do you prefer to be an expert in one thing, or good at many things?",
    type: "slider",
    minLabel: "Expert in One Thing",
    maxLabel: "Good at Many Things",
    dimension: "Big5_Openness"
  },
  {
    id: "output_orientation_preference",
    text: "If you worked on a project for a week, what would you want to show for it?",
    type: "choice",
    options: [
      "A working tool, machine, or piece of software.",
      "A research paper or detailed analysis.",
      "A collection of designs, art, or stories.",
      "A detailed plan or organized report."
    ],
    dimension: "RIASEC_Realistic"
  },
  {
    id: "innovation_vs_refinement",
    text: "What excites you more?",
    type: "slider",
    minLabel: "Creating something new",
    maxLabel: "Improving what exists",
    dimension: "Big5_Openness"
  },
  {
    id: "influence_motivation_type",
    text: "How do you like to help the world?",
    type: "choice",
    options: [
      "By leading and persuading people.",
      "By teaching and mentoring others.",
      "By building technology that people use.",
      "By organizing information so things run smoothly."
    ],
    dimension: "RIASEC_Enterprising"
  },
  {
    id: "data_interpretation_style",
    text: "When you look at a lot of information, what do you do first?",
    type: "slider",
    minLabel: "Look for trends",
    maxLabel: "Check for errors",
    dimension: "Cognitive_Style_Logic"
  },
  {
    id: "risk_appetite_scenario",
    text: "What kind of company would you rather work for?",
    type: "choice",
    options: [
      "A big, stable company with a clear career path.",
      "A high-stakes startup where I could win big.",
      "A place that lets me experiment without too many rules.",
      "Anywhere that lets me solve the hardest problems."
    ],
    dimension: "Work_Environment_Stability"
  },
  {
    id: "concept_vs_execution",
    text: "What are you more curious about?",
    type: "slider",
    minLabel: "Why it works (Theory)",
    maxLabel: "How to build it (Practice)",
    dimension: "RIASEC_Investigative"
  },
  {
    id: "decision_making_criteria",
    text: "When you have to make a fast decision, what do you trust?",
    type: "choice",
    options: [
      "My gut feeling and intuition.",
      "The facts and numbers.",
      "How it will affect other people.",
      "The official rules and procedures."
    ],
    dimension: "Big5_Conscientiousness"
  },
  {
    id: "public_vs_private_contribution",
    text: "Do you prefer to be in the spotlight or behind the scenes?",
    type: "slider",
    minLabel: "Behind the Scenes",
    maxLabel: "In the Spotlight",
    dimension: "Big5_Extraversion"
  },
  {
    id: "creative_constraint_preference",
    text: "How do you do your best creative work?",
    type: "choice",
    options: [
      "With total freedom and no rules.",
      "With clear rules to solve a specific puzzle.",
      "By brainstorming with a group.",
      "By following a specific blueprint or plan."
    ],
    dimension: "RIASEC_Artistic"
  },
  {
    id: "competitive_atmosphere_preference",
    text: "How do you feel about competition at work?",
    type: "slider",
    minLabel: "I prefer teamwork",
    maxLabel: "I like to compete",
    dimension: "Big5_Agreeableness"
  },
  {
    id: "impact_scale_preference",
    text: "What kind of impact do you want to have?",
    type: "choice",
    options: [
      "Changing systems that affect millions of people.",
      "Deeply changing one person's life at a time.",
      "Helping a specific team or company succeed.",
      "Discovering new knowledge for the world."
    ],
    dimension: "RIASEC_Social"
  },
  {
    id: "stress_response_adaptability",
    text: "What kind of work pace do you prefer?",
    type: "slider",
    minLabel: "Calm & Predictable",
    maxLabel: "Fast & Intense",
    dimension: "Work_Environment_Risk"
  }
];