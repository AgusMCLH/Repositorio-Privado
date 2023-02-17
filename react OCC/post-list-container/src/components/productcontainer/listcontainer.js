import React from 'react';

const RenderProducts = ({ productos }) => {
  return (
    <>
      {productos.map(({ id, title, price }) => {
        return (
          <div key={id}>
            <p>Nombre: {title}</p>
            <p>Precio: {price}</p>
          </div>
        );
      })}
    </>
  );
};

export default RenderProducts;
