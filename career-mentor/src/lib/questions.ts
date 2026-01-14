// src/lib/questions.ts

export type QuestionType = 'choice' | 'slider';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[]; // For multiple choice
  minLabel?: string;  // For sliders
  maxLabel?: string;  // For sliders
}

export const CAREER_QUESTIONS: Question[] = [
  {
    id: 'interests',
    text: 'Which of these subjects interests you the most?',
    type: 'choice',
    options: ['Technology & Coding', 'Art & Design', 'Business & Finance', 'Science & Biology', 'Helping People', 'Building Things']
  },
  {
    id: 'work_style',
    text: 'How do you prefer to work?',
    type: 'choice',
    options: ['Independently', 'In a Team', 'Leading a Group']
  },
  {
    id: 'creativity_logic',
    text: 'Do you lean more towards Creativity or Logic?',
    type: 'slider',
    minLabel: 'Pure Logic',
    maxLabel: 'Pure Creativity'
  },
  {
    id: 'risk_tolerance',
    text: 'How comfortable are you with risk and uncertainty?',
    type: 'slider',
    minLabel: 'Prefer Stability',
    maxLabel: 'Love Risk'
  },
  {
    id: 'social_interaction',
    text: 'How much social interaction do you want in your daily job?',
    type: 'slider',
    minLabel: 'None',
    maxLabel: 'Constant'
  }
];