let collapseButton = document.getElementById('collapse');
let addButton = document.getElementById('addProduct');
let productName = document.getElementById('Nombre');
let productPrice = document.getElementById('Precio');
let productDiscount = document.getElementById('Descuento');
let productDescription = document.getElementById('Descripcion');
let productCategory = document.getElementById('Categoria');
//Crea un array de todos los campos que tengan que contener letras
const listaInputsLetras = [productName, productDescription, productCategory];
//Crea un array de todos los campos que tengan que contener números
const listaInputsNumber = [productPrice, productDiscount];
const regexLetter = /[a-zA-Z]/;
let productos = JSON.parse(localStorage.getItem('productosEnStorage')) || [];
let checkedCamps = 0;
let divProductos = document.getElementsByClassName('productos');
divProductos = divProductos[0];
let botonesComprar = [];
let crossCartButton = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.getElementById('cross').addEventListener('click', () => {
  document.getElementById('carrito_container').style.display = 'none';
});
document.getElementById('carrito_toggler').addEventListener('click', () => {
  document.getElementById('carrito_container').style.display = 'flex';
  mostrarElementosEnCarrito();
});

//Funcion del boton collapse
collapseButton.addEventListener('click', () => {
  let formulariosDiv = document.getElementsByClassName('formularios');
  let height = 0;
  for (let i = 0; i < formulariosDiv.length; i++) {
    if (formulariosDiv[i].clientHeight == 0) {
      height = formulariosDiv[i].scrollHeight;
    }
    formulariosDiv[i].style.height = height + 'px';
  }
});

//Ejecuta la funcion principal
addButton.addEventListener('click', () => {
  // funcion de validacion para letras
  const validarLetras = (camp) => {
    const haveNumber = (letter) => {
      for (let i = 0; i < letter.length; i++) {
        if (regexLetter.test(letter.charAt(i))) {
          return false;
        }
        return true;
      }
    };
    if (camp.value.length > 0 && !haveNumber(camp.value)) {
      colorChangeFunction(camp, 'green');
      return true;
    } else {
      colorChangeFunction(camp, 'red');
      return false;
    }
  };

  // Funcion de validacion para numeros
  const validarNumeros = (camp) => {
    const haveNumber = (letter) => {
      for (let i = 0; i < letter.length; i++) {
        if (isNaN(letter)) {
          return false;
        }
        return true;
      }
    };
    if (camp.value.length > 0 && haveNumber(camp.value)) {
      if (camp == productDiscount) {
        if (camp.value >= 0 && camp.value <= 100) {
          colorChangeFunction(camp, 'green');
          return true;
        } else {
          colorChangeFunction(camp, 'red');
          return false;
        }
      } else {
        colorChangeFunction(camp, 'green');
        return true;
      }
    } else {
      colorChangeFunction(camp, 'red');
      return false;
    }
  };

  //Recorre el array de los campos de letras validandolos
  checkedCamps = 0;
  for (let i = 0; i < listaInputsLetras.length; i++) {
    if (validarLetras(listaInputsLetras[i])) {
      checkedCamps++;
    } else {
      showErrorCard(
        `Error en el campo ${listaInputsLetras[i].id}`,
        'El campo solo admite letras'
      );
    }
  }
  //Recorre el array de los campos de numeros validandolos
  for (let i = 0; i < listaInputsNumber.length; i++) {
    if (validarNumeros(listaInputsNumber[i])) {
      checkedCamps++;
    } else {
      showErrorCard(
        `Error en el campo ${listaInputsNumber[i].id}`,
        'El campo solo admite numeros'
      );
    }
  }
  if (productDiscount.value <= 100 && productDiscount.value >= 0) {
    if (checkedCamps === listaInputsLetras.concat(listaInputsNumber).length) {
      agregar();
      localStorage.setItem('productosEnStorage', JSON.stringify(productos));
    } else {
    }
  } else {
    showErrorCard(
      `Error en el campo ${productDiscount.id}`,
      'El campo solo admite numeros entre 0 y 100'
    );
  }
});

