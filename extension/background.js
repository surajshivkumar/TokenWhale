// Log when the background script is loaded
console.log("Background script loaded");

// Listen for the keyboard command
chrome.commands.onCommand.addListener((command) => {
  console.log("Command received:", command);

  if (command === "optimize-text") {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || tabs.length === 0) {
        console.error("No active tab found");
        return;
      }

      console.log("Active tab found:", tabs[0].id);

      // Send a message to the content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "optimize" },
        function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            return;
          }

          console.log("Response received:", response);
          console.log(
            "Optimization " + (response?.success ? "successful" : "failed")
          );
        }
      );
    });
  }
});

// Also listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");

  // This will handle clicks when there's no popup
  // If you're using the popup (popup.html), this won't be triggered
  chrome.tabs.sendMessage(tab.id, { action: "optimize" }, function (response) {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError);
      return;
    }

    console.log("Response received:", response);
  });
});
