import bcrypt from 'bcrypt';

export const encriptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};
