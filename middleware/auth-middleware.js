const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


module.exports.isLoggedIn = async (req, res, next) => {
   try{
    let token = req.cookies.token;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({email: decoded.email}).select("-password");
        if(!user) {
            req.flash("error", "User not found. Please login again.");
            return res.redirect("/");
        }
        
        req.user = user;
        return next()

    } else {
        req.flash("error", "Please login first");
        return res.redirect("/");
    }
   }catch(error){
    console.log("error from auth middleware", error);
    req.flash("error", "Please login first");
    return res.redirect("/");
   }
}

module.exports.redirectIfLoggedIn = (req, res, next) => {
    let token = req.cookies.token;
    
    try{
        if (token) {
           jwt.verify(token, process.env.JWT_KEY);
           res.redirect("/profile")
        }else{
            return next()
        }
    
    }catch(error){
        console.log(error);
        return next();
    }  
}