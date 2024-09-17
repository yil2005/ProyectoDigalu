// Importa la función que realiza la inserción
import { UserInsert} from '../utils/api/request.js';

const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// Función de autenticación
export async function LoginAuth(event) {
  event.preventDefault();
  console.log("Autenticación en progreso");
  let formLogin = document.getElementById("login");  
  let formData = new FormData(formLogin);
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const result = await UserLogin(data);
    console.log(result);
    
    // Guardar los datos de usuario en localStorage
    if (result.success) {
      localStorage.setItem('userData', JSON.stringify(result.data));
      window.location.href = "index.html";
    } else {
      console.log("Error en el login:", result.message);
    }
  } catch (error) {
    console.log(error);
  }
}

// Función de registro
export async function LoginRegister(event) {
  event.preventDefault();
  console.log("Registro en progreso");

  let formRegister = document.getElementById("register");
  let formData = new FormData(formRegister);
  const data = Object.fromEntries(formData);

  try {
    const result = await UserInsert(data);
    console.log(result);

    if (result.success) {
      console.log("Datos recibidos:", result.data);

      // Guardar los datos recibidos en localStorage
      localStorage.setItem('userData', JSON.stringify(result.data));

      // Redirigir a index.html
      window.location.href = "index.html";
    } else {
      console.log("Error:", result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }

  formRegister.reset();
}

// Asignar eventos a los formularios
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById('login');
  const formRegister = document.getElementById('register');
  if (formLogin) {
    formLogin.addEventListener('submit', LoginAuth);
  }
  if (formRegister) {
    formRegister.addEventListener('submit', LoginRegister);
  }
});
