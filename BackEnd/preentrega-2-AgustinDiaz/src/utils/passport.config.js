import passport from 'passport';
import local from 'passport-local';
import userService from '../service/user.service.js';
import GitHubStrategy from 'passport-github2';
import { comparePassword } from '../../tools/encript.tool.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
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
          console.log(error);
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
          username === 'adminCoder@coder.com' ||
          password === 'adminCod3r123'
        ) {
          const user = {
            firstName: 'CODER',
            lastName: 'ADMIN',
            email: username,
            password: password,
            role: 'administrador',
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
      const user = await userService.getById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.4cbf0bd8610e5f87',
        clientSecret: '2356eb3b145c7b4541ba4b9c754f3e4bd96e2ab1',
        callBackURL: 'http://localhost:8080/users/signin/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.getUserByEmail(profile._json.email);
          if (!user) {
            console.log(profile);
            const userData = {
              firstName: profile._json.name,
              lastName: '',
              email: profile._json.email,
              password: '',
            };
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
