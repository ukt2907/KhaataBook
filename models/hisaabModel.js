const mongoose = require("mongoose");


const hisaabSchema = new mongoose.Schema({
    title: String,
    data:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    editable:Boolean,
    shareable:Boolean,
    encrypted:Boolean,
    passcode:String
  },{
    timestamps: true
  });



module.exports = mongoose.model("hisaabModel", hisaabSchema);