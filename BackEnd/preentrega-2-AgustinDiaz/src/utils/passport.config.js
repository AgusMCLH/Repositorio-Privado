import passport from 'passport';
import local from 'passport-local';
import userService from '../service/user.service.js';
import { comparePassword, encriptPassword } from '../../tools/encript.tool.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, userName, password, done) => {
        console.log('req.body', req.body);
        const { firstName, lastName } = req.body;
        try {
          const userValidation = await userService.getUserByEmail(userName);
          if (userValidation) {
            return done(null, false, {
              message: 'Email already in use',
            });
          }

          const userData = {
            firstName,
            lastName,
            email: userName,
            password,
          };
          const user = await userService.addUser(userData);

          if (user.hasOwnProperty('code')) {
            if (user.code === 400) {
              return done(null, false, {
                message: user.message,
              });
            } else {
              return done(null, false, {
                message: user.message,
              });
            }
          } else {
            return done(null, user);
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userService.getById(id);
    return done(null, user);
  });
};

export default initializePassport;