//Cambia el color del borde del campo despues de la validacion
function colorChangeFunction(camp, color) {
  let interval = 500;

  camp.style.border = '2px solid ' + color;
  if (color == 'green') {
    setTimeout(() => {
      camp.style.border = '2px solid black';
    }, interval);
  }
}

//A cada campo le agrega un evento para que se desactive el borde rojo despues de presionar una tecla
listaInputsLetras.concat(listaInputsNumber).forEach((camp) => {
  camp.addEventListener('keydown', (e) => {
    camp.style.border = '2px solid black';
    if (e.key == 'Enter') {
      addButton.click();
    }
  });
});

const agregar = () => {
  productos.push({
    name: productName.value,
    price: productPrice.value,
    discount: productDiscount.value,
    desc: productDescription.value,
    category: productCategory.value,
  });
  showProducts();
};

let showProducts = () => {
  let acumulador = '';
  let posicion = 0;

  productos.forEach((producto) => {
    if (producto.discount == 0) {
      acumulador += `
      <div class="product">
      <div class="product__name">
        <h3>${producto.name}</h3>
        </div>
        <div class="product__price">
          <div class="product__originalprice">
            <p>$${producto.price}</p>
            </div>
            <div class="product__discount">
            <p>N/A</p>
            </div>
            </div>
            <div class="product__description">
            <p>${producto.desc}</p>
            </div>
            <div class="product__category">
            <h3>${producto.category}</h3>
            </div>
            <button href="#" class="buy" value="${posicion}">Comprar</button>
            </div>`;
    } else {
      let discountedPrice =
        producto.price - (producto.price / 100) * producto.discount;
      acumulador += `
      <div class="product">
        <div class="product__name">
          <h3>${producto.name}</h3>
          </div>
        <div class="product__price_discounted">
          <div class="product__originalprice">
          <p>$${producto.price}</p>
          </div>
          <div class="product__discount">
            <p>${producto.discount}% off</p>
            </div>
            <div class="product__finalPrice">
            <p>$${discountedPrice}</p>
          </div>
        </div>
        <div class="product__description">
          <p>${producto.desc}</p>
        </div>
        <div class="product__category">
          <h3>${producto.category}</h3>
        </div>
        <button href="#" class="buy" value="${posicion}">Comprar</button>
    </div>`;
    }
    posicion++;
  });

  divProductos.innerHTML = acumulador;
  if (productos.length > 5) {
    document.getElementById('search__container').style.width = '80vw';
  }

  botonesComprar = document.getElementsByClassName('buy');
  for (let i = 0; i < botonesComprar.length; i++) {
    botonesComprar[i].addEventListener('click', () => {
      carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(botonesComprar[i].value);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      showSuccessCard();
    });
  }
};

