import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse, sendTokens } from "../../lib/utils";
import User from "../../models/User";

// @desc      changeUsername
// @route     GET /api/v1/auth/changeusername
// @access    Auth,Admin,Public
const updateDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, newPassword, currentPassword } = req.body;
    // @ts-ignore
    const userId = req.user._id;
    const alreadyExist = await User.findOne({
      username,
      _id: { $nin: userId },
    });
    if (alreadyExist) {
      return next(
        ErrorResponse(400, {
          username: `${username} already registered.`,
        })
      );
    }
    let user = await User.findById(userId).select("+password");
    user.username = username || user.username;
    let message = "";
    const chechPwd = () =>
      new Promise(async (resolve) => {
        if (!currentPassword) return resolve(true);
        const isPwdMatch = await user.matchPassword(currentPassword);
        if (isPwdMatch) {
          user.password = newPassword;
          resolve(true);
        } else {
          message = "Passwod does not match";
          resolve(true);
        }
      });

    chechPwd().finally(async () => {
      sendTokens(await user.save(), 200, res, message);
    });
  }
);

export default updateDetails;
