const express = require("express");
const router = express.Router();
const {isLoggedIn, redirectIfLoggedIn} = require("../middleware/auth-middleware");
const {createHisaabController, readHisaabController, editPostHisaabController, verifyPasscodeController   , editHisaabController, deleteHisaabController , hisaabLoader} = require("../controllers/hisaabRouteController");

router.get("/view/:id", isLoggedIn, readHisaabController);
router.get("/create", isLoggedIn, hisaabLoader);
router.post("/create", isLoggedIn, createHisaabController);
router.get("/delete/:id", isLoggedIn, deleteHisaabController); 
router.get("/edit/:id", isLoggedIn, editHisaabController);
router.post("/edit/:id", isLoggedIn, editPostHisaabController);
router.post("/verify/:id", isLoggedIn, verifyPasscodeController);

 



module.exports = router