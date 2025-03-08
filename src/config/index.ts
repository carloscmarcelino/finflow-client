export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const AUTH_SECRET = process.env.AUTH_SECRET as string;
export const IS_CLIENT = typeof window !== 'undefined';
export const INVALID_FORMAT = 'Insira um valor';
export const TOAST_ERROR_MESSAGE = 'ocorreu algum erro, tente novamente mais tarde';
