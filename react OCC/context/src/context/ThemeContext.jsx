import React from "react";

const ThemeContext = React.createContext();

const Contexto = ()=>{
    return (<ThemeContext.Provider></ThemeContext.Provider>)
}

export {Contexto, ThemeContext}