import express from 'express';
import productManager from './desafio.js';
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(
    '<h1>Bienvenido</h1><br><p>Ingrese a <a href="/products">/items</a> para ver los productos</p><p>Ingrese a <a href="/product-random">/item-random</a> para ver un producto al azar</p>'
  );
});

app.get('/products', async (req, res) => {
  let limite = req.query.limit;
  console.log('consulta', limite);
  let products = await productManager.getProducts();
  if (limite !== undefined) {
    products = products.slice(0, limite);
  }
  res.send(
    `<p>${JSON.stringify(products)}</p><br> <p>cantidad: ${
      products.length
    }</p><br> ${
      limite !== undefined
        ? `<p>limite: ${limite}</p>`
        : 'Mostrando todos los productos'
    }`
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

app.listen(8081, () => {
  console.log('Server started on port 8081');
});
