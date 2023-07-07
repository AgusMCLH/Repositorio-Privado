import jwt from 'jsonwebtoken';

const privateKey = 'miClaveSecreta';

const generateToken = (user) => {
  return jwt.sign(user, privateKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'No autorizado' });
  }
  console.log(req.headers.authorization);
  const token = req.headers.authorization;

  jwt.verify(token, privateKey, (err, credentials) => {
    if (err) {
      return res.status(401).send({ message: 'Token invalido' });
    }

    req.user = credentials.user;
    next();
  });
};

export { generateToken, authenticateToken };
