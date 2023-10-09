import config from './../config/config.js';

import passport from 'passport';
import local from 'passport-local';
import { userService } from '../repository/users/instance.js';
import { cartService } from '../repository/cart/instance.js';
import GitHubStrategy from 'passport-github2';
import { comparePassword } from '../utils/tools/encript.tool.js';
import { logger } from './../middleware/logger.middleware.js';

const LocalStrategy = local.Strategy;

const initializePassport = async () => {
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },

      async (req, username, password, done) => {
        const { firstName, lastName } = req.body;
        try {
          const userValidation = await userService.getUserByEmail(username);

          if (userValidation) {
            return done(null, false, {
              message: 'Email already in use',
            });
          }
          const userData = {
            firstName,
            lastName,
            email: username,
            password,
          };
          userData.cartId = (await cartService.addCart()).cartId;
          const newUser = await userService.addUser(userData);

          if (newUser.hasOwnProperty('code')) {
            if (newUser.code === 400) {
              return done(null, false, {
                message: newUser.message,
              });
            } else {
              return done(null, false, {
                message: newUser.message,
              });
            }
          } else {
            return done(null, newUser);
          }
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    'signin',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, username, password, done) => {
        if (
          username === config.ADMIN_EMAIL &&
          password === config.ADMIN_PASSWORD
        ) {
          const user = {
            _id: config.ADMIN_PASSWORD,
            firstName: 'CODER',
            lastName: 'ADMIN',
            email: username,
            password: password,
            role: 'administrador',
            premium: true,
            documents: [],
          };
          req.session.user = user;
          done(null, user);
        } else {
          const user = await userService.getUserByEmail(username);
          if (user) {
            if (comparePassword(password, user.password)) {
              req.session.user = user;
              done(null, user);
            } else {
              done(null, false, {
                message: 'Contraseña Incorrecta',
              });
            }
          } else {
            done(null, false, {
              message: 'Usuario Inexistente',
            });
          }
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = '';
      if (id === config.ADMIN_PASSWORD) {
        user = {
          _id: id,
          firstName: 'CODER',
          lastName: 'ADMIN',
          email: config.ADMIN_EMAIL,
          password: '------------------',
          premium: true,
        };
      } else {
        user = await userService.getById(id);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: config.GitHSID,
        clientSecret: config.GitHSSecret,
        callBackURL: `${config.HomeURL}/users/signin/githubcallback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.getUserByEmail(profile._json.email);
          if (!user) {
            const userData = {
              firstName: profile._json.name,
              lastName: '',
              email: profile._json.email,
              password: '',
            };
            userData.cartId = (await cartService.addCart()).cartId;
            user = await userService.addUser(userData);

            done(null, user);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassport;
