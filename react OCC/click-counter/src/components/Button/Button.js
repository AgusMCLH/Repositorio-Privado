import React, { useState, useEffect } from 'react';
import Contador from '../Contador/Contador';

const Button = () => {
  const [num, setNum] = useState(0);

  const clickHandler = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    console.log('Se cargo el DOM');
  }, []);
  useEffect(() => {
    console.log('counter cambio');
  }, [num]);
  return (
    <>
      <button onClick={clickHandler}>Contar</button>
      <br />
      <Contador numero={num}></Contador>
    </>
  );
};

export default Button;
