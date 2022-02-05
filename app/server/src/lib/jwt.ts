import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpire = process.env.JWT_EXPIRE as string;
const jwtExpreRefresh = process.env.JWT_EXPIRE_REFRESH as string;
const jwtIssuer = process.env.JWT_ISSUER as string;

export const signJwt = (data: any, options?: SignOptions): string => {
  const expiresIn: string = options?.expiresIn
    ? (options?.expiresIn as string)
    : (jwtExpire as string);

  return jwt.sign(data, jwtSecret, {
    issuer: jwtIssuer,
    ...options,
    expiresIn: ms(expiresIn),
  });
};

export const decodeJwt = (token: string): object | boolean => {
  try {
    const decoded: {} = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.log('Error from jwt decode ', error);
    return false;
  }
};
