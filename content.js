// Load the required modules
// Note: These are already loaded in the page because we include them in manifest.json
// queryPatterns and QueryOptimizer should be available

// Initialize optimizer with patterns
const optimizer = new QueryOptimizer(queryPatterns);

// Token counting functions
function estimateTokenCount(text) {
  return Math.ceil(text.length / 4);
}

function countTokensMore(text) {
  // Split by spaces and punctuation
  const words = text
    .split(/[\s,.!?;:()\[\]{}"\-]+/)
    .filter((word) => word.length > 0);

  let tokenCount = 0;
  for (const word of words) {
    if (word.length <= 2) {
      // Short words are typically one token
      tokenCount += 1;
    } else if (word.length <= 6) {
      // Medium words might be one token
      tokenCount += 1;
    } else {
      // Longer words are typically broken into multiple tokens
      tokenCount += Math.ceil(word.length / 4);
    }
  }

  return tokenCount;
}

// Track last response to avoid duplicates
let lastResponseText = "";

// Function to get the latest response text using the specific class selector
function getLatestResponseText() {
  const responses = document.getElementsByClassName(
    "markdown markdown-main-panel tutor-markdown-rendering stronger"
  );

  if (responses && responses.length > 0) {
    return responses.item(responses.length - 1).innerText;
  } else {
    console.log("No response elements found");
    return null;
  }
}

// Function to extract Gemini response and count tokens
function extractGeminiResponse() {
  console.log("Checking for Gemini responses...");

  const responseText = getLatestResponseText();

  if (responseText && responseText !== lastResponseText) {
    lastResponseText = responseText;

    // Count tokens
    const simpleTokenCount = estimateTokenCount(responseText);
    const betterTokenCount = countTokensMore(responseText);

    // Look for token count in the response itself
    const tokenCountMatch = responseText.match(/Number of tokens:\s*(\d+)/i);
    let tokenCount = tokenCountMatch ? parseInt(tokenCountMatch[1]) : null;

    // Log to console
    console.log("=== GEMINI RESPONSE TOKEN COUNT ===");
    if (tokenCount) {
      console.log(responseText);
      console.log(`Gemini reported token count: ${tokenCount} tokens`);
    }
    console.log(`Simple estimate (chars/4): ${simpleTokenCount} tokens`);
    console.log(`Better estimate: ${betterTokenCount} tokens`);
    console.log(`Character count: ${responseText.length} chars`);
    console.log("===================================");

    return {
      text: responseText,
      actualTokenCount: tokenCount,
      simpleTokenCount,
      betterTokenCount,
    };
  }

  return null;
}

// Function to find and optimize the input field
function findAndOptimizeInputField() {
  console.log("Attempting to find and optimize input field");

  // Get all potential input elements (both textarea and contenteditable divs)
  const textareas = document.querySelectorAll("textarea");
  const editableDivs = document.querySelectorAll('[contenteditable="true"]');

  // Look for textarea elements first
  let targetField = null;

  for (const textarea of textareas) {
    // Check if the textarea is visible
    if (
      textarea.offsetParent !== null &&
      !textarea.disabled &&
      textarea.style.display !== "none"
    ) {
      console.log("Found potential textarea input field:", textarea);
      targetField = textarea;
      // Focus on largest/most recently active textarea
      if (textarea.value.length > 0 || document.activeElement === textarea) {
        break;
      }
    }
  }

  // If no suitable textarea found, try contenteditable divs
  if (!targetField) {
    for (const div of editableDivs) {
      if (div.offsetParent !== null && div.style.display !== "none") {
        console.log("Found potential contenteditable div:", div);
        targetField = div;
        break;
      }
    }
  }

  if (targetField) {
    console.log("Target field found, optimizing text");

    // Handle different types of input fields
    if (targetField.tagName.toLowerCase() === "textarea") {
      // For textarea elements
      const originalText = targetField.value;

      // Apply the optimization
      const result = optimizer.optimize(originalText);
      console.log("Optimization result:", result);

      // Replace the text with the optimized version
      targetField.value = result.optimized;
      targetField.dispatchEvent(new Event("input", { bubbles: true }));
      console.log("Text optimized in textarea");
    } else {
      // For contenteditable divs
      const originalText = targetField.textContent;

      // Apply the optimization
      const result = optimizer.optimize(originalText);
      console.log("Optimization result:", result);

      // Replace the text with the optimized version
      targetField.textContent = result.optimized;
      targetField.dispatchEvent(new Event("input", { bubbles: true }));
      console.log("Text optimized in contenteditable div");
    }

    return true;
  }

  console.log("No suitable input field found");
  return false;
}

// Set up observer to watch for responses
function setupResponseObserver() {
  console.log("Setting up response observer for Gemini");

  const observer = new MutationObserver((mutations) => {
    // Check if there are DOM changes
    let shouldCheck = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0 || mutation.type === "childList") {
        shouldCheck = true;
        break;
      }
    }

    if (shouldCheck) {
      // Small delay to ensure content is fully rendered
      setTimeout(extractGeminiResponse, 500);
    }
  });

  // Find main container
  const possibleContainers = [
    document.querySelector("main"),
    document.querySelector(".conversation-container"),
    document.querySelector('[role="main"]'),
    document.body, // Fallback
  ];

  const container = possibleContainers.find((el) => el !== null);

  if (container) {
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    console.log("Monitoring Gemini responses for token counting");

    // Do an initial check
    setTimeout(extractGeminiResponse, 1000);
  }
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received:", request);
  if (request.action === "optimize") {
    const success = findAndOptimizeInputField();
    sendResponse({ success: success });
    return true; // Keep the message channel open for async response
  }
});

// Set up a listener for the Command+K shortcut directly
document.addEventListener("keydown", function (event) {
  // Check for Command+K (Mac) or Ctrl+K (Windows/Linux)
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    console.log(
      "Keyboard shortcut detected: " + (event.metaKey ? "Command+K" : "Ctrl+K")
    );
    event.preventDefault(); // Prevent default browser behavior
    findAndOptimizeInputField();
  }
});

// Start monitoring for responses when page loads
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", setupResponseObserver);
} else {
  setupResponseObserver();
}

// Also manually trigger a token count check when loaded
console.log("Content script loaded, will check for Gemini responses");
setTimeout(function () {
  const responseText = getLatestResponseText();
  if (responseText) {
    // Count tokens
    const simpleTokenCount = estimateTokenCount(responseText);
    const betterTokenCount = countTokensMore(responseText);

    // Look for token count in the response itself
    const tokenCountMatch = responseText.match(/Number of tokens:\s*(\d+)/i);
    let tokenCount = tokenCountMatch ? parseInt(tokenCountMatch[1]) : null;

    // Log to console
    console.log("=== GEMINI RESPONSE TOKEN COUNT ===");
    if (tokenCount) {
      console.log(`Gemini reported token count: ${tokenCount} tokens`);
    }
    console.log(`Simple estimate (chars/4): ${simpleTokenCount} tokens`);
    console.log(`Better estimate: ${betterTokenCount} tokens`);
    console.log(`Character count: ${responseText.length} chars`);
    console.log("===================================");
  }
}, 2000);
