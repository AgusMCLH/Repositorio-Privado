import passport from 'passport';
import local from 'passport-local';
import userService from '../service/user.service';
import { comparePassword, encriptPassword } from '../../tools/encript.tool';

const LocalStrategy = local.Strategy;
