const router = require("express").Router();
const userController = require("../controllers/authController");



router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

// Define user routes
router.post("/user/signup", userController.signupUser);
router.post("/user/login", userController.signInUser);
router.post("/user/logout", userController.logoutUser);
router.post('/user/forgot-password', userController.forgotPassword);
router.post('/user/reset-password', userController.resetPassword);




module.exports = router;
