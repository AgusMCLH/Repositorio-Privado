import passport from 'passport';
import { isGuest } from '../middleware/isGuest.middleware.js';
import CustomRouter from './customRouter/customRouter.js';

export default class UserRouter extends CustomRouter {
  init() {
    this.get('/signin', ['PUBLIC'], [isGuest], async (req, res) => {
      let error = false;
      let errorText = [];

      if (req.session.messages !== undefined) {
        errorText = req.session.messages[0];
      }
      if (errorText !== undefined && errorText.length > 0) {
        error = true;
      }
      req.session.messages = [];
      res.render('signin', { title: 'SignIn', error, errorText });
    });

    this.get('/signup', ['PUBLIC'], [], async (req, res) => {
      let error = false;
      let errorText = [];
      if (req.session.messages !== undefined) {
        errorText = req.session.messages[0];
      }
      if (errorText !== undefined) {
        error = true;
      }
      req.session.messages = [];
      res.render('signup', { title: 'SignUp', error, errorText });
    });

    this.post(
      '/signup',
      ['PUBLIC'],
      [
        passport.authenticate('register', {
          failureRedirect: '/users/signup',
          failureMessage: true,
        }),
      ],
      async (req, res) => {
        res.status(201).redirect('/users/signin');
      }
    );

    this.post(
      '/signin',
      ['PUBLIC'],
      [
        passport.authenticate('signin', {
          failureRedirect: '/users/signin',
          failureMessage: true,
        }),
      ],
      async (req, res) => {
        const user = req.user;
        delete user.password;
        req.session.user = user;
        res.redirect('/users/saludo');
      }
    );

    this.get(
      '/signin/github',
      ['PUBLIC'],
      [passport.authenticate('github', { failureRedirect: '/users/signin' })],
      async (req, res) => {}
    );

    this.get(
      '/signin/githubcallback',
      ['PUBLIC'],
      [passport.authenticate('github', { failureRedirect: '/users/signin' })],
      async (req, res) => {
        req.session.user = req.user;
        res.redirect('/users/saludo');
      }
    );

    this.get('/logout', ['PUBLIC'], [], async (req, res) => {
      req.session.destroy();
      res.clearCookie('cartId').redirect('/users/signin');
    });

    this.get('/saludo', ['USUARIO', 'ADMINISTRADOR'], [], async (req, res) => {
      const { user } = req.session;
      if (user === undefined) {
        setTimeout(() => {
          res.redirect('/users/saludo');
        }, 1000);
      }
      res
        .cookie('cartId', user.cartId, {
          maxAge: 10000000,
          signed: true,
        })
        .render('saludo', { title: `Hola ${user.firstName}`, user });
    });

    this.get('/profile', ['USUARIO', 'ADMINISTRADOR'], [], async (req, res) => {
      const user = req.session.user;
      res.render('profile', { title: 'Profile', user });
    });
  }
}
