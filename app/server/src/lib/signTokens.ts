import { UserDocument } from "../models/User";
import { signJwt } from "./jwt";
import RefreshTokenModel from "../models/RefreshToken";
import ms from "ms";

type Token = {
  accessToken: String;
  refreshToken: String;
};

export const signTokens = async (user: UserDocument): Promise<Token> => {
  const userId: UserDocument["_id"] = user.id || user._id;

  // let refreshToken: String;
  // const alreadyExist = await RefreshTokenModel.findOne({ userId });
  // console.log('alreadyExist ', alreadyExist);

  /**
   * If found
   * a.) if exprire update
   * b.) return stored token as refreshToken
   * else  notFound,then create
   */

  /*
  if (alreadyExist) {
    let crntYear: any = Date.now();
    let oneYear = ms('1y');
    let isExpired: boolean =
      crntYear - alreadyExist.timsestamp_ms > oneYear ? true : false;

    if (!isExpired) {
      refreshToken = alreadyExist.token;
    } else {
      refreshToken = signJwt({ id: userId }, { expiresIn: '1y' });
      await alreadyExist.update({ token: refreshToken });
    }
  } else {
    refreshToken = signJwt({ id: userId }, { expiresIn: '1y' });
    await RefreshTokenModel.create({ userId, token: refreshToken });
  }
  */
  const tokens: Token = {
    accessToken: signJwt(
      { userId },
      {
        expiresIn: "7d",
      }
    ),
    refreshToken: "RefreshToken",
  };

  return tokens;
};
