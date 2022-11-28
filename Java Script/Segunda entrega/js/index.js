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
const regexNumber = /[0-9]/;
let productos = [];
let checkedCamps = 0;
let divProductos = document.getElementsByClassName('productos');
divProductos = divProductos[0];

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
      console.log(listaInputsLetras[i] + 'no cumple');
    }
  }
  //Recorre el array de los campos de numeros validandolos
  for (let i = 0; i < listaInputsNumber.length; i++) {
    if (validarNumeros(listaInputsNumber[i])) {
      checkedCamps++;
    } else {
      console.log(listaInputsNumber[i] + 'no cumple');
    }
  }
  if (productDiscount.value <= 100 && productDiscount.value >= 0) {
    if (checkedCamps === listaInputsLetras.concat(listaInputsNumber).length) {
      agregar();
      console.log('todo ok');
    }
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
  console.log(productos);
};

const showProducts = () => {
  let acumulador = '';
  productos.forEach((producto) => {
    // acumulador += ;
  });
};

console.log(divProductos);

// divProductos.style.backgroundColor = 'black';
