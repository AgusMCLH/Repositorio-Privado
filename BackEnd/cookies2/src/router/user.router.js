import { Router } from 'express';

const userRouter = Router();

userRouter.get('/get', (req, res) => {
  res.render('cookie');
});
userRouter.post('/post', (req, res) => {
  console.log(req.body);
});

export default userRouter;
