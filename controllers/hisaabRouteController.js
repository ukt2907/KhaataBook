const hisaabModel = require("../models/hisaabModel"); 
const userModel = require("../models/userModel"); 


module.exports.hisaabLoader = async (req, res, next) => {
    res.render("create");
}
module.exports.createHisaabController= async (req, res) => {
    let {title, description, editable, shareable, encrypted, passcode} = req.body;

    encrypted = encrypted === "on" ? true : false;
    shareable = shareable === "on" ? true : false;
    editable = editable === "on" ? true : false;

    let hisaabCreated = await hisaabModel.create({title, user: req.user._id, data: description, editable, shareable, encrypted, passcode});
    

    let user = await userModel.findOne({email:req.user.email});
    user.hisaab.push(hisaabCreated._id);
    await user.save();

    res.redirect("/profile");
}

module.exports.readHisaabController = async (req, res) => {
    const id = req.params.id;

    let hisaab = await hisaabModel.findById(id)

    if(hisaab.encrypted) {
        return res.render("passcode", {hisaab});
    }
    res.render("hisaab", {hisaab});

}

module.exports.deleteHisaabController = async (req, res) => {
    const id = req.params.id;
    await hisaabModel.findByIdAndDelete(id);
    res.redirect("/profile");
}

module.exports.editHisaabController = async (req, res) => {
    const id = req.params.id;
    let hisaab = await hisaabModel.findById(id);
    res.render("edithisaab", {hisaab, user: req.user});  
}

module.exports.editPostHisaabController = async (req, res) => {
    const id = req.params.id;
    const hisaab = await hisaabModel.findById(id);

    if(!hisaab) {
        res.redirect("/profile");
    }
    
    hisaab.title = req.body.title;
    hisaab.data = req.body.description;
    hisaab.encrypted = req.body.encrypted === "on" ? true : false;
    hisaab.shareable = req.body.shareable === "on" ? true : false;
    hisaab.editpermissions = req.body.editpermissions === "on" ? true : false;
    await hisaab.save();
    res.redirect("/profile");
    
}

module.exports.verifyPasscodeController = async (req, res) => {
    try{
        const id = req.params.id;
    const passcode = req.body.passcode;

    let hisaab = await hisaabModel.findById(id);

    if(hisaab.passcode !== passcode) {
        res.redirect("/profile")
    }else{
        console.log("error");
    }
    res.render("hisaab",{hisaab});
    }catch(error){
        console.log(error);
    }

}