import { Request } from "express";
import Token, { TokenDocument } from "../models/Token";
import { UserDocument } from "../models/User";
import { decodeJwt, signJwt } from "./jwt";
import { createHash, randomBytes } from "./utils";

const messages = {
  resetpassword: `You are receiving this email because you (or someone else) has requested the reset of a password.`,
  changeemail: `You are receiving this email because you (or someone else) has requested to change your email.`,
  verifyemail: `You are receiving this email because you need to confirm your email address.`,
};

const createToken = async (
  type: TokenDocument["type"],
  req: Request,
  userId: UserDocument["_id"],
  tempData: TokenDocument["tempData"]
) => {
  let token: TokenDocument;
  try {
    const verifyToken = randomBytes(20);

    const hashedVerifyToken = createHash(verifyToken);

    const jwtVerifyToken = signJwt(
      { token: verifyToken },
      {},
      process.env.JWT_TOKEN_SECRET!
    );

    const redirectUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/${type}/${jwtVerifyToken}`;
    token = await Token.create({
      type,
      token: hashedVerifyToken,
      userId,
      tempData,
    });
    return { redirectUrl, token, message: messages[type] };
  } catch (err: any) {
    // @ts-ignore
    token && (await token.delete());
    return err;
  }
};

export const retriveToken = async (
  type: TokenDocument["type"],
  jwtCodedToken: string
) => {
  try {
    const { token: decodedVerifyToken }: any = decodeJwt(
      jwtCodedToken,
      {},
      process.env.JWT_TOKEN_SECRET!
    );

    if (!decodedVerifyToken) return { status: false };
    const hashedVerifyToken = createHash(decodedVerifyToken);

    let token = await Token.findOne({
      token: hashedVerifyToken,
      type,
    });
    if (!token) return { token, status: false };
    return { token, status: true };
  } catch (err: any) {
    return { ...err, status: false };
  }
};

export default createToken;
