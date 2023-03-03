import './App.css';
import Grandpa from './components/Grandpa/Grandpa';
import { ThemeContext, Contexto } from './context/ThemeContext';
import { useState } from 'react';

function App() {
  const [valor, setValor] = useState(1);
  return (
    <div>
      <Contexto.Provider value={{ valor, setValor }}>
        <Grandpa></Grandpa>
      </Contexto.Provider>
    </div>
  );
}

export default App;
