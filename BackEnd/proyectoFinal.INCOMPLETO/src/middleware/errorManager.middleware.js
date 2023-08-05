import EErros from '../utils/tools/EErrors.js';

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EErros.INVALID_TYPE:
      res.status(400).send({ status: 'error', error: error.name });
      break;
    case EErros.AUTHENTICATION_ERROR:
      res.redirect('/users/signin');
      break;
    case EErros.AUTHORIZATION_ERROR:
      res.status(403).send({ status: 'error', error: error.name });
      break;
    default:
      res.status(500).send({ status: 'error', error: 'Internal Server Error' });
      break;
  }
};
