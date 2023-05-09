import express from 'express';
import { productGetPost } from './src/router/productGetPost.js';

// Declaro una app de tipo express y la configuro para que use JSON's y urlencoded ademas de usar la carpeta public para los archivos estaticos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send(
    '<br><p>Ingrese a <a href="/api/products">/get</a> para ver los productos</p><p>Ingrese a <a href="/product-random">/item-random</a> para ver un producto al azar</p>'
  );
});

app.use('/api/products', productGetPost);

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
