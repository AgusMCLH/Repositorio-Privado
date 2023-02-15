import React from 'react';

const Parrafo = ({ productos }) => {
  console.log(productos);
  return (
    <>
      {productos.map((producto) => (
        <p key={producto.id}>
          El producto {producto.name} tiene un precio de {producto.price}
        </p>
      ))}
    </>
  );
};

export default Parrafo;
