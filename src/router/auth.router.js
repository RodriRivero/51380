import express from 'express';
import { UserModel } from '../dao/models/users.model.js';

import { isAdmin, isUser } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
    }
    return res.redirect('/auth/login');
  });
});

authRouter.get('/perfil', isUser, (req, res) => {
  const user = { email: req.session.email, isAdmin: req.session.isAdmin };
  return res.render('perfil', { user: user });
});

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('datos super secretos clasificados sobre los nuevos ingresos a boca juniors');
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('error', { error: 'Ingrese su email y password' });
  }
  const usuarioEncontrado = await UserModel.findOne({ email: email });
  if (usuarioEncontrado && usuarioEncontrado.password == password) {
    req.session.email = usuarioEncontrado.email;
    req.session.isAdmin = usuarioEncontrado.isAdmin;

    return res.redirect('/products');
  } else {
    return res.status(401).render('error', { error: 'Email o password incorrectos' });
  }
});

authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, age } = req.body;
  if (!email || !password || !firstName || !lastName || !age) {
    return res.status(400).render('error', { error: 'ponga bien toooodoo cheee!!' });
  }
  try {
    await UserModel.create({ email: email, password: password, firstName: firstName, age: age, lastName: lastName, isAdmin: false });
    req.session.email = email;
    req.session.isAdmin = false;

    return res.redirect('/auth/perfil');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error', { error: 'no se pudo crear el usuario. Intente con otro mail.' });
  }
});