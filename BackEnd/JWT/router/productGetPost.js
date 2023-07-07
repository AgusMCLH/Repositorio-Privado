import { Router } from 'express';
import productManager from './../MongoManagers/productManager.js';

const productGetPost = Router();

const getStars = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  let stars = [];
  let punctuations = getRandomInt(0, 10);
  while (punctuations > 1) {
    stars.push(true);
    punctuations -= 2;
  }
  if (punctuations === 1) {
    stars.push(false);
    punctuations -= 1;
  }
  return stars;
};
productGetPost.get('/', async (req, res) => {
  //Consigue el limite de productos a mostrar
  const { limit, page, sort, query } = req.query;
  //Llama a la funcion getProducts() de productManager para conseguir los productos
  let products = await productManager.getProducts(limit, page, sort, query);

  const status = () => {
    if (products.docs === undefined) {
      return 'Error';
    } else {
      return 'success';
    }
  };

  products.docs.forEach((product) => {
    if (product.thumbnail[0] === 'Sin foto') {
      product.hasThumbnail = false;
    } else {
      product.hasThumbnail = true;
    }
    product.rating = getStars();
  });
  let response = {
    status: status(),
    payload: products.docs,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevLink: `?limit=${products.limit}&page=${products.page - 1}`,
    nextLink: `?limit=${products.limit}&page=${products.page + 1}`,
    firstLink: `?limit=${products.limit}&page=1`,
    lastLink: `?limit=${products.limit}&page=${products.totalPages}`,
  };

  const user = req.session.user;
  res.render('home', { title: 'Products', response, user });
});

// Declaro el endpoint /api/get/:id en caso de que pasen un ID
productGetPost.get('/:pid', async (req, res) => {
  //Recupera el ID pasado por parametro
  let idBuscado = req.params.pid;
  //Llama a la funcion getProductByID() de productManager para conseguir el producto
  const product = await productManager.getProductByID(idBuscado);

  //Si el producto es igual a 'No existe ningun producto con el id NaN' entonces envia un mensaje de error
  if (product === `No existe ningun producto con el id ${idBuscado}`) {
    res.status(404).send(`No hay ningun producto con el ID: ${idBuscado}`);
  } else {
    //Si el producto es distinto a 'No existe ningun producto con el id NaN' entonces envia el producto
    // res.status(200).send(`<p>${JSON.stringify(product)}</p>`);
    const hasImages = product.thumbnail[0] !== 'Sin foto';
    product.rating = getStars();
    const user = req.session.user;
    res.render('productPage', { product, hasImages, user });
  }
});

productGetPost.post('/', async (req, res) => {
  let response = await productManager.addProducts(req.body);
  res.status(response.code).send(response.msg);
});

productGetPost.put('/:pid', async (req, res) => {
  let idAEditar = Number(req.params.pid);
  req.body.idAEditar = idAEditar;
  let response = await productManager.updateProduct(req.body);
  res.status(response.code).send(response.msg);
});
productGetPost.delete('/:pid', async (req, res) => {
  let id = req.params.pid;
  let response = await productManager.deleteProduct(id);
  res.status(response.code).send(response.msg);
});

export { productGetPost };
