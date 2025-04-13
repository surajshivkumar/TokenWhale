document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  if (!loginForm || !errorMessage) {
    console.error("Required elements are missing from the DOM.");
    return;
  }

  // Simulated user database
  const users = {
    "testUser": "password123",
    "admin": "adminPass"
  };

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) {
      console.error("Username or password input elements are missing.");
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (users[username] && users[username] === password) {
      alert("Login successful!");
      // Use chrome.tabs.create to open a new tab for popup.html
      chrome.tabs.create({ url: "popup.html" });
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
});
