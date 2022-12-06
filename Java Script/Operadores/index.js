let temperatura = prompt('que temperatura hace?');
const usuarioGuardar = {
  nombre: 'Jhonathan',
  edad: 19,
  presupuesto: 2000,
};
localStorage.setItem('usurio', JSON.stringify(usuarioGuardar));
//IFTERNARIO
console.log('If tradicional');
if (temperatura > 25) {
  console.log('La temperatura es mayor a 25');
} else {
  console.log('La temperatura es menor a 25');
}

console.log('Ifternario');

console.log(
  temperatura > 25
    ? 'La temperatura es mayor a 25'
    : 'La temperatura es menor a 25'
);
let usuario = JSON.parse(localStorage.getItem('usurio'));
console.log(usuario?.nombre || 'No tiene Nombre');

// const permitido = usuario.edad <= 18;

// alert(
//   usuario.edad >= 18 ? 'tiene edad suficiente' : 'no tiene edad suficiente'
// );
// //AND e iftermario

// usuario.edad >= 18 && alert('es mayor');
// /*simplifica el

// if (usuario.edad >= 18) {
//   alert('es mayor');
// }

// */

// //OR
// localStorage.setItem('test', 'hola');
// let stored = localStorage.getItem('test') || '';
// console.log(stored.toUpperCase());
// //NULISH

// console.log(NaN ?? 'NULISH');
// console.log('' ?? 'NULISH');
// console.log('Hola mundo' ?? 'NULISH');
// console.log(0 ?? 'NULISH');
// console.log(undefined ?? 'NULISH');
// console.log(null ?? 'NULISH');

// const nombre = usuario.nombre;
// const edad = usuario.edad;

const { nombre, edad } = usuario;

// Tambien se puede poner un alias a la variable
// const { nombre: user, edad } = usuario;
// En este caso se guardaria la variable user con el valor de usuario.nombre

console.log(nombre, edad);
