const express = require("express");
const router = express.Router();
const {landingPageController,
        profileController, 
        loginController, 
        registerController, 
        postRegisterController,
        logoutController,
      } = require("../controllers/indexRouteController");
const {isLoggedIn, redirectIfLoggedIn} = require("../middleware/auth-middleware");

router.get("/", redirectIfLoggedIn ,landingPageController);
router.get("/register", registerController);
router.post("/register", postRegisterController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/profile",isLoggedIn,profileController);


module.exports = router;