let productos_global = [];

let mainproductpage = document.getElementById('mainproductpage');
//llamada a Mercado Libre para recuperar los productos
const callML = () => {
  return fetch(
    'https://api.mercadolibre.com/sites/MLU/search?q=remeras+nike#json'
  );
};

//Genera un objeto json a partir de la llamda
const jsonearrespuesta = (objeto) => {
  return objeto.json();
};

// renderiza en el DOM los poductos
const render = (productos) => {
  productos_global = productos;
  let acumulador = '';
  var identificador = '';
  productos.forEach((e) => {
    identificador = "'" + e.id.toString() + "'";
    acumulador += `
    <div class="product__container" onclick="productmodal(${identificador})">
    <div>
    <img src="${e.thumbnail}" alt="${e.title}"/>
    <p>${e.title}</p>
    <p>$${e.price}</p>
    </div>
    </div>`;
  });
  document.getElementById('productoslista').innerHTML = acumulador;
};

//"Centralita" que maneja las funciones asincronicas
const getinfo = async () => {
  let respuesta = await callML();
  respuesta = await jsonearrespuesta(respuesta);
  render(await respuesta.results);
};

//muestra el modal de los productos y carga los datos
const productmodal = (id) => {
  let idpreparado = "'" + id + "'";
  mainproductpage.style.display = 'flex';
  let producto_mostrado = productos_global.find((e) => e.id === id);
  document.getElementById('modal_title').innerText = producto_mostrado.title;
  document.getElementById(
    'modal_image_cont'
  ).innerHTML = `<img src="${producto_mostrado.thumbnail}" alt="${producto_mostrado.title}">`;
  document.getElementById(
    'modal__price'
  ).innerText = `UYU ${producto_mostrado.price}`;
  document.getElementById('modal__buttons_cont').innerHTML = `
  <a href="#" class="modal__buttonpay"><i class="fa-solid fa-bag-shopping"></i>  Comprar</a>
  <a href="#" class="modal__buttoncart" onclick="agregaralcarrito(${idpreparado})"><i class="fa-solid fa-cart-shopping cart_icon"></i>Agregar al carrito</a>`;
};

//cierra el modal si el usuario pulsa esc
document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    document.getElementById('mainproductclosebutton').click();
  }
});
document
  .getElementById('mainproductclosebutton')
  .addEventListener('click', () => {
    mainproductpage.style.display = 'none';
  });

getinfo();

//funcion aparte para cerrar el modal
const cerrarmodal = () => {
  document.getElementById('mainproductpage').style.display = 'none';
};
