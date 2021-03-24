const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const userRoutes = require("./routes/users");

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routers
app.use(userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

db.sequelize.sync({ alter: true });
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
