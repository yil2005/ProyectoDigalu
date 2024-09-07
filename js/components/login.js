const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });

function LoginAuth(event){
  console.log("estamos en atentifacacion");
  event.preventDefault();
  let FormLogin = document.getElementById("login");  
  let formData = new FormData(FormLogin );
  const data = Object.fromEntries(formData);
  console.log(data);
}
function LoginRegister(event) {
  console.log("estamos en registro");
  event.preventDefault();
  let loginregister = document.getElementById("register");
  let formData = new FormData(loginregister);
  const data = Object.fromEntries(formData);
  console.log(data);
}
