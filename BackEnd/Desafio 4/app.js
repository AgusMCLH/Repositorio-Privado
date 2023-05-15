import express from 'express';
import { productGetPost } from './src/router/productGetPost.js';
import { cartRouting } from './src/router/cartRouting.js';
import handlebars from 'express-handlebars';

// Declaro una app de tipo express y la configuro para que use JSON's y urlencoded ademas de usar la carpeta public para los archivos estaticos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine());

app.set('views', './views');
app.set('view engine', 'handlebars');

//

app.get('/api', (req, res) => {
  res.send(
    '<br><p>Ingrese a <a href="/api/products">/get</a> para ver los productos</p><p>Ingrese a /carts/[id de su carrito] para ver su carrito</p>'
  );
});

app.use('/api/products', productGetPost);
app.use('/api/carts', cartRouting);

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
