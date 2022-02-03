import crypto from 'crypto';

export const randomBytes = (num = 20) =>
  crypto.randomBytes(num).toString('hex');

export const createHash = (str: string) =>
  crypto.createHash('sha256').update(str).digest('hex');
