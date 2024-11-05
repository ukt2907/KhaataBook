const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRoute = require("./routes/indexRoute");
const hisaabRoute = require("./routes/hisaabRoute");
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');

let db = require("./config/mongoose-connection");

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true
}));


app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
  });



app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");


app.use("/", indexRoute);
app.use("/hisaab", hisaabRoute);


app.listen(3000)