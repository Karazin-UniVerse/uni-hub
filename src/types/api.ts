export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    moodleId?: string;
  };
}

export interface MoodleCourse {
  id: number;
  fullname: string;
  shortname: string;
  summary: string;
  progress?: number | null;
}

export interface MoodleGrade {
  courseid: number;
  grade: string;
  rawgrade: string;
}

export interface MoodleAssignment {
  id: number;
  cmid: number;
  course: number;
  name: string;
  duedate: number;
  grade: number;
  intro?: string;
}

export interface MoodleCalendarEvent {
  id: number;
  name: string;
  description: string;
  timestart: number;
  timeduration: number;
  courseid: number;
  eventtype: string;
}

export interface MoodleNotification {
  id: number;
  subject: string;
  text: string;
  timecreated: number;
  read: boolean;
}

export interface MoodleCourseModule {
  id: number;
  name: string;
  modname: string;
  url?: string;
}

export interface MoodleCourseSection {
  id: number;
  name: string;
  summary: string;
  modules: MoodleCourseModule[];
}
