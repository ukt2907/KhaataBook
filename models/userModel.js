const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength:4
    },
    hisaab: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hisaabModel'
    }],
}, {
    timestamps: true
});



module.exports = mongoose.model("user", userSchema);