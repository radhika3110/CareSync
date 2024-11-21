const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_js = document.querySelector(".signin-signup");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

login_js.addEventListener('submit', function (e) {
  e.preventDefault();
  // Replace with actual login logic
  alert('Login successful!');
  window.location.href = 'home.html';
});

