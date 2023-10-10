import passport from 'passport';
import { isGuest } from '../middleware/isGuest.middleware.js';
import CustomRouter from './customRouter/customRouter.js';
import { recoveryController } from '../controller/recoveryPassSis.controller.js';
import { logger } from '../middleware/logger.middleware.js';
import { userService } from '../repository/users/instance.js';
import { userController } from '../controller/user.controller.js';
import { uploadFiles } from '../middleware/uploadfile.middleware.js';
import productController from '../controller/products.controller.js';
import UserDTO from '../DTOs/user.DTO.js';

export default class UserRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [], async (req, res) => {
      const usersPure = await userService.getAllUsers();
      const users = new UserDTO(usersPure);

      res.send(users);
    });

    this.delete('/', ['PUBLIC'], [], async (req, res) => {
      const response = await userController.deleteIncativeUsers();
      res.send('Delete');
    });

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
        if (user.role !== 'administrador') {
          await userController.updateLastConnection(req.session.user._id);
        }
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
        const user = req.user;
        delete user.password;
        req.session.user = user;
        await userController.updateLastConnection(user._id);
        res.redirect('/users/saludo');
      }
    );

    this.get('/logout', ['USUARIO', 'ADMINISTRADOR'], [], async (req, res) => {
      const user = req.session.user;
      console.log(user);
      if (user.role !== 'administrador') {
        await userController.updateLastConnection(req.session.user._id);
      }
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
      let documents = {
        identification: false,
        residence: false,
        accStatus: false,
      };
      const userProducts = await productController.getProductByOwner(
        user.email
      );
      const userProductsBool = true;
      user.documents.forEach((document) => {
        if (
          document.name === 'BackIdImage' ||
          document.name === 'FrontIdImage'
        ) {
          documents.identification = true;
        }
        if (document.name === 'Residence') {
          documents.residence = true;
        }
        if (document.name === 'AccStatus') {
          documents.accStatus = true;
        }
        if (document.name === 'Avatar') {
          documents.avatar = true;
        }
      });
      let AvatarURL =
        user.documents
          .find((doc) => doc.name === 'Avatar')
          ?.reference.split('public')[1] || undefined;

      logger.debug(`AvatarURL ${AvatarURL}`);
      res.render('profile', {
        title: 'Profile',
        user,
        documents,
        userProducts,
        userProductsBool,
        AvatarURL,
      });
    });

    this.get('/forgottenPassword', ['PUBLIC'], [], async (req, res) => {
      res.render('forgottenPassword', { title: 'Forgotten Password' });
    });
    this.post('/forgottenPassword', ['PUBLIC'], [], async (req, res) => {
      logger.debug(`Email recibido ${req.body.email}`);
      recoveryController.sendRecoveryLink(req.body.email);
      res.send('Klak');
    });
    this.get('/passwordrecovery/:id', ['PUBLIC'], [], async (req, res) => {
      let code = req.params.id;
      const codeFound = await recoveryController.getById(code);
      const user = await userService.getById(codeFound.user);
      if (codeFound) {
        res.render('forgottenPassword2', {
          title: 'Password Recovery',
          code,
          firstName: user.firstName,
          email: user.email,
        });
      } else {
        res.render('forgottenPasswordError', {
          title: 'Password Recovery',
          code,
        });
      }
    });
    this.post('/passwordrecovery/2p2', ['PUBLIC'], [], async (req, res) => {
      const { Password, code } = req.body;
      const codeFound = await recoveryController.getById(code);
      const user = await userService.getById(codeFound.user);
      const result = await recoveryController.updatePassword(code, Password);
      logger.debug(`Codigo recibido ${code} y password ${Password}`);
      if (result === 'AUTH_PASS') {
        res.render('forgottenPassword2', {
          title: 'Password Recovery',
          code,
          firstName: user.firstName,
          email: user.email,
          errorBool: true,
          error: 'La contraseña no puede ser igual a la anterior',
        });
      } else {
        res.send('La contra se actualizoooo');
      }
    });

    this.post(
      '/:uid/documents',
      ['USUARIO'],
      [uploadFiles('public/documents', 'pdf', 'user', 'document').any()],
      async (req, res) => {
        const { uid } = req.params;
        const { files } = req;
        logger.debug(`Uid recibido ${uid}`);
        const user = await userController.uploadDocument(uid, files);
        req.session.user = user;
        res.status(200).json({ message: 'Documentos subidos' });
      }
    );

    this.get('/premium/:uid', ['USUARIO'], [], async (req, res) => {
      let valid = true;

      let documents = [
        { name: 'BackIdImage', value: false },
        { name: 'FrontIdImage', value: false },
        { name: 'Residence', value: false },
        { name: 'AccStatus', value: false },
      ];
      const { uid } = req.params;
      const user = req.session.user;
      user.documents.forEach((document) => {
        documents.forEach((doc) => {
          if (document.name === doc.name) {
            doc.value = true;
          }
        });
      });
      if (user.premium === false) {
        documents.forEach((doc) => {
          if (doc.value === false) {
            valid = false;
          }
        });
      }

      if (valid) {
        const messagge = await userController.switchPremium(uid);
        req.session.user = await userService.getById(uid);
        console.log(messagge);
        res.render('premiumswitch', { title: 'Premium', messagge, user });
      } else {
        res.send('Usted no tiene todos los documentos necesarios');
      }
    });
  }
}
