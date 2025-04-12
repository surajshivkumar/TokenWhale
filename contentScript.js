// Inject the floating button
const button = document.createElement("button");
button.textContent = "🐋 Optimize";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.padding = "10px 15px";
button.style.backgroundColor = "#007bff";
button.style.color = "#fff";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
button.style.zIndex = "10000";
button.style.transition = "background-color 0.3s ease";
button.addEventListener("mouseover", () => {
  button.style.backgroundColor = "#0056b3";
});
button.addEventListener("mouseout", () => {
  button.style.backgroundColor = "#007bff";
});
document.body.appendChild(button);

// Handle button click
button.addEventListener("click", () => {
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName === "TEXTAREA" ||
      (activeElement.tagName === "INPUT" &&
        activeElement.getAttribute("type") === "text"))
  ) {
    const originalText = activeElement.value;
    chrome.runtime.sendMessage({ text: originalText }, (response) => {
      if (response && response.optimizedText) {
        activeElement.value = response.optimizedText;

        // Show confirmation message
        const confirmation = document.createElement("div");
        confirmation.textContent = "✅ Prompt Optimized!";
        confirmation.style.position = "fixed";
        confirmation.style.bottom = "60px";
        confirmation.style.right = "20px";
        confirmation.style.backgroundColor = "#28a745";
        confirmation.style.color = "#fff";
        confirmation.style.padding = "5px 10px";
        confirmation.style.borderRadius = "5px";
        confirmation.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        confirmation.style.zIndex = "10000";
        document.body.appendChild(confirmation);

        setTimeout(() => {
          confirmation.style.transition = "opacity 0.5s ease";
          confirmation.style.opacity = "0";
          setTimeout(() => confirmation.remove(), 500);
        }, 2000);
      }
    });
  } else {
    alert("Please focus on a text input or textarea to optimize.");
  }
});
