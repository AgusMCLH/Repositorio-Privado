import { Router } from 'express';
import { imgUploader } from './../configs/uploadimg.js';

const pets = [];
const petsRouter = Router();

petsRouter.get('/', (req, res) => {
  res.send(pets);
});

petsRouter.post('/', imgUploader.single('img'), (req, res) => {
  if (req.img === undefined) {
    res.status(401).send('No se ha enviado ninguna imagen');
  }
  console.log(req);
  const petsb = req.body;
  pets.img = req.file.path;
  pets.push(petsb);
  res.status(201).send(pets);
});
export { petsRouter };
