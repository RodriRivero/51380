import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as LocalStrategy } from "passport-local";
// passport-github2
import { Strategy as GitHubStrategy } from "passport-github2";
import MongoDBUsers from "../dao/MongoDBUsers.js";
import { encryptPassword, comparePassword } from "../config/bcrypt.js";
import CartService from "../services/carts.service.js";
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
 
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, 
    },
    async (req, username, password, done) => {
     try{
      const{  firstName,lastName,age}=req.body
      console.log("body",req.body);
       const usuarioSaved = await db.getUserByEmail( username );
       console.log("usuarioSaved",usuarioSaved);
      if (usuarioSaved) {

        req.flash(  "error","El usuario ya existe en nuestra Base de datos. Por favor, elija otro nombre de usuario.")
console.log("ya existe ese usuario");
          return done(null, false);
      } else {
        const hashPass = await encryptPassword(password);
        console.log("pass",hashPass)
        const cartService = new CartService
        const newCart = await cartService.createOne();
        const cartId = newCart._id.toString();
        
        const newUser = {
          firstName,
          lastName,
          email:username,
          password:hashPass,
          age,
          cartId}
       
        if(username === 'adminCoder@coder.com' && password === 'adminCod3r123'){
          newUser.role= "admin"
        }
        const response = await db.create(newUser);
        console.log("Nuevo usuario registrado: ", response);
        return done(null, response);
      }
    }catch(error){
      console.log(error);
      return done(error)
    }
     }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        // const { email, password } = req.body;
        if (!username || !password) {
          req.flash("error", "Por favor indique su email y password.");
          return done(null, false);
        }

        const user = await db.getUserByEmail( username );
        if (!user) {
          req.flash("error", "Por favor indique su email y password.");
          return done(null, false);
        }

        if (!comparePassword(password, user.password)) {
          req.flash(
            "error",
            "Por favor indique un email o password correcto."
          );
          return done(null, false);
          }
          console.log("sesion",user)
        return done(null, user);
      } catch (error) {
        return done(new Error(error));
      }
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
  console.log("req.isAuthenticated()",req.isAuthenticated());
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
      try{
        const email= profile.email || `${profile._json.login}@github.com.ar` 
      const userSaved = await db.getUserByEmail(email)
      console.log(userSaved);
      if (userSaved) {
        return done(null, userSaved);
      } else {
      const cartService = new CartService
      const newCart = await cartService.createOne();
      const cartId = newCart._id.toString();
      const hashPass = await encryptPassword("passwordGitHub");
      const user = {
        firstName:profile._json.name ||profile._json.login|| 'NoName',
        lastName:profile._json.login|| 'NoName' ,
        email:email,
        password:hashPass,
        age: 18,
        cartID :cartId  
      };
      
        const response = await db.create(user);
        return done(null, response);
      }
    }catch(error){
        console.log(error);
        return done(error);
      }
    }
  )
);


export { passport, isAuth };


