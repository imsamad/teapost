import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse, sendTokens } from "../../lib/utils";
import User from "../../models/User";

// @desc      Update Details
// @route     GET /api/v1/auth/update
// @access    Auth
const updateDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      username,
      newPassword,
      currentPassword,
      fullName,
      tagLines,
      profilePic,
    } = req.body;

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
    let message: any = {};
    let isUsernameExist = () =>
      new Promise(async (resolve) => {
        let usernameExist = await User.findOne({ username });
        if (usernameExist) return resolve(false);
        // @ts-ignore
        resolve(true);
      });

    if (username) {
      let usernameExist = await User.findOne({ username });
      if (usernameExist) {
        message.username = "Username alreday registered";
      }
      // @ts-ignore
      else user.username = username ?? user?.username;
    }

    // @ts-ignore
    // user.username=username?await isUsernameExist()?
    // @ts-ignore
    user.fullName = fullName ?? user?.fullName;
    // @ts-ignore
    user.tagLines = tagLines ?? user?.tagLines;
    // @ts-ignore
    user.profilePic = profilePic ?? user?.profilePic;

    const moveForward = async () =>
      // @ts-ignore
      sendTokens(await user.save(), 200, res, message);

    if (!currentPassword || !newPassword) return moveForward();

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      moveForward();
    } else {
      return next(
        ErrorResponse(400, {
          currentPassword: "Password is not valid.",
        })
      );
    }
  }
);

export default updateDetails;
