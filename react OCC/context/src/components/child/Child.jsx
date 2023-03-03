import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const Child = ()=>{

    const {valor, setValor}=useContext(ThemeContext)
    console.log(valor);
    
    const clickHandler = ()=>{
        
        setValor(valor+1)
    }

    return <>
    <div>
    Hola soy child
    </div>
    <button onClick={clickHandler}>HACE ALGO</button>
    </>
}

export default Child;