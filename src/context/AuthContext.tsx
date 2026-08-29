import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, moodleApi } from '../services/api';
import type {
  MoodleCourse,
  MoodleGrade,
  MoodleAssignment,
  MoodleCalendarEvent,
  MoodleNotification,
} from '../types/api';

interface User {
  id: string;
  email: string;
  name?: string;
  moodleId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  courses: MoodleCourse[];
  grades: MoodleGrade[];
  assignments: MoodleAssignment[];
  events: MoodleCalendarEvent[];
  notifications: MoodleNotification[];
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [courses, setCourses] = useState<MoodleCourse[]>([]);
  const [grades, setGrades] = useState<MoodleGrade[]>([]);
  const [assignments, setAssignments] = useState<MoodleAssignment[]>([]);
  const [events, setEvents] = useState<MoodleCalendarEvent[]>([]);
  const [notifications, setNotifications] = useState<MoodleNotification[]>([]);

  const refreshData = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const [coursesRes, gradesRes, assignsRes, eventsRes, notifsRes] = await Promise.allSettled([
        moodleApi.getCourses(),
        moodleApi.getGrades(),
        moodleApi.getAssignments(),
        moodleApi.getEvents(),
        moodleApi.getNotifications(),
      ]);

      if (coursesRes.status === 'fulfilled' && coursesRes.value.data) {
        setCourses(coursesRes.value.data);
      }
      if (gradesRes.status === 'fulfilled' && gradesRes.value.data?.grades) {
        setGrades(gradesRes.value.data.grades);
      }
      if (assignsRes.status === 'fulfilled' && assignsRes.value.data) {
        setAssignments(assignsRes.value.data);
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value.data) {
        setEvents(eventsRes.value.data);
      }
      if (notifsRes.status === 'fulfilled' && notifsRes.value.data?.notifications) {
        setNotifications(notifsRes.value.data.notifications);
      }
    } catch (e) {
      console.warn('Failed to load Moodle live data, continuing with fallback:', e);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn, refreshData]);

  const login = async (emailOrUsername: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(emailOrUsername, pass);
      setIsLoggedIn(true);
      if (res.data?.user) {
        setUser(res.data.user);
      }
      await refreshData();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      setIsLoggedIn(false);
      setCourses([]);
      setGrades([]);
      setAssignments([]);
      setEvents([]);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        login,
        logout,
        courses,
        grades,
        assignments,
        events,
        notifications,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
