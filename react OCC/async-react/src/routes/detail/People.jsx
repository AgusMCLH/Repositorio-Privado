import React from "react";
import { useParams } from "react-router";
const People = () =>{
    
    let {id}=useParams();
   
    if (id==undefined) {
        console.log('hecho');
        return <div> Soy People sin id</div>
    }
    return <div> Soy People con el id {id}</div>
}

export default People;