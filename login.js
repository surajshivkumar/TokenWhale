document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulated login logic (replace with actual authentication logic)
    if (username === "admin" && password === "password") {
      window.location.href = "popup.html"; // Redirect to the main page
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
});