const showErrorCard = (title, message) => {
  document.getElementById('error_toggler').style.right = '30px';
  document.getElementById('error_window').innerHTML = `
  <h3>${title}</h3>
  <p>${message}</p>`;
  setTimeout(() => {
    document.getElementById('error_toggler').style.right = '-350px';
  }, 2000);
};
document.getElementById('buscadorInput').addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    document.getElementById('buscadorButton').click();
  }
});
document.getElementById('buscadorButton').addEventListener('click', () => {
  let productoBuscado = productos.filter((producto) =>
    producto.name.includes(document.getElementById('buscadorInput').value)
  );
  let acumulador = '';
  let posicion = 0;
  productoBuscado.forEach((producto) => {
    if (producto.discount == 0) {
      acumulador += `
      <div class="product">
      <div class="product__name">
        <h3>${producto.name}</h3>
        </div>
        <div class="product__price">
          <div class="product__originalprice">
            <p>$${producto.price}</p>
            </div>
            <div class="product__discount">
            <p>N/A</p>
            </div>
            </div>
            <div class="product__description">
            <p>${producto.desc}</p>
            </div>
            <div class="product__category">
            <h3>${producto.category}</h3>
            </div>
            <button href="#" class="buy" value="${posicion}">Comprar</button>
            </div>`;
    } else {
      let discountedPrice =
        producto.price - (producto.price / 100) * producto.discount;
      acumulador += `
      <div class="product">
        <div class="product__name">
          <h3>${producto.name}</h3>
          </div>
        <div class="product__price_discounted">
          <div class="product__originalprice">
          <p>$${producto.price}</p>
          </div>
          <div class="product__discount">
            <p>${producto.discount}% off</p>
            </div>
            <div class="product__finalPrice">
            <p>$${discountedPrice}</p>
          </div>
        </div>
        <div class="product__description">
          <p>${producto.desc}</p>
        </div>
        <div class="product__category">
          <h3>${producto.category}</h3>
        </div>
        <button href="#" class="buy" value="${posicion}">Comprar</button>
    </div>`;
    }
  });
  posicion++;
  divProductos.innerHTML = acumulador;
});
const showSuccessCard = () => {
  document.getElementById('success_toggler').style.right = '30px';
  document.getElementById('success_window').innerHTML = `
  <h3>Agregado Correctamente</h3>
  <p>El producto se agrego correctamente al carrito</p>`;
  setTimeout(() => {
    document.getElementById('success_toggler').style.right = '-350px';
  }, 2000);
};
const mostrarElementosEnCarrito = () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    document.getElementById(
      'main_cart'
    ).innerHTML = `<h4 class="cart_NHP">No hay productos</h4>`;
  } else {
    document.getElementById('main_cart').innerHTML = `<h4>hay productos</h4>`;
    let acumulador = '';
    for (let j = 0; j < carrito.length; j++) {
      if (productos[carrito[j]].discount == 0) {
        acumulador += `
        <div class="product">
        <div class="product__name">
          <h3>${productos[carrito[j]].name}</h3>
          </div>
          <div class="product__price">
            <div class="product__originalprice">
              <p>$${productos[carrito[j]].price}</p>
              </div>
              <div class="product__discount">
              <p>N/A</p>
              </div>
              </div>
              <div class="product__description">
              <p>${productos[carrito[j]].desc}</p>
              </div>
              <div class="product__category">
              <h3>${productos[carrito[j]].category}</h3>
              </div>
              <div class="cross_container">
              <button href="#" class="crossbutton" value="${
                productos[carrito[j]].name
              }"> <img src="assets/x.png" class="cart_cross" alt="" /></button>
              </div>
              </div>`;
      } else {
        let discountedPrice =
          productos[carrito[j]].price -
          (productos[carrito[j]].price / 100) * productos[carrito[j]].discount;
        acumulador += `
        <div class="product">
          <div class="product__name">
            <h3>${productos[carrito[j]].name}</h3>
            </div>
          <div class="product__price_discounted">
            <div class="product__originalprice">
            <p>$${productos[carrito[j]].price}</p>
            </div>
            <div class="product__discount">
              <p>${productos[carrito[j]].discount}% off</p>
              </div>
              <div class="product__finalPrice">
              <p>$${discountedPrice}</p>
            </div>
          </div>
          <div class="product__description">
            <p>${productos[carrito[j]].desc}</p>
          </div>
          <div class="product__category">
            <h3>${productos[carrito[j]].category}</h3>
          </div>
          <div class="cross_container">
              <button href="#" class="crossbutton" value="${
                productos[carrito[j]].name
              }"> <img src="assets/x.png" class="cart_cross" alt="" /></button>
              </div>
      </div>`;
      }
    }
    document.getElementById('main_cart').innerHTML = acumulador;
    crossCartButton = document.getElementsByClassName('crossbutton');
    for (let i = 0; i < crossCartButton.length; i++) {
      crossCartButton[i].addEventListener('click', () => {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let j = 0; j < productos.length; j++) {
          if (crossCartButton[i].value == productos[j].name) {
            let resultado = carrito.filter((e) => e != j);
            localStorage.setItem('carrito', JSON.stringify(resultado));
          }
        }
        mostrarElementosEnCarrito();
      });
    }
  }
};

// document.getElementsByClassName("buy").forEach

showProducts();
