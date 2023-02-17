import React, { useEffect, useState } from 'react';
import RenderProducts from '../productcontainer/listcontainer';

const Call = () => {
  const [listaDeProductos, funcionAgrgarProducto] = useState([
    { id: 1, name: 'err', price: 'err' },
  ]);
  useEffect(() => {
    fetch('https://api.mercadolibre.com/sites/MLU/search?q=remeras+nike#json')
      .then((res) => res.json())
      .then((res) => {
        funcionAgrgarProducto(res.results);
      });
  }, []);
  // console.log(listaDeProductos);

  return <RenderProducts productos={listaDeProductos} />;
};

export default Call;
