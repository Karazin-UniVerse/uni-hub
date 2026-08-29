import type {
  AuthResponse,
  MoodleCourse,
  MoodleGrade,
  MoodleAssignment,
  MoodleCalendarEvent,
  MoodleNotification,
  MoodleCourseSection,
} from '../types/api';

const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.'));

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (!isLocal
    ? 'https://p01--backend--jm9qjnmpm4m2.code.run'
    : 'http://localhost:3001');

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
let refreshFailSubscribers: ((err: Error) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
  refreshFailSubscribers = [];
}

function onRefreshFailed(err: Error) {
  refreshFailSubscribers.forEach((cb) => cb(err));
  refreshFailSubscribers = [];
  refreshSubscribers = [];
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retries?: number
): Promise<{ data: T }> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Only retry idempotent GET requests by default
  const isGet = !options.method || options.method.toUpperCase() === 'GET';
  const maxRetries = retries !== undefined ? retries : isGet ? 2 : 0;

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      // Handle 401 Unauthorized with token refresh
      if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });

            if (refreshRes.ok) {
              const refreshData = (await refreshRes.json()) as AuthResponse;
              if (refreshData.access_token) {
                localStorage.setItem('accessToken', refreshData.access_token);
                onRefreshed(refreshData.access_token);
                headers.Authorization = `Bearer ${refreshData.access_token}`;
                isRefreshing = false;
                // Retry the original request
                return request<T>(endpoint, { ...options, headers }, 0);
              }
            }
            throw new Error('Refresh response not ok or missing access_token');
          } catch (err: unknown) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            onRefreshFailed(err instanceof Error ? err : new Error('Token refresh failed'));
            throw err;
          } finally {
            isRefreshing = false;
          }
        } else {
          // Wait for token refresh and retry
          return new Promise<{ data: T }>((resolve, reject) => {
            refreshFailSubscribers.push(reject);
            subscribeTokenRefresh((newToken: string) => {
              headers.Authorization = `Bearer ${newToken}`;
              request<T>(endpoint, { ...options, headers }, 0)
                .then(resolve)
                .catch(reject);
            });
          });
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { data: undefined as unknown as T };
      }

      const text = await response.text();
      const data = text ? (JSON.parse(text) as T) : (undefined as unknown as T);
      return { data };
    } catch (err) {
      if (attempt < maxRetries) {
        attempt++;
        const delay = attempt * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }

  throw new Error('Request failed');
}

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.access_token) {
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('isLoggedIn', 'true');
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
    }
    return res;
  },
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  },
};

export interface GetAssignmentsParams {
  status?: 'completed' | 'not_completed';
  year?: string;
  semester?: string;
  sortByDate?: 'asc' | 'desc';
  dateFrom?: number;
  dateTo?: number;
}

export const moodleApi = {
  getCourses: () => request<MoodleCourse[]>('/moodle/courses'),
  getGrades: () => request<{ grades: MoodleGrade[] }>('/moodle/grades'),
  getAssignments: (params?: GetAssignmentsParams) => {
    const query = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : '';
    return request<MoodleAssignment[]>(`/moodle/assignments${query}`);
  },
  getEvents: () => request<MoodleCalendarEvent[]>('/moodle/events'),
  getNotifications: () => request<{ notifications: MoodleNotification[] }>('/moodle/notifications'),
  getCourseContents: (courseId: number) =>
    request<MoodleCourseSection[]>(`/moodle/courses/${courseId}/contents`),
  getAssignmentStatus: (assignId: number) =>
    request<unknown>(`/moodle/assignments/${assignId}/status`),
  submitAssignment: (assignId: number, text?: string, fileItemId?: number) =>
    request<unknown>(`/moodle/assignments/${assignId}/submission`, {
      method: 'POST',
      body: JSON.stringify({ text, fileItemId }),
    }),
  uploadFile: (filename: string, filebase64: string) =>
    request<unknown>('/moodle/files/upload', {
      method: 'POST',
      body: JSON.stringify({ filename, filebase64 }),
    }),
};

export interface OrderCertificateDto {
  type: string;
  purpose: string;
  deliveryType?: 'digital_pdf' | 'physical_dean';
}

export interface CertificateResponse {
  id: string;
  type: string;
  purpose: string;
  deliveryType: string;
  status: string;
  verificationCode: string;
  pdfUrl?: string;
  createdAt: string;
}

export interface PaymentTransactionResponse {
  id: string;
  amount: number;
  purpose: string;
  status: string;
  recipientIban: string;
  paidAt?: string;
  createdAt: string;
}

export interface ScholarshipRecordResponse {
  id: string;
  month: number;
  year: number;
  type: string;
  amount: number;
  status: string;
  paidAt?: string;
}

export const certificatesApi = {
  order: (data: OrderCertificateDto) =>
    request<CertificateResponse>('/certificates/order', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getMyCertificates: () =>
    request<CertificateResponse[]>('/certificates/my'),
  getById: (id: string) =>
    request<CertificateResponse>(`/certificates/${id}`),
};

export const financesApi = {
  getPayments: () =>
    request<PaymentTransactionResponse[]>('/finances/payments'),
  getScholarships: () =>
    request<ScholarshipRecordResponse[]>('/finances/scholarships'),
};

export default { request, authApi, moodleApi, certificatesApi, financesApi };
