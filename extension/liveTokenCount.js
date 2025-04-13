// subtract 15 words of existing content from wordcount
function countWords(text) {
  return text.trim().split(/\s+/).length - 36;
}

function countTokens(wordCount) {
  return wordCount / 0.75;
}

function getBarColor(tokenCount) {
  if (tokenCount >= 1000) {
    return "#FF0000"; // Red at 1000+
  } else if (tokenCount >= 500) {
    return "#FFA500"; // Orange at 500+
  } else if (tokenCount >= 100) {
    return "#FFFF00"; // Yellow at 100+
  } else {
    return "#32CD32"; // Green for lower values
  }
}

function getGlowEffect(tokenCount) {
  if (tokenCount >= 1000 || tokenCount >= 500 || tokenCount >= 100) {
    return "0 0 10px 2px " + getBarColor(tokenCount);
  }
  return "none";
}

function createOrUpdateTokenCountElement(wordCount, tokenCount) {
  let tokenCountContainer = document.getElementById("token-count-container");

  if (!tokenCountContainer) {
    // Create container
    tokenCountContainer = document.createElement("div");
    tokenCountContainer.id = "token-count-container";
    tokenCountContainer.style.position = "fixed";
    tokenCountContainer.style.top = "88px";
    tokenCountContainer.style.right = "20px";
    tokenCountContainer.style.padding = "10px";
    tokenCountContainer.style.borderRadius = "5px";
    tokenCountContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    tokenCountContainer.style.zIndex = "9999";
    tokenCountContainer.style.width = "180px";
    tokenCountContainer.style.fontFamily = "Arial, sans-serif";

    // Create text element
    const textElement = document.createElement("div");
    textElement.id = "token-count";

    // Create progress bar container
    const barContainer = document.createElement("div");
    barContainer.style.width = "100%";
    barContainer.style.height = "8px";
    barContainer.style.backgroundColor = "#e0e0e0";
    barContainer.style.borderRadius = "4px";
    barContainer.style.marginTop = "5px";
    barContainer.style.overflow = "hidden";

    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.id = "token-progress-bar";
    progressBar.style.height = "100%";
    progressBar.style.width = "0%";
    progressBar.style.transition =
      "width 0.5s, background-color 0.5s, box-shadow 0.5s";

    // Assemble elements
    barContainer.appendChild(progressBar);
    tokenCountContainer.appendChild(textElement);
    tokenCountContainer.appendChild(barContainer);
    document.body.appendChild(tokenCountContainer);
  }

  // Update background color based on dark/light mode
  tokenCountContainer.style.backgroundColor = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "#222"
    : "white";
  tokenCountContainer.style.color = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "white"
    : "black";

  // Update text content
  const textElement = document.getElementById("token-count");
  textElement.innerText = `${Math.round(
    Math.max(tokenCount - 5, 0)
  )} tokens = ${Math.max(wordCount - 5, 0)} words`;

  // Update progress bar
  const progressBar = document.getElementById("token-progress-bar");

  // Calculate width percentage (capped at 100%)
  const percentage = Math.min((tokenCount / 1500) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  // Update color based on token count thresholds
  progressBar.style.backgroundColor = getBarColor(tokenCount);

  // Add glow effect at specific thresholds
  progressBar.style.boxShadow = getGlowEffect(tokenCount);
}

function updateCounts() {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;

  const wordCount = countWords(mainElement.textContent);
  const tokenCount = countTokens(wordCount);

  createOrUpdateTokenCountElement(wordCount, tokenCount);
}

let previousMainContent = "";

function checkForMainContentChanges() {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;

  const currentMainContent = mainElement.textContent;

  if (previousMainContent !== currentMainContent) {
    previousMainContent = currentMainContent;
    updateCounts();
  }
}

setInterval(checkForMainContentChanges, 500);

document.addEventListener("DOMContentLoaded", () => {
  updateCounts();
});

// Listen for theme changes to update colors accordingly
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateCounts);
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", updateCounts);

// Handle communication with popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "requestCounts") {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      const wordCount = countWords(mainElement.textContent);
      const tokenCount = countTokens(wordCount);
      sendResponse({ type: "counts", tokenCount, wordCount });
    }
  }
  return true; // Required to keep the sendResponse callback valid
});
