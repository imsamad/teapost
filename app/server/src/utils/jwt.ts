import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const signJwt = (data: any): string => {
  return jwt.sign(data, jwtSecret);
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
