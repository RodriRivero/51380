import express from 'express';
import { UserModel } from '../dao/models/users.model.js';
import { isAdmin, isUser } from '../middlewares/auth.js';
import passport from "passport";


export const authRouter = express.Router();



/***************************************************************** */
authRouter.get('/profile', isUser, (req, res) => {
  const user = {email: req.session.email, isAdmin: req.session.isAdmin, firstName: req.session.firstName, 
    lastName: req.session.lastName };
  return res.render('profile', {user: user});
});


/**///************************************ *************************/ 
authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
    }
    return res.redirect('/auth/login');
  });
});


/******************************************************************************** */



/*************************************** */
authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('datos super secretos clasificados sobre los nuevos ingresos a boca juniors');
});



/***************************************************** */
authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});
/**************************************agrega */

authRouter.get('/products', (req, res) => {
  try{
      const user = UserModel.findOne({email: req.session.email, firstName: req.session.firstName, 
        lastName: req.session.lastName});
      if (user) {
          const userData = {
              firstName: user.firstName,
              lastName: user.lastName,
              age: user.age,
              email: user.email,
              isAdmin: user.isAdmin,
          };
          return res.render('products', { user: userData });
      } else {
          /*return res.render('products', { user: null });*/
      }
  } catch (error) {
      console.error(error);
      return res.render('products', { user: null, error: 'Error retrieving user data' });
  }
});

//************************************ */
authRouter.post('/login', async (req, res) => {
  try{
      const {email, password} = req.body;
      if (!email || !password) {
          return res.status(400).render('error3', {error3: 'email and password required'});
      }
      const isAdmin = email === 'adminCoder@coder.com' && password === 'adminCod3r123';
      if (isAdmin) {
          req.session.email = email;
          req.session.isAdmin = true;
          return res.redirect('/products');
      }
      const foundUser = await UserModel.findOne({email: email});
      if (foundUser && foundUser.password === password) {
          req.session.email = foundUser.email;
          req.session.isAdmin = foundUser.isAdmin;
          req.session.firstName = foundUser.firstName;
          req.session.lastName = foundUser.lastName;


          return req.session.save(() => {
              return res.redirect('/products');
          });
      }else{



          return res.status(401).render('error3', {error3:'wrong email or password'})
      }

      
  }catch(error){
      console.error(error);
      res.status(500).json({status: 'error', message: 'Internal server error'});
  }
});


/*********************************************** */
authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});



/******************************************** */
authRouter.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, age } = req.body;
  if (!email || !password || !firstName || !lastName || !age) {
    return res.status(400).render('error', { error: 'uh ... me cag#%$%..' });
  }

  const isAdmin = email === 'adminCoder@coder.com' && password === 'adminCod3r123';
  try {
    await UserModel.create({ email: email, password: password, firstName: firstName, age: age, lastName: lastName, isAdmin: isAdmin });
    req.session.email = email;
    req.session.isAdmin = isAdmin;

    return res.redirect('/auth/login');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error2', { error2: 'no se pudo crear el usuario. Intente con otro mail.' });
  }
});

authRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/auth/login",
    failureRedirect: "/error"
  })
);

// login post
authRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/error"
  })
);

authRouter.get("/logout", (req, res) => {

  console.log("req.logout", req.logout);
  req.logout(function (err) {
    if (err) {

      console.error(err);

      return res.redirect("/error");
    }


    res.render("login");
  });
});


authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  (req, res) => {

    res.redirect("/");
  }
);
export default authRouter;