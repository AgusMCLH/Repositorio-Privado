import express from 'express';

import config from './config/config.js';

import { realTimeProducts } from './router/realtimeproduct.js';
import { testRouter } from './router/test.router.js';
import { notFoundPage } from './router/404.router.js';
import SessionRouter from './router/session.router.js';
import ProductsRouter from './router/products.Router.js';
import CartRouting from './router/carts.Router.js';
import UserRouter from './router/users.Router.js';
import ChatRouter from './router/chat.Router.js';
import HomeRouter from './router/home.Router.js';
import MockingRouter from './router/moking.Router.js';

import handlebars from 'express-handlebars';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import passport from 'passport';
import initializePassport from './utils/passport.config.js';

import compression from 'express-compression';
import { Server } from 'socket.io';
let messages = [];

// Declaro una app de tipo express y la configuro para que use JSON's y urlencoded ademas de usar la carpeta public para los archivos estaticos
const app = express();
app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuro handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// Configuro las cookies
app.use(cookieParser(config.SECRET));

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
app.use('/', new HomeRouter().getRouter());
app.use('/api/test', testRouter);
app.use('/api/products', new ProductsRouter().getRouter());
app.use('/api/chat', new ChatRouter().getRouter());
app.use('/api/carts', new CartRouting().getRouter());
app.use('/api/realtimeproducts', realTimeProducts);
app.use('/users', new UserRouter().getRouter());
app.use('/api/sessions', new SessionRouter().getRouter());
app.use('/mockingproducts', new MockingRouter().getRouter());
app.use('*', notFoundPage);

// Configuro el puerto en el cual va a escuchar el servidor
const webServer = app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT} `);
});

// Configuro socket.io
const io = new Server(webServer);
export { io };

io.on('connection', (socket) => {
  io.emit('ShowMessages', messages);
  socket.on('NewMessage', (message) => {
    console.log(message);
    // Agrego el mensaje al array de mensajes
    messages.push(message);
    // Propago el evento a todos los clientes conectados
    io.emit('ShowMessages', messages);
  });
});
