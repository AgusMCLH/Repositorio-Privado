export function ownCart(req, res, next) {
  if (req.path.split('/')[1] === req.session.user.cartId) {
    next();
  } else {
    res.redirect('/404-page-not-found');
  }
}
