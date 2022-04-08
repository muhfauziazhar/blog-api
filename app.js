var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var passport = require("passport");
// var session = require("express-session");

// var indexRouter = require("./routes/index");
const authRouter = require('./routes/auth')
//var usersRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
*/

app.use("/", authRouter);
//app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);

//require("./app/config/passport/passport.js")(passport, models.user);

module.exports = app;
