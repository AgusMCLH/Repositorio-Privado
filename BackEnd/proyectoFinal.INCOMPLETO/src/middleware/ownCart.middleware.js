export function ownCart(req, res, next) {
  console.log('TAKS' + req.path.split('/')[1] + '.');
  if (req.path.split('/')[1] === req.session.user.cartId) {
    next();
  } else {
    res.redirect('/404-page-not-found');
  }
}
