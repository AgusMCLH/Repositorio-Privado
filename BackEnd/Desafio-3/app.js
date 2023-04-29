import express, { json } from 'express';
import fs from 'fs';
import productManager from './desafio.js';
const app = express();

app.get('/', (req, res) => {
  res.send(
    '<h1>Bienvenido</h1><br><p>Ingrese a <a href="/products">/items</a> para ver los productos</p><p>Ingrese a <a href="/product-random">/item-random</a> para ver un producto al azar</p>'
  );
});

app.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.send(
    `<p>${JSON.stringify(products)}</p><br><br> cantidad: ${products.length}`
  );
});
app.get('/products/:pid', async (req, res) => {
  const idBuscado = Number(req.params.pid);
  const product = await productManager.getProductByID(idBuscado);
  res.send(`<p>${JSON.stringify(product)}</p>`);
});
app.get('/product-random', async (req, res) => {
  const products = await productManager.getProducts();
  const idBuscado = Math.floor(Math.random() * (products.length - 0)) + 0;
  const product = products[idBuscado];
  res.send(`<p>${JSON.stringify(product)}</p>`);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});

const testing = async () => {
  console.log(await productManager.getProducts());
  console.log('//////////////////////////////////////////////');
  console.log(await productManager.getProductByID());
};
testing();
