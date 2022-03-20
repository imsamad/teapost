import jwt, { SignOptions } from "jsonwebtoken";
import ms from "ms";

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpire = process.env.JWT_EXPIRE as string;
const jwtIssuer = process.env.JWT_ISSUER as string;

const jwtGlobalOptions = (expiresIn?: string): SignOptions => {
  return {
    issuer: jwtIssuer,
    expiresIn: expiresIn ? ms(expiresIn) : ms(jwtExpire),
  };
};

export const signJwt = (
  data: any,
  options?: SignOptions,
  secret?: string
): string => {
  return jwt.sign(data, secret || jwtSecret, {
    ...jwtGlobalOptions(options?.expiresIn as string),
    ...options,
  });
};

export const decodeJwt = (
  token: string,
  options?: SignOptions,
  secret?: string
): object | boolean => {
  try {
    const decoded: {} = jwt.verify(token, secret || jwtSecret, {
      ...jwtGlobalOptions(options?.expiresIn as string),
      ...options,
    });
    return decoded;
  } catch (error) {
    console.log("Error from jwt decode ", error);
    return false;
  }
};
