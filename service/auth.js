const passport = require("passport");
const fs = require("fs");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

User = JSON.parse(fs.readFileSync("Users.json", "utf8"));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      const name = profile.given_name;
      const email = profile.email;
      const picture = profile.picture;
      const password = profile.id;
      if (
        User.find((user) => user.name === name && user.password === password)
      ) {
        return done(null, profile);
      } else {
        User.push({ name, email, picture, password, todos: [] });
        fs.writeFileSync("Users.json", JSON.stringify(User));
        return done(null, profile);
      }

      //   console.log(profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
