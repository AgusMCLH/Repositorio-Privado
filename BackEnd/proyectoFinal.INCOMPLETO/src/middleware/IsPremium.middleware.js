export default function isPremium(req, res, next) {
  if (req.session.user.premium) {
    next();
  } else {
    res.redirect('404notfoundpage');
  }
}
