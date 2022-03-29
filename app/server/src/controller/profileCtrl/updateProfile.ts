import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import Profile from "../../models/Profile";

// @desc      updateProfile
// @route     GET /api/v1/auth/updateprofile
// @access    Auth,Admin,Public

const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, tagLines, profilePic } = req.body;
    // @ts-ignore
    const userId = req.user._id;

    const profile = await Profile.findByIdAndUpdate(
      userId,
      {
        tagLines,
        fullName,
        profilePic,
      },
      {
        new: true,
      }
    );

    return res.json({
      status: "ok",
      profile,
    });
  }
);

export default updateProfile;
