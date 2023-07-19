import express from 'express';

import config from '.././config/config.js';

import { productGetPost } from './router/productGetPost.js';
import { cartRouting } from './router/cartRouting.js';
import { realTimeProducts } from './router/realtimeproduct.js';
import { testRouter } from './router/test.router.js';
import { userRouter } from './router/users.router.js';
import { sessions } from './router/session.router.js';
import { notFoundPage } from './router/404.router.js';

import handlebars from 'express-handlebars';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import passport from 'passport';
import initializePassport from './utils/passport.config.js';

import { Server } from 'socket.io';

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
app.use(cookieParser(config.SECRET));

// Conecto Mongo
mongoose.connect(config.MONGOURL);

// Configuro la session
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: config.MONGOURL,
      mongoOptions: { useNewUrlParser: true },
      ttl: 6000,
    }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/sessions', sessions);
app.use('*', notFoundPage);

// Configuro el puerto en el cual va a escuchar el servidor
const webServer = app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT} `);
});

// Configuro socket.io
const io = new Server(webServer);
export { io };
