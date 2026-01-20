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
    text: "When a high-priority project is launched, which role do you naturally gravitate toward to ensure its success?",
    type: "choice",
    options: [
      "Architecting the complex logic and data structures behind the solution.",
      "Designing the visual narrative and user experience to ensure it resonates emotionally.",
      "Defining the strategic milestones and rallying the team to hit aggressive targets.",
      "Optimizing the internal workflows and ensuring every detail meets quality standards."
    ],
    dimension: "RIASEC_Investigative"
  },
  {
    id: "operational_environment_vibe",
    text: "How do you prefer to navigate your daily workflow regarding external stimulation and collaboration?",
    type: "slider",
    minLabel: "Deep Solo Focus",
    maxLabel: "High-Energy Collaborative",
    dimension: "Big5_Extraversion"
  },
  {
    id: "problem_solving_methodology",
    text: "When faced with an ambiguous problem, what is your primary instinct for finding a resolution?",
    type: "choice",
    options: [
      "Breaking the problem down into measurable data points and empirical evidence.",
      "Facilitating a group discussion to reach a consensus that honors everyone's perspective.",
      "Building a hands-on prototype or physical model to test the theory in real-time.",
      "Synthesizing disparate ideas into a completely novel, unconventional concept."
    ],
    dimension: "Cognitive_Style_Abstract"
  },
  {
    id: "structural_preference_continuum",
    text: "In your professional environment, how much pre-defined structure do you require to perform at your peak?",
    type: "slider",
    minLabel: "Fluid & Emergent",
    maxLabel: "Highly Methodical",
    dimension: "Big5_Conscientiousness"
  },
  {
    id: "value_delivery_priority",
    text: "Which outcome provides you with the deepest sense of professional accomplishment?",
    type: "choice",
    options: [
      "Empowering an individual to overcome a personal or professional hurdle.",
      "Negotiating a complex deal that secures resources for your organization.",
      "Engineering a system that increases efficiency by an order of magnitude.",
      "Uncovering a theoretical insight that changes how the industry views a problem."
    ],
    dimension: "RIASEC_Social"
  },
  {
    id: "technical_vs_human_focus",
    text: "When evaluating a new career opportunity, where does your primary interest lie on the spectrum of 'What' versus 'Who'?",
    type: "slider",
    minLabel: "Systems & Tech",
    maxLabel: "People & Culture",
    dimension: "Domain_Interest_Systems"
  },
  {
    id: "conflict_navigation_style",
    text: "In a boardroom disagreement regarding project direction, how do you typically intervene?",
    type: "choice",
    options: [
      "I present a logical argument supported by objective metrics and case studies.",
      "I act as a mediator to find a middle ground that preserves team harmony.",
      "I challenge the status quo and push for the most ambitious, high-risk/high-reward path.",
      "I provide a detailed risk assessment based on historical precedents."
    ],
    dimension: "Big5_Agreeableness"
  },
  {
    id: "learning_breadth_depth",
    text: "Regarding your professional development, do you prefer to be the 'Master of One' or the 'Jack of All Trades'?",
    type: "slider",
    minLabel: "Niche Specialist",
    maxLabel: "Interdisciplinary Generalist",
    dimension: "Big5_Openness"
  },
  {
    id: "output_orientation_preference",
    text: "If you were to spend a week working on a solo project, what would the tangible result most likely be?",
    type: "choice",
    options: [
      "A functional piece of software, a mechanical tool, or a physical craft.",
      "A comprehensive research paper or a complex mathematical proof.",
      "A portfolio of creative sketches, writing, or conceptual designs.",
      "A rigorous project plan, audit report, or database schema."
    ],
    dimension: "RIASEC_Realistic"
  },
  {
    id: "innovation_vs_refinement",
    text: "Do you find more energy in the 'Zero to One' phase (creating something new) or the 'One to N' phase (perfecting something existing)?",
    type: "slider",
    minLabel: "Pioneering Innovation",
    maxLabel: "Systemic Refinement",
    dimension: "Big5_Openness"
  },
  {
    id: "influence_motivation_type",
    text: "What is your preferred mode of influencing the world around you?",
    type: "choice",
    options: [
      "Leading and persuading others toward a collective vision.",
      "Teaching and mentoring others to help them reach their potential.",
      "Developing the underlying technology that others use to build their dreams.",
      "Organizing the information and logistics that allow society to function smoothly."
    ],
    dimension: "RIASEC_Enterprising"
  },
  {
    id: "data_interpretation_style",
    text: "When you look at a massive set of information, what is your cognitive instinct?",
    type: "slider",
    minLabel: "Identifying Patterns",
    maxLabel: "Ensuring Accuracy",
    dimension: "Cognitive_Style_Logic"
  },
  {
    id: "risk_appetite_scenario",
    text: "How do you view career risks such as joining an early-stage startup versus a Fortune 500 company?",
    type: "choice",
    options: [
      "I prefer the stability and clear career ladders of established institutions.",
      "I am drawn to the high-stakes environment where I can own a piece of the outcome.",
      "I value the freedom to experiment and fail without rigid corporate oversight.",
      "I prioritize the opportunity to work on the most complex problems, regardless of company size."
    ],
    dimension: "Work_Environment_Stability"
  },
  {
    id: "concept_vs_execution",
    text: "In a professional context, where does your curiosity naturally lean?",
    type: "slider",
    minLabel: "Theoretical 'Why'",
    maxLabel: "Practical 'How'",
    dimension: "RIASEC_Investigative"
  },
  {
    id: "decision_making_criteria",
    text: "When forced to make a difficult decision with limited time, what do you trust most?",
    type: "choice",
    options: [
      "My intuition and gut feeling regarding the creative potential.",
      "The hard data and quantifiable evidence currently available.",
      "The ethical implications and the impact on the people involved.",
      "Standard operating procedures and established best practices."
    ],
    dimension: "Big5_Conscientiousness"
  },
  {
    id: "public_vs_private_contribution",
    text: "Do you prefer your contributions to be high-visibility (front-facing) or foundational (behind-the-scenes)?",
    type: "slider",
    minLabel: "Foundational / Internal",
    maxLabel: "Public / Client-Facing",
    dimension: "Big5_Extraversion"
  },
  {
    id: "creative_constraint_preference",
    text: "What kind of creative environment allows you to produce your best work?",
    type: "choice",
    options: [
      "A completely 'blank canvas' where I set all the rules and parameters.",
      "A set of strict constraints that challenge me to find an elegant solution within bounds.",
      "A collaborative brainstorming session where ideas are built iteratively.",
      "A technical specification that requires precise translation into a final product."
    ],
    dimension: "RIASEC_Artistic"
  },
  {
    id: "competitive_atmosphere_preference",
    text: "How do you feel about working in an environment where performance is publicly ranked and rewarded?",
    type: "slider",
    minLabel: "Collaborative Harmony",
    maxLabel: "High-Stakes Competition",
    dimension: "Big5_Agreeableness"
  },
  {
    id: "impact_scale_preference",
    text: "Which scale of impact feels more meaningful to you personally?",
    type: "choice",
    options: [
      "Global Scale: Affecting millions of people through broad systems or policies.",
      "Individual Scale: Deeply changing the life of one person at a time.",
      "Organizational Scale: Ensuring a specific company or team operates perfectly.",
      "Intellectual Scale: Advancing the frontier of human knowledge in a specific field."
    ],
    dimension: "RIASEC_Social"
  },
  {
    id: "stress_response_adaptability",
    text: "How do you navigate high-pressure situations with multiple competing deadlines?",
    type: "slider",
    minLabel: "Predictable & Calm",
    maxLabel: "Fast-Paced & Intense",
    dimension: "Work_Environment_Risk"
  }
];