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

    let user = await User.findById(userId);

    // @ts-ignore
    user.username = username || user?.username;
    // @ts-ignore
    user.fullName = fullName || user?.fullName;

    // @ts-ignore
    user.tagLines = tagLines || user?.tagLines;
    // @ts-ignore
    user.profilePic = profilePic || user?.profilePic;
    let message = "";
    const moveForward = async () =>
      // @ts-ignore
      sendTokens(await user.save(), 200, res, { currentPassword: message });

    if (currentPassword && newPassword) {
      // @ts-ignore
      if (await user.matchPassword(currentPassword))
        // @ts-ignore
        user.password = currentPassword;
      else {
        message = "Password does not match";
        moveForward();
      }
    } else moveForward();
  }
);

export default updateDetails;
