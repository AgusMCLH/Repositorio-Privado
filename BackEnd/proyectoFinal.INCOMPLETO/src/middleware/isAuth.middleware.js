export function isAuth(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    console.log('isAuth: No hay usuario en la sesión');
  }
}
