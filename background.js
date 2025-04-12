chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    // Simulate optimization logic
    const optimizedText = message.text.trim().toUpperCase(); // Example: Convert to uppercase
    sendResponse({ optimizedText });
  }
});
