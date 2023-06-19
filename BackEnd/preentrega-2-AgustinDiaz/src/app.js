import express from 'express';
import { productGetPost } from './router/productGetPost.js';
import { cartRouting } from './router/cartRouting.js';
import { realTimeProducts } from './router/realtimeproduct.js';
import { testRouter } from './router/test.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import { userRouter } from './router/users.router.js';

// Declaro una app de tipo express y la configuro para que use JSON's y urlencoded ademas de usar la carpeta public para los archivos estaticos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuro handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// Configuro las cookies
app.use(cookieParser('G876HF%Nunv$#nmce2t2g25'));

// Conecto Mongo
mongoose.connect(
  'mongodb+srv://agustindiaz980:Fecha1990@cluster0.otb4efz.mongodb.net/coderhouse-backend-ecommerce?retryWrites=true&w=majority'
);

// Configuro la session
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        'mongodb+srv://agustindiaz980:Fecha1990@cluster0.otb4efz.mongodb.net/coderhouse-backend-ecommerce?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true },
      ttl: 6000,
    }),
    secret: 'G876HF%Nunv$#nmce2t2g25',
    resave: true,
    saveUninitialized: true,
  })
);

// Rutas
app.get('/', (req, res) => {
  res.send(
    '<br><p>Ingrese a <a href="/api/products">/api/products</a> para ver los productos</p><p>Ingrese a /api/carts/[id de su carrito] para ver su carrito</p><p>Ingrese a <a href="/api/realtimeproducts">/api/realtimeproducts</a> para ver los productos</p>'
  );
});

app.use('/api/test', testRouter);
app.use('/api/products', productGetPost);
app.use('/api/carts', cartRouting);
app.use('/api/realtimeproducts', realTimeProducts);
app.use('/users', userRouter);

// Configuro el puerto en el cual va a escuchar el servidor
const webServer = app.listen(8080, () => {
  console.log('Server started on port 8080');
});

// Configuro socket.io
const io = new Server(webServer);
export { io };
