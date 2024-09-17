import { UrlUserInsert } from '../consts.js';

// Función para registrar al usuario
export async function UserInsert(datos) {
  try {
    const response = await fetch(UrlUserInsert, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


