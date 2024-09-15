// Importa la función que realiza la inserción
import { UserInsert } from '../utils/api/request.js';


const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });

// Definir las funciones LoginAuth y LoginRegister
export function LoginAuth(event) {
  event.preventDefault();
  console.log("Autenticación en progreso");
  let formLogin = document.getElementById("login");  
  let formData = new FormData(formLogin);
  const data = Object.fromEntries(formData);
  console.log(data);
}

export function LoginRegister(event) {
  event.preventDefault();
  console.log("Registro en progreso");
  let formRegister = document.getElementById("register");
  let formData = new FormData(formRegister);
  const data = Object.fromEntries(formData);
  UserInsert(data);  // Aquí llamas a la función UserInsert con los datos del formulario
  formRegister.reset();
}

// Asignar los eventos a los formularios
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById('login');
  const formRegister = document.getElementById('register');
  if (formLogin) {
    formLogin.addEventListener('submit', LoginAuth);  }
  if (formRegister) {
    formRegister.addEventListener('submit', LoginRegister);
  }
});
