const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../controllers/config/keys");
const bcrypt = require("bcrypt");

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }

    //else do this
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username }, // equivalent to { username : username }
    });
    let passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    return done(null, passwordsMatch ? user : false);
  } catch (error) {
    done(error);
  }
});
