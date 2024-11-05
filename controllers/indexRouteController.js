const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { redirectIfLoggedIn } = require("../middleware/auth-middleware");
const hisaabModel = require("../models/hisaabModel");

module.exports.landingPageController = (req, res) => {
    res.render("index", {loggedin: false});
}



module.exports.postRegisterController = async (req, res) => {
    try{
        let{username ,name, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.send("user already existed");


    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    user = await userModel.create({name, username, email, password: hashPassword});

    let token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_KEY)
    res.cookie("token", token).render("profile",{user});
    }catch(err){
        console.log(err);
        req.flash("error", "Internal server error");
        return res.redirect("/register");
    }
}

module.exports.loginController = async (req, res) => {
    try {
      let { email, password } = req.body;
  
      // Find user by email
      let user = await userModel.findOne({ email });
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/");
      }
  
      // Compare the provided password with the stored hashed password
      let result = await bcrypt.compare(password, user.password);
      if (!result) {
        req.flash("error", "Invalid password");
        return res.redirect("/");
      }
  
      // Generate a JWT token
      let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
  
      // Set the token in cookies and render the profile page
      res.cookie("token", token);
      res.redirect("/profile");
    } catch (err) {
      console.error("Login error:", err);
      req.flash("error", "Internal server error");
      return res.redirect("/");
    }
  };

module.exports.logoutController = (req, res) => {
   res.clearCookie("token")
   res.redirect("/");
};


module.exports.profileController = async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate("hisaab"); 
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const order = req.query.byDate ? Number(req.query.byDate) : -1;

    const hisaabs = await hisaabModel.find({
      user: user._id,
    }).sort({ createdAt: order }).exec();

    res.render("profile", {user, hisaabs});
}

module.exports.registerController = (req, res) => {
    res.render("register",{loggedin: false});
}
module.exports.hisaabPageController = (req, res) => {
    res.render("hisaab");
}

