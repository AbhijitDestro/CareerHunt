const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const USER_API_END_POINT = `${BASE_URL}/api/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/company`;
export const PUBLIC_JOB_API_END_POINT = `${BASE_URL}/api/public/job`;
export const PUBLIC_COMPANY_API_END_POINT = `${BASE_URL}/api/public/company`;
export const NOTIFICATION_API_END_POINT = `${BASE_URL}/api`;
