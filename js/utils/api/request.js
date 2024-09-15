import {UrlUserInsert} from '../consts.js';

 export async function UserInsert (datos) {
    console.log(datos)
    
    try {
        const response = await fetch(UrlUserInsert, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        const data = await response.json();
        console.log(data.data);        
    } catch (error) {
        console.log(error);        
    }    
    
    
}