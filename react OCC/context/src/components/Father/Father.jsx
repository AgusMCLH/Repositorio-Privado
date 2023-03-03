import React, { useContext } from "react";
import Child from "../child/Child";
import ThemeContext from "../../context/ThemeContext";

const Father = ()=>{
    let {valor}=useContext(ThemeContext)
    return <>
    <div>
    Hola soy Father {valor}
    </div>
    <Child></Child></>
}

export default Father;