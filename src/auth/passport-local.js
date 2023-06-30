import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as LocalStrategy } from "passport-local";
// passport-github2
import { Strategy as GitHubStrategy } from "passport-github2";
import MongoDBUsers from "../dao/MongoDBUsers.js";
import { encryptPassword, comparePassword } from "../config/bcrypt.js";
const db = new MongoDBUsers();

const localStrategy = LocalStrategy;
const githubStrategy = GitHubStrategy;

// variables de entorno
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  "register",
  new localStrategy(
    {
 
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, 
    },
    async (req, username, password, done) => {
      const usuarioSaved = await db.getUserByUsername({ username });
      if (usuarioSaved) {
        req.flash(
          "errorMessage",
          "El usuario ya existe en nuestra Base de datos. Por favor, elija otro nombre de usuario."
        );
        return done(null, false);
      } else {
        const hashPass = await encryptPassword(password);
        const newUser = {
          username: username,
          password: hashPass,
        };
        const response = await db.create(newUser);
        console.log("Nuevo usuario registrado: ", response);
        return done(null, response);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, 
    },
    async (req, username, password, done) => {


      const usuarioSaved = await db.getUserByUsername({ username });
      if (!usuarioSaved) {
        req.flash(
          "errorMessage",
          "El usuario ingresado no existe. Por favor, regístrese."
        );
        return done(null, false);
      }
      const isTruePassword = await comparePassword(
        password,
        usuarioSaved.password
      );
      if (!isTruePassword) {
        req.flash(
          "errorMessage",
          "La contraseña ingresada es incorrecta. Por favor, intente nuevamente."
        );
        return done(null, false);
      }
      req.session.username = usuarioSaved.username;

      return done(null, usuarioSaved);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id); // _id de mongo
});

passport.deserializeUser(async (id, done) => {
  const user = await db.getOne(id);
  done(null, user);
});


function isAuth(req, res, next) {

  if (req.isAuthenticated()) {

    return next();
  }
  res.redirect("/auth/login");
}

/** AUTHENTICATION - GITHUB */
passport.use(
  new githubStrategy(
    {
      clientID: '6eecce92dba6280372f0',
      clientSecret: '18c53173b60dd85f804d4ed3e8f9c0a95871e3de',
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {

      const user = {
        username: profile.username,
        password: null, 
      };
      const userSaved = await db.getUserByUsername({ username: user.username });
      if (userSaved) {
        return done(null, userSaved);
      } else {
        const response = await db.create(user);
        return done(null, response);
      }
    }
  )
);

export { passport, isAuth };