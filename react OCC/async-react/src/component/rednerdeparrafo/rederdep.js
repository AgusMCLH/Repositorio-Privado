import React from 'react';

const Parrafo = ({ productos }) => {
  return (
    <>
      {productos.map(({ id, name, price }) => (
        <p key={id}>
          El producto {name} tiene un precio de {price}
        </p>
      ))}
    </>
  );
  console.log(productos);
};

export default Parrafo;
