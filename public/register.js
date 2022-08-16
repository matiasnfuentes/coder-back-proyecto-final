const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const register = document.getElementById("register");

login.onclick = (e) => {
  window.location = "/";
};

const preview = () => {
  frame.src = URL.createObjectURL(event.target.files[0]);
};
const clearImage = () => {
  document.getElementById("avatar").value = null;
  frame.src = "";
};
