if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  console.log(process.env.CLOUD_NAME);
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbURL = process.env.ATLASDB_URL;

store = MongoStore.create({
  crypto: { secret: process.env.SECRET },
  mongoUrl: dbURL,
  touchAfter: 24 * 60 * 60,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE" , err);
})

const sessionOptions = {
  store,
  resave: false,
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};




// app.get("/", (req, res) => {
//   res.send("hi, im the root");
// });

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

main()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbURL);
}
 
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  console.log("Requested URL:", req.originalUrl);
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listening on the port 8080");
});
