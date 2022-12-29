//Ejecutar función en el evento click
document.getElementById('btn_open').addEventListener('click', open_close_menu);

//Declaramos variables
let side_menu = document.getElementById('menu_side');
let btn_open = document.getElementById('btn_open');
let body = document.getElementById('body');
let logo = document.getElementById('fab_nike');
let header = document.getElementById('header_content');
let searchcamp = document.getElementById('nav__search_input');
let searchbutton = document.getElementById('search_button');

//alterna el campo de busqueda
searchbutton.addEventListener('click', () => {
  searchcamp.classList.toggle('input_transition_active');
});

//Evento para mostrar y ocultar menú
function open_close_menu() {
  body.classList.toggle('body_move');
  side_menu.classList.toggle('menu__side_move');
  if (side_menu.classList.contains('menu__side_move')) {
    logo.classList.add('fab__nike_moved');
    header.classList.add('header__content_active');
  } else {
    logo.classList.remove('fab__nike_moved');
    header.classList.remove('header__content_active');
  }
}
document.getElementById('cart__toggle_button').addEventListener('click', () => {
  let height = 0;
  if (document.getElementById('carrito_container').clientHeight === 0) {
    height = document.getElementById('carrito_container').scrollHeight + 60;
  }
  document.getElementById('carrito_container').style.height = height + 'px';
  cargarcarrito();
});

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760) {
  body.classList.add('body_move');
  side_menu.classList.add('menu__side_move');
}

//Haciendo el menú responsive(adaptable)

window.addEventListener('resize', function () {
  if (window.innerWidth > 760) {
    body.classList.remove('body_move');
    side_menu.classList.remove('menu__side_move');
  }

  if (window.innerWidth < 760) {
    body.classList.add('body_move');
    side_menu.classList.add('menu__side_move');
  }
});

const callMLproduct = (id) => {
  return fetch(`https://api.mercadolibre.com/items/${id}`);
};

const jsonearrespuestaproducto = (objeto) => {
  return objeto.json();
};
const cargarcarrito = async () => {
  let productosencarrito =
    [
      ...new Set(
        JSON.parse(localStorage.getItem('supermegacarrito2k22hechoporAD'))
      ),
    ] || [];
  if (productosencarrito.length == 0) {
    document.getElementById('contenedorDeProductosEnCarrito').innerHTML =
      "<p class='carrito__sinproducto'>No tienes productos en tu carrito</p>";
    document.getElementById('carrito_info').innerHTML = ' ';
  } else {
    document.getElementById('carrito_info').innerHTML = `
    <div class='subtotal'><p id='carritoSubTotal'>$</p></div>
    <div class='button'><p href='#'><i class='fa-solid fa-bag-shopping'></i>Pagar</p></div>`;
    let acumulador = '';
    let preciofinal = 0;
    productosencarrito.forEach(async (e) => {
      let respuesta = await callMLproduct(e);
      respuesta = await jsonearrespuestaproducto(respuesta);
      preciofinal += respuesta.price;
      acumulador += `
      <div class="carrito__producto">
      <div class="producto__imagen"><img src="${respuesta.thumbnail}" alt="${respuesta.title}"></div>
      <div class="producto__nombre"><p>${respuesta.title}</p></div>
      <div class="producto__precio"><p>$${respuesta.price}</p></div>
      <div class="carritodeleteicon" onclick="eliminardelcarrito('${respuesta.id}')"><i class="fa-solid fa-xmark" id="mainproductclosebutton"></i></div>
      </div>`;
      renderdeproductosencarrito(acumulador, preciofinal);
    });
  }
};
const renderdeproductosencarrito = (acumulador, preciofinal) => {
  document.getElementById('carritoSubTotal').innerText = `$${preciofinal}`;
  document.getElementById('contenedorDeProductosEnCarrito').innerHTML =
    acumulador;
};

const agregaralcarrito = (id) => {
  let productosencarrito =
    JSON.parse(localStorage.getItem('supermegacarrito2k22hechoporAD')) || [];
  productosencarrito.push(id);
  localStorage.setItem(
    'supermegacarrito2k22hechoporAD',
    JSON.stringify(productosencarrito)
  );
};

const eliminardelcarrito = (id) => {
  let idpreparado = id;
  let productosencarrito =
    [
      ...new Set(
        JSON.parse(localStorage.getItem('supermegacarrito2k22hechoporAD'))
      ),
    ] || [];
  let indexeliminado = productosencarrito.indexOf(idpreparado);
  productosencarrito.splice(indexeliminado, 1);
  localStorage.setItem(
    'supermegacarrito2k22hechoporAD',
    JSON.stringify(productosencarrito)
  );
  cargarcarrito();
};
