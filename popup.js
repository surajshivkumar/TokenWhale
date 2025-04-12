// Example data fetching and updating analytics
document.addEventListener("DOMContentLoaded", () => {
  const tokensSavedElement = document.getElementById("tokensSaved");
  const carbonEmissionsElement = document.getElementById("carbonEmissions");
  const electricityUtilizedElement = document.getElementById("electricityUtilized");

  // Simulated data (replace with actual logic)
  const tokensSaved = 120; // Example value
  const carbonEmissions = (tokensSaved * 0.02).toFixed(2); // Example calculation

  tokensSavedElement.textContent = tokensSaved;
  carbonEmissionsElement.textContent = `${carbonEmissions}g`;

  // Removed electricity slider logic

  const logoutButton = document.getElementById("LogoutBtn");

  logoutButton.addEventListener("click", () => {
    window.location.href = "login.html"; // Redirect to the login page
  });
});