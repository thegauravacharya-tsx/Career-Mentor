export type NotificationType = 'system' | 'milestone' | 'action';

export interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

export const NOTIFICATION_TRIGGERS = {
  ONBOARDING: {
    id: 'onboarding_welcome',
    title: 'Welcome to CareerPath',
    message: 'Congrats on your new account! Start your first assessment to get insights.',
    type: 'system'
  },
  MILESTONE_FIRST_ASSESSMENT: {
    id: 'milestone_first_quiz',
    title: 'Milestone Unlocked',
    message: 'You have completed your first assessment. Your dashboard is now active.',
    type: 'milestone'
  },
  ACTION_SAVE_CAREER: {
    id: 'action_save_career', // Dynamic IDs will append timestamps in the Context
    title: 'Resource Saved',
    message: 'Career path saved successfully to your bookmarks.',
    type: 'action'
  },
  ACTION_SAVE_DEGREE: {
    id: 'action_save_degree',
    title: 'Resource Saved',
    message: 'Degree program saved successfully.',
    type: 'action'
  }
} as const;