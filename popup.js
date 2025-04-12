// Example data fetching and updating analytics
document.addEventListener("DOMContentLoaded", () => {
  const tokensSavedElement = document.getElementById("tokensSaved");
  const carbonEmissionsElement = document.getElementById("carbonEmissions");

  // Simulated data (replace with actual logic)
  const tokensSaved = 120; // Example value
  const carbonEmissions = (tokensSaved * 0.02).toFixed(2); // Example calculation

  tokensSavedElement.textContent = tokensSaved;
  carbonEmissionsElement.textContent = `${carbonEmissions}g`;
});