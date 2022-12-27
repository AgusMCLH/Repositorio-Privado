let productos = [];
let mainproductpage = document.getElementById('mainproductpage');
const callML = () => {
  return fetch(
    'https://api.mercadolibre.com/sites/MLU/search?q=remera+nike#json'
  );
};

const jsonearrespuesta = (objeto) => {
  objeto = objeto;
  return objeto.json();
};

const render = (productos) => {
  let acumulador = '';
  productos.forEach((e) => {
    acumulador += `
    <div class="product__container ">
    <div>
    <img src="${e.thumbnail}" alt="${e.title}"/>
    <p>${e.title}</p>
    <p>$${e.price}</p>
    </div>
    </div>`;
  });
  document.getElementById('productoslista').innerHTML = acumulador;
  let productoslistados = document.getElementsByClassName('product__container');
  for (let i = 0; i < productoslistados.length; i++) {
    productoslistados[i].addEventListener('click', () => {
      mainproductpage.style.display = 'flex';
    });
  }
};

document
  .getElementById('mainproductclosebutton')
  .addEventListener('click', () => {
    mainproductpage.style.display = 'none';
  });

const getinfo = async () => {
  let respuesta = await callML();
  respuesta = await jsonearrespuesta(respuesta);
  render(await respuesta.results);
};
getinfo();
