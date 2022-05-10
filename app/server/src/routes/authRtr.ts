import express from 'express';
const router = express();
import authCtrl from '../controller/authCtrl';
import { protect } from '../middleware/auth';

router.post('/register', authCtrl.register);

router.get(
  ['/verifyRegistration/:token', '/verifyChangedEmail/:token'],
  authCtrl.verifyEmail
);

router.post('/login', authCtrl.logIn);

router.post('/forgotpassword', authCtrl.forgotPassword);

router
  .route('/resetpassword/:resettoken')
  .get(authCtrl.resetPaswordPage)
  .put(authCtrl.resetPasword);

router.get('/forgotidentifier', authCtrl.forgotIdentifier);

/************* Protected routes **************/
router.use(protect);

router.get(['/me', '/'], authCtrl.getMe);

router.put(['/changeemail', '/updateemail'], authCtrl.changeEmail);

router.put(['/', '/update'], authCtrl.updateDetails);

router.patch(
  ['/follow/:authorId', '/unfollow/:authorId'],
  authCtrl.followAuthor
);

export default router;
