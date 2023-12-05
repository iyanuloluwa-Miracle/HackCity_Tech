const router = require('express').Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/userAuth');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('user/signup', authController.signupUser);
router.post('user/login', authController.loginUser);
router.post('user/logout', authController.logoutUser);
router.post('user/forgot-password', authController.forgotPassword);
router.post('user/reset-password', authController.resetPassword);
module.exports = router;
