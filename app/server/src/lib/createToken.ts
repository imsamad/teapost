import { Request } from 'express';
import Token, { TokenDocument } from '../models/Token';
import { UserDocument } from '../models/User';
import { decodeJwt, signJwt } from './jwt';
import { createHash, randomBytes } from './utils';

const messages = {
  resetPassword: `You are receiving this email because you (or someone else) has requested the reset of a password.`,
  verifyChangedEmail: `You are receiving this email because you (or someone else) has requested to change your email.`,
  verifyRegistration: `You are receiving this email because you need to confirm your email address.`,
};

const createToken = async (
  req: Request,
  token: {
    type: TokenDocument['type'];
    userId: UserDocument['_id'];
    newEmail?: TokenDocument['newEmail'];
  }
) => {
  let newToken: TokenDocument;
  try {
    // randomBytes => hashedBytes => JWTised
    const verifyToken = randomBytes(20);

    const hashedVerifyToken = createHash(verifyToken);

    const jwtVerifyToken = signJwt(
      { token: verifyToken },
      process.env.JWT_TOKEN_SECRET!,
      {
        expiresIn: process.env.TOKEN_EXPIRE,
      }
    );

    newToken = await Token.create({
      token: hashedVerifyToken,
      ...token,
    });
    const redirectUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/${
      newToken.type
    }/${jwtVerifyToken}`;

    return { redirectUrl, token: newToken, message: messages[newToken.type] };
  } catch (err: any) {
    console.log('error while  creating token ', err);
    // @ts-ignore
    if (newToken) await newToken.delete();
    throw new Error('Unable to process your request please try again.');
  }
};

export const retriveToken = async (jwtCodedToken: string) => {
  try {
    const { token: decodedVerifyToken }: any = decodeJwt(
      jwtCodedToken,
      process.env.JWT_TOKEN_SECRET!
    );

    if (!decodedVerifyToken) throw new Error('No token exist');
    const hashedVerifyToken = createHash(decodedVerifyToken);

    let token = await Token.findOne({
      token: hashedVerifyToken,
    });

    if (!token) throw new Error('No token exist');

    return token;
  } catch (err: any) {
    console.log('Error from retriveToken ', err);
    throw new Error('No token exist');
  }
};

export default createToken;
