//Ejecutar función en el evento click
document.getElementById('btn_open').addEventListener('click', open_close_menu);

//Declaramos variables
var side_menu = document.getElementById('menu_side');
var btn_open = document.getElementById('btn_open');
var body = document.getElementById('body');
var logo = document.getElementById('fab_nike');

//Evento para mostrar y ocultar menú
function open_close_menu() {
  body.classList.toggle('body_move');
  side_menu.classList.toggle('menu__side_move');
  if (side_menu.classList.contains('menu__side_move')) {
    logo.classList.add('fab__nike_moved');
  } else {
    logo.classList.remove('fab__nike_moved');
  }
}

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
