import React from "react";
import { useEffect } from "react";
import { getFirestore, doc, getDoc} from 'firebase/firestore'
import { useState } from "react";


const ItemById = ({id})=>{
    let [producto, setproducto] = useState({});
    
    useEffect(()=>{
        const db= getFirestore()
        const ItemRef = doc(db,'items',id)
        getDoc(ItemRef).then((snapshot)=>{
            const item = {
            id: snapshot.id,
                ...snapshot.data()
            }
            setproducto(item);
        })

    },[])
            console.log(producto.title);
    return <div>{id}</div>
}

export default ItemById

