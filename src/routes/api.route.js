const router = require('express').Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/userAuth');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
