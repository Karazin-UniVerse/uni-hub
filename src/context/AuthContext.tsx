import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authApi, moodleApi } from '../services/api';
import type {
  MoodleCourse,
  MoodleGrade,
  MoodleAssignment,
  MoodleCalendarEvent,
  MoodleNotification,
} from '../types/api';

export type MoodleSyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

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
  syncStatus: MoodleSyncStatus;
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
  const [syncStatus, setSyncStatus] = useState<MoodleSyncStatus>('idle');

  const [courses, setCourses] = useState<MoodleCourse[]>([]);
  const [grades, setGrades] = useState<MoodleGrade[]>([]);
  const [assignments, setAssignments] = useState<MoodleAssignment[]>([]);
  const [events, setEvents] = useState<MoodleCalendarEvent[]>([]);
  const [notifications, setNotifications] = useState<MoodleNotification[]>([]);

  const sessionGenRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearAllData = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setSyncStatus('idle');
    setCourses([]);
    setGrades([]);
    setAssignments([]);
    setEvents([]);
    setNotifications([]);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }, []);

  const refreshData = useCallback(async () => {
    if (!isLoggedIn) {
      setSyncStatus('idle');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    sessionGenRef.current += 1;
    const currentGen = sessionGenRef.current;

    setSyncStatus('syncing');

    try {
      const [coursesRes, gradesRes, assignsRes, eventsRes, notifsRes] = await Promise.allSettled([
        moodleApi.getCourses(),
        moodleApi.getGrades(),
        moodleApi.getAssignments(),
        moodleApi.getEvents(),
        moodleApi.getNotifications(),
      ]);

      // Ignore stale responses from previous sessions or aborts
      if (sessionGenRef.current !== currentGen) {
        return;
      }

      let hasSuccess = false;

      if (coursesRes.status === 'fulfilled' && coursesRes.value.data) {
        setCourses(coursesRes.value.data);
        hasSuccess = true;
      }
      if (gradesRes.status === 'fulfilled' && gradesRes.value.data?.grades) {
        setGrades(gradesRes.value.data.grades);
        hasSuccess = true;
      }
      if (assignsRes.status === 'fulfilled' && assignsRes.value.data) {
        setAssignments(assignsRes.value.data);
        hasSuccess = true;
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value.data) {
        setEvents(eventsRes.value.data);
        hasSuccess = true;
      }
      if (notifsRes.status === 'fulfilled' && notifsRes.value.data?.notifications) {
        setNotifications(notifsRes.value.data.notifications);
        hasSuccess = true;
      }

      setSyncStatus(hasSuccess ? 'synced' : 'error');
    } catch {
      if (sessionGenRef.current === currentGen) {
        setSyncStatus('error');
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    } else {
      setSyncStatus('idle');
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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    sessionGenRef.current += 1;

    try {
      await authApi.logout();
    } catch {
      // Ignore network errors during logout
    } finally {
      clearAllData();
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        syncStatus,
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
