let productos_global = [];
let mainproductpage = document.getElementById('mainproductpage');
const callML = () => {
  return fetch(
    'https://api.mercadolibre.com/sites/MLU/search?q=remera+nike#json'
  );
};

const jsonearrespuesta = (objeto) => {
  return objeto.json();
};

const render = (productos) => {
  productos_global = productos;
  let acumulador = '';
  var identificador = '';
  productos.forEach((e) => {
    identificador = "'" + e.id.toString() + "'";
    console.log(identificador);
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
const getinfo = async () => {
  let respuesta = await callML();
  respuesta = await jsonearrespuesta(respuesta);
  render(await respuesta.results);
};

const productmodal = (id) => {
  console.log(id);
  mainproductpage.style.display = 'flex';
  let producto_mostrado = productos_global.find((e) => e.id === id);
  document.getElementById('modal_title').innerText = producto_mostrado.title;
  document.getElementById(
    'modal_image_cont'
  ).innerHTML = `<img src="${producto_mostrado.thumbnail}" alt="${producto_mostrado.title}">`;
  document.getElementById(
    'modal__price'
  ).innerText = `UYU ${producto_mostrado.price}`;
};
document.addEventListener('keydown', (e) => {
  console.log(e.key);
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
