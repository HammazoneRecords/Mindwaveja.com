import { Resend } from 'resend';

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined in environment variables');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/** @deprecated use getResend() inside handlers — not at module level */
export const resend = { send: (...args: Parameters<Resend['emails']['send']>) => getResend().emails.send(...args) };

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@mindwaveja.com';
