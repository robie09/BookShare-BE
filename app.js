const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

// DB
const db = require("./db/models");

// Routes
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const bookRoutes = require("./routes/book");

// Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// REVIEW: Organize imports
// REVIEW: media folder should be added to gitignore

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// REVIEW: Inconsistincy
app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/book", bookRoutes);
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

//db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
