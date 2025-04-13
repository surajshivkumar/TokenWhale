document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup DOM loaded");

  const optimizeBtn = document.getElementById("optimizeBtn");
  const statusElement = document.getElementById("status");

  optimizeBtn.addEventListener("click", function () {
    console.log("Optimize button clicked");
    statusElement.textContent = "Optimizing...";
    statusElement.className = "";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || tabs.length === 0) {
        console.error("No active tab found");
        statusElement.textContent = "Error: No active tab found";
        statusElement.className = "error";
        return;
      }

      console.log("Sending message to content script in tab:", tabs[0].id);

      // Send a message to the content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "optimize" },
        function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            statusElement.textContent =
              "Error: " + chrome.runtime.lastError.message;
            statusElement.className = "error";
            return;
          }

          console.log("Response received:", response);

          // Show feedback to the user
          if (response && response.success) {
            statusElement.textContent = "Text optimized!";
            statusElement.className = "success";
          } else {
            statusElement.textContent = "No input field found.";
            statusElement.className = "error";
          }

          // Close the popup after a short delay
          setTimeout(() => window.close(), 1500);
        }
      );
    });
  });
});
