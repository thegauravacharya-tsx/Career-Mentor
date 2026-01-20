"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { NOTIFICATION_TRIGGERS, NotificationTemplate } from '@/lib/notifications-config';

// Extended Notification Item includes timestamp and read status
export interface NotificationItem extends NotificationTemplate {
  uniqueId: string; // Unique ID for rendering list
  timestamp: Date;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
  triggerNotification: (template: NotificationTemplate) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ 
  children, 
  userCreatedAt, 
  assessmentCount 
}: { 
  children: React.ReactNode;
  userCreatedAt?: Date; // Passed from Server Component layout
  assessmentCount?: number;
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // 1. Load persisted read state from LocalStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('careerpath_notifications');
    const parsedState: NotificationItem[] = savedState ? JSON.parse(savedState) : [];
    
    // Check for System Triggers (Onboarding)
    // Logic: If user is new (< 24 hours) and we haven't shown this yet
    const isNewUser = userCreatedAt && (new Date().getTime() - new Date(userCreatedAt).getTime()) < 86400000;
    const hasWelcome = parsedState.some(n => n.id === NOTIFICATION_TRIGGERS.ONBOARDING.id);

    let initialNotifications = [...parsedState];

    if (isNewUser && !hasWelcome) {
        initialNotifications.unshift(createItem(NOTIFICATION_TRIGGERS.ONBOARDING));
    }

    // Check for Milestone (First Assessment)
    const hasMilestone = parsedState.some(n => n.id === NOTIFICATION_TRIGGERS.MILESTONE_FIRST_ASSESSMENT.id);
    if (assessmentCount && assessmentCount > 0 && !hasMilestone) {
        initialNotifications.unshift(createItem(NOTIFICATION_TRIGGERS.MILESTONE_FIRST_ASSESSMENT));
    }

    setNotifications(initialNotifications);
  }, [userCreatedAt, assessmentCount]);

  // Helper to create a notification object
  const createItem = (template: NotificationTemplate): NotificationItem => {
    return {
        ...template,
        uniqueId: `${template.id}_${Date.now()}`,
        timestamp: new Date(),
        isRead: false
    };
  };

  // 2. Persist to LocalStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
        localStorage.setItem('careerpath_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Actions
  const triggerNotification = (template: NotificationTemplate) => {
    setNotifications(prev => [createItem(template), ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, triggerNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
};