import React from "react";
import { useParams } from "react-router";
const PeopleID = () =>{
    
    let {id}=useParams();
   
    return <div> Soy People con el id {id}</div>
}

export default PeopleID;