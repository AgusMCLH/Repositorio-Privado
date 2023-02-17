import React, { useEffect, useState } from 'react';
import Parrafo from './../rednerdeparrafo/rederdep';
import data from './../Files/Products.json';

const productos = [
  {
    id: 1,
    name: 'gorra',
    price: 15000,
    stock: 15,
  },
  {
    id: 2,
    name: 'remera',
    price: 40000,
    stock: 40,
  },
  {
    id: 3,
    name: 'sudadera',
    price: 120000,
    stock: 3,
  },
  {
    id: 4,
    name: 'jeans',
    price: 80000,
    stock: 1,
  },
];

const Test = () => {
  const [listaDeProductos, funcionAgrgarProducto] = useState([]);
  useEffect(() => {
    const promesa = new Promise((res) => {
      // setTimeout(() => {
      res(data);
      // }, 3000);
    });
    promesa.then((res) => {
      funcionAgrgarProducto(res);
    });
  }, []);
  return <Parrafo productos={listaDeProductos} />;
};

export default Test;
