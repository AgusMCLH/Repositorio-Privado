import { Router } from 'express';

const cookieRouter = Router();

cookieRouter.get('/get', (req, res) => {
  res.send(req.cookies);
});

cookieRouter.get('/set', (req, res) => {
  res
    .cookie('Verdad', 'El que juega al LoL no tiene dedos', {
      maxAge: 10000000,
    })
    .send('Cookie');
});

cookieRouter.get('/delete', (req, res) => {
  res.clearCookie('Verdad').send('Cookie eliminada');
});

cookieRouter.get('/getSigned', (req, res) => {
  res.send(req.signedCookies);
});

cookieRouter.get('/setSigned', (req, res) => {
  res
    .cookie('La Verdad de la milanga', 'El Valorant tambien es para mancos', {
      maxAge: 10000000,
      signed: true,
    })
    .send('Cookie');
});

export default cookieRouter;
