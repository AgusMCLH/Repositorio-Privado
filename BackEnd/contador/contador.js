const objeto = {};

// Número aleatorio entre 1 y 20

const repeat = (n, _function) => {
  for (let j = 0; j < n; j++) {
    _function();
  }
};

const addRandomNumber = () => {
  const numero = Math.floor(Math.random() * 20) + 1;
  objeto[numero] = objeto[numero] + 1 || 1;
};

repeat(10000, addRandomNumber);

console.log(objeto);
