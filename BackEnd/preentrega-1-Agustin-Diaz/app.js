import express from 'express';
import productManager from './src/productManager.js';
import { productRouter } from './src/router/apiGet.js';

// Declaro una app de tipo express y la configuro para que use JSON's y urlencoded ademas de usar la carpeta public para los archivos estaticos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Declaro el endpoint /api y le agrego las opciones de /get y /item-random
app.get('/api', (req, res) => {
  res.send(
    '<br><p>Ingrese a <a href="/api/get">/get</a> para ver los productos</p><p>Ingrese a <a href="/product-random">/item-random</a> para ver un producto al azar</p>'
  );
});

// Declaro el endpoint /api/get e importo el router de apiGet.js
app.use('/api/get', productRouter);

app.get('/product-random', async (req, res) => {
  const products = await productManager.getProducts();
  const idBuscado = Math.floor(Math.random() * (products.length - 0)) + 0;
  const product = products[idBuscado];
  res.send(`<p>${JSON.stringify(product)}</p>`);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
