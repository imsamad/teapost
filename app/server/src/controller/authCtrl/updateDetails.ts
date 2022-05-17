import { Request, Response, NextFunction } from 'express';
import createToken from '../../lib/createToken';
import sendEmail from '../../lib/sendEmail';
import { asyncHandler, sendTokens } from '../../lib/utils';
import User from '../../models/User';

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
      newEmail,
    } = req.body;

    // @ts-ignore
    const userId = req.user._id;

    let warnings: any = {};

    let query = User.findById(userId);
    if (currentPassword && newPassword) query.select('+password');
    let user: any = await query;

    // @ts-ignore
    user.fullName = fullName ?? user?.fullName;
    // @ts-ignore
    user.tagLines = tagLines ?? user?.tagLines;
    // @ts-ignore
    user.profilePic = profilePic ?? user?.profilePic;

    const usernameAlreadyExist = () =>
      new Promise(async (resolve) => {
        if (!username) return resolve(true);

        if (username && user.username == username) {
          // @ts-ignore
          user.username = req.user.username;
          resolve(false);
        } else {
          const alreadyExist = await User.findOne({
            username,
            _id: { $nin: userId },
          });
          if (alreadyExist) {
            warnings.username = 'Username already registered';
            resolve(true);
          } else {
            user.username = username;
            resolve(false);
          }
        }
      });

    const changePwd = () =>
      new Promise(async (resolve) => {
        if (!currentPassword || !newPassword) resolve(true);
        else {
          if (await user.matchPassword(currentPassword)) {
            user.password = newPassword;
            resolve(true);
          } else {
            warnings.password = 'Password does not match';
            resolve(false);
          }
        }
      });

    await usernameAlreadyExist();
    await changePwd();

    const changeEmail = () =>
      new Promise(async (resolve) => {
        if (!newEmail) return resolve(true);
        if (newEmail == user.email) return resolve(true);
        else {
          let alreadyExist = await User.findOne({ email: newEmail });
          warnings.newEmail = {};
          if (alreadyExist) {
            warnings.newEmail.message = `${newEmail} already registered.`;
            return resolve(false);
          }

          const { redirectUrl, message, token } = await createToken(req, {
            newEmail,
            type: 'verifyChangedEmail',
            userId: user._id,
          });

          let isEmailService: boolean =
            'true' === process.env.IS_EMAIL_SERVICE!;

          if (!isEmailService) {
            warnings.newEmail.redirectUrl = redirectUrl;
            warnings.newEmail.message = `Verify your email by visiting this link valid for ${process.env.TOKEN_EXPIRE}.`;
            return resolve(true);
          }

          let emailSentResult = await sendEmail(
            user.email,
            redirectUrl,
            message
          );

          if (!emailSentResult) {
            await token.delete();
            warnings.newEmail.messsage =
              "Email can't  be changed right now, plz try again.";
            return resolve(false);
          } else {
            warnings.newEmail.redirectUrl = redirectUrl;
            warnings.newEmail.message = `Verify your email by visiting this link valid for ${process.env.TOKEN_EXPIRE}.`;
            return resolve(true);
          }
        }
      });

    await changeEmail();
    user = await user.save();

    return sendTokens(user, 200, res, warnings);
  }
);

export default updateDetails;
