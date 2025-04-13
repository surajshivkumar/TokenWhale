// Simple Image Optimizer Button that will definitely be visible
// Just add this to your extension

(function () {
  // Make sure we're on a compatible site
  if (
    !window.location.href.includes("chat.openai.com") &&
    !window.location.href.includes("gemini.google.com")
  ) {
    return;
  }

  // Create and inject CSS
  const style = document.createElement("style");
  style.textContent = `
      #token-whale-img-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #0284c7;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 100000;
        font-size: 24px;
        border: none;
        outline: none;
      }
      
      #token-whale-img-preview {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 300px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 100000;
        display: none;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      
      #token-whale-img-preview.active {
        display: block;
      }
      
      .tw-header {
        padding: 15px;
        background: #f1f5f9;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .tw-title {
        font-weight: 600;
        font-size: 16px;
        color: #0f172a;
      }
      
      .tw-close {
        cursor: pointer;
        font-size: 20px;
        color: #64748b;
      }
      
      .tw-content {
        padding: 15px;
      }
      
      .tw-images {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 15px;
      }
      
      .tw-img-container {
        text-align: center;
      }
      
      .tw-img-container img {
        max-width: 100%;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
      }
      
      .tw-img-label {
        margin-top: 5px;
        font-size: 12px;
        color: #64748b;
      }
      
      .tw-stats {
        background: #f8fafc;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
        font-size: 13px;
        color:black;
      }
      
      .tw-actions {
        display: flex;
        gap: 10px;
      }
      
      .tw-btn {
        flex: 1;
        padding: 8px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        border: none;
        outline: none;
      }
      
      .tw-btn-primary {
        background: #0284c7;
        color: white;
      }
      
      .tw-btn-secondary {
        background: #e2e8f0;
        color: #475569;
      }
    `;
  document.head.appendChild(style);

  // Create the button
  const button = document.createElement("button");
  button.id = "token-whale-img-btn";
  button.innerHTML = "🐋";
  button.title = "Optimize image for GPT";
  document.body.appendChild(button);

  // Create the preview container (hidden initially)
  const preview = document.createElement("div");
  preview.id = "token-whale-img-preview";
  preview.innerHTML = `
      <div class="tw-header">
        <div class="tw-title">Image Optimizer</div>
        <div class="tw-close">×</div>
      </div>
      <div class="tw-content">
        <div class="tw-images">
          <div class="tw-img-container">
            <img id="tw-original" src="" alt="Original">
            <div class="tw-img-label">Original</div>
          </div>
          <div class="tw-img-container">
            <img id="tw-optimized" src="" alt="Optimized">
            <div class="tw-img-label">Optimized</div>
          </div>
        </div>
        <div class="tw-stats" id="tw-stats">Select an image to optimize</div>
        <div class="tw-actions">
          <button class="tw-btn tw-btn-secondary" id="tw-cancel">Cancel</button>
          <button class="tw-btn tw-btn-primary" id="tw-send">Send > </button>
        </div>
      </div>
    `;
  document.body.appendChild(preview);

  // Create hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Function to optimize image
  function optimizeImage(file) {
    return new Promise((resolve, reject) => {
      // Skip non-image files
      if (!file.type.startsWith("image/")) {
        reject(new Error("Not an image file"));
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        // Get original dimensions
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set max size (512px by default)
        const maxSize = 512;

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth, newHeight;

        if (originalWidth > originalHeight) {
          newWidth = Math.min(originalWidth, maxSize);
          newHeight = Math.round((originalHeight / originalWidth) * newWidth);
        } else {
          newHeight = Math.min(originalHeight, maxSize);
          newWidth = Math.round((originalWidth / originalHeight) * newHeight);
        }

        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            // Create a new File object
            const optimizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            // Calculate token usage
            const originalTiles =
              Math.ceil(originalWidth / 512) * Math.ceil(originalHeight / 512);
            const originalTokens = 85 + 170 * originalTiles;

            const optimizedTiles =
              Math.ceil(newWidth / 512) * Math.ceil(newHeight / 512);
            const optimizedTokens = 85 + 170 * optimizedTiles;

            resolve({
              original: {
                file: file,
                url: URL.createObjectURL(file),
                width: originalWidth,
                height: originalHeight,
                tokens: originalTokens,
                size: file.size,
              },
              optimized: {
                file: optimizedFile,
                url: URL.createObjectURL(blob),
                width: newWidth,
                height: newHeight,
                tokens: optimizedTokens,
                size: blob.size,
              },
            });
          },
          "image/jpeg",
          0.8
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load image"));
      };

      img.src = url;
    });
  }

  // Function to send optimized image to GPT
  function sendImageToGPT(file) {
    // Find GPT's file input
    const fileInputs = Array.from(
      document.querySelectorAll('input[type="file"]')
    );

    if (fileInputs.length > 0) {
      // Create a DataTransfer object
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Set the file on the first file input
      fileInputs[0].files = dataTransfer.files;

      // Trigger change event
      const event = new Event("change", { bubbles: true });
      fileInputs[0].dispatchEvent(event);

      console.log("Image sent to GPT");
      return true;
    } else {
      console.log("No file input found");
      return false;
    }
  }

  // Event listeners
  button.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Show "loading" in stats
      document.getElementById("tw-stats").textContent = "Optimizing image...";
      preview.classList.add("active");

      // Optimize the image
      const result = await optimizeImage(file);

      // Update preview
      document.getElementById("tw-original").src = result.original.url;
      document.getElementById("tw-optimized").src = result.optimized.url;

      // Update stats
      const originalSizeKB = (result.original.size / 1024).toFixed(1);
      const optimizedSizeKB = (result.optimized.size / 1024).toFixed(1);
      const tokenSavings = result.original.tokens - result.optimized.tokens;
      const percentSaved = Math.round(
        (tokenSavings / result.original.tokens) * 100
      );

      document.getElementById("tw-stats").innerHTML = `
          <div>Original: ${result.original.width}×${result.original.height} (${originalSizeKB} KB)</div>
          <div>Optimized: ${result.optimized.width}×${result.optimized.height} (${optimizedSizeKB} KB)</div>
          <div>Token reduction: ${result.original.tokens} → ${result.optimized.tokens}</div>
          <div>Tokens saved: ${tokenSavings} (${percentSaved}%)</div>
        `;

      // Store the result for the send button
      preview.dataset.optimizedFile = JSON.stringify({
        name: result.optimized.file.name,
        type: result.optimized.file.type,
        url: result.optimized.url,
      });
    } catch (error) {
      console.error("Error optimizing image:", error);
      document.getElementById("tw-stats").textContent =
        "Error: " + error.message;
    }
  });

  // Close button
  document.querySelector(".tw-close").addEventListener("click", () => {
    preview.classList.remove("active");
  });

  // Cancel button
  document.getElementById("tw-cancel").addEventListener("click", () => {
    preview.classList.remove("active");
  });

  // Send button
  document.getElementById("tw-send").addEventListener("click", async () => {
    try {
      const fileData = JSON.parse(preview.dataset.optimizedFile);

      // Get the file from the URL
      const response = await fetch(fileData.url);
      const blob = await response.blob();

      // Create a File object
      const file = new File([blob], fileData.name, { type: fileData.type });

      // Send to GPT
      const success = sendImageToGPT(file);

      if (success) {
        preview.classList.remove("active");
      } else {
        document.getElementById("tw-stats").textContent =
          "Couldn't find GPT's file input. Try using the upload button in the chat interface.";
      }
    } catch (error) {
      console.error("Error sending image:", error);
      document.getElementById("tw-stats").textContent =
        "Error sending image: " + error.message;
    }
  });

  console.log("Token Whale image optimizer initialized");
})();
// Direct Gemini Upload Interceptor
// This script intercepts Gemini's native file upload process and replaces the file with an optimized version

(function () {
  // Only run on Gemini
  if (!window.location.href.includes("gemini.google.com")) {
    return;
  }

  console.log("Gemini Upload Interceptor: Initialized");

  // Configuration
  const config = {
    enabled: true,
    maxSize: 512, // Max dimension in pixels
    quality: 0.8, // JPEG quality (0-1)
  };

  // Storage for optimized images
  const optimizedImages = new Map();

  // Add custom button styles
  function addStyles() {
    const styles = `
        #tw-optimize-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #0284c7;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          z-index: 100000;
          font-size: 20px;
          border: none;
          outline: none;
        }
        
        #tw-optimize-panel {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 250px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 100000;
          display: none;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
        }
        
        #tw-optimize-panel.active {
          display: block;
        }
        
        .tw-panel-header {
          padding: 12px;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .tw-panel-title {
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
        }
        
        .tw-panel-close {
          cursor: pointer;
          font-size: 18px;
          color: #64748b;
        }
        
        .tw-panel-content {
          padding: 12px;
        }
        
        .tw-setting {
          margin-bottom: 12px;
        }
        
        .tw-setting-label {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .tw-setting-value {
          font-weight: 600;
          color: #0284c7;
        }
        
        .tw-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          outline: none;
          -webkit-appearance: none;
        }
        
        .tw-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #0284c7;
          cursor: pointer;
        }
        
        .tw-toggle {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }
        
        .tw-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .tw-toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #e2e8f0;
          transition: 0.4s;
          border-radius: 20px;
        }
        
        .tw-toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
        
        input:checked + .tw-toggle-slider {
          background-color: #0284c7;
        }
        
        input:checked + .tw-toggle-slider:before {
          transform: translateX(20px);
        }
        
        .tw-stats {
          padding: 10px;
          background: #f8fafc;
          border-radius: 6px;
          font-size: 12px;
          color: #475569;
          margin-bottom: 12px;
        }
        
        .tw-notification {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 250px;
          background: rgba(2, 132, 199, 0.9);
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 100001;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        
        .tw-notification.active {
          opacity: 1;
          transform: translateY(0);
        }
      `;

    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Create UI
  function createUI() {
    // Create button
    const button = document.createElement("button");
    button.id = "tw-optimize-btn";
    button.innerHTML = "";
    button.title = "Toggle image optimization settings";
    document.body.appendChild(button);

    // Create panel
    const panel = document.createElement("div");
    panel.id = "tw-optimize-panel";
    panel.innerHTML = `
        <div class="tw-panel-header">
          <div class="tw-panel-title">Image Optimizer</div>
          <div class="tw-panel-close">×</div>
        </div>
        <div class="tw-panel-content">
          <div class="tw-setting">
            <div class="tw-setting-label">
              <span>Enable Optimization</span>
              <label class="tw-toggle">
                <input type="checkbox" id="tw-enable-toggle" checked>
                <span class="tw-toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="tw-setting">
            <div class="tw-setting-label">
              <span>Maximum Size</span>
              <span class="tw-setting-value" id="tw-size-value">512px</span>
            </div>
            <input type="range" min="256" max="1024" step="128" value="512" class="tw-slider" id="tw-size-slider">
          </div>
          
          <div class="tw-setting">
            <div class="tw-setting-label">
              <span>Image Quality</span>
              <span class="tw-setting-value" id="tw-quality-value">80%</span>
            </div>
            <input type="range" min="50" max="100" step="10" value="80" class="tw-slider" id="tw-quality-slider">
          </div>
          
          <div class="tw-stats" id="tw-stats">
            <div>Images optimized: <strong>0</strong></div>
            <div>Tokens saved: <strong>0</strong></div>
          </div>
        </div>
      `;
    document.body.appendChild(panel);

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "tw-notification";
    notification.id = "tw-notification";
    document.body.appendChild(notification);

    // Handle button click
    button.addEventListener("click", () => {
      panel.classList.toggle("active");
    });

    // Handle panel close
    document.querySelector(".tw-panel-close").addEventListener("click", () => {
      panel.classList.remove("active");
    });

    // Handle size slider
    const sizeSlider = document.getElementById("tw-size-slider");
    const sizeValue = document.getElementById("tw-size-value");

    sizeSlider.addEventListener("input", () => {
      sizeValue.textContent = sizeSlider.value + "px";
      config.maxSize = parseInt(sizeSlider.value);
    });

    // Handle quality slider
    const qualitySlider = document.getElementById("tw-quality-slider");
    const qualityValue = document.getElementById("tw-quality-value");

    qualitySlider.addEventListener("input", () => {
      qualityValue.textContent = qualitySlider.value + "%";
      config.quality = parseInt(qualitySlider.value) / 100;
    });

    // Handle toggle
    const enableToggle = document.getElementById("tw-enable-toggle");

    enableToggle.addEventListener("change", () => {
      config.enabled = enableToggle.checked;
      if (config.enabled) {
        showNotification("Image optimization enabled");
      } else {
        showNotification("Image optimization disabled");
      }
    });
  }

  // Function to show a notification
  function showNotification(message, duration = 3000) {
    const notification = document.getElementById("tw-notification");
    notification.textContent = message;
    notification.classList.add("active");

    setTimeout(() => {
      notification.classList.remove("active");
    }, duration);
  }

  // Function to optimize image
  async function optimizeImage(file) {
    return new Promise((resolve, reject) => {
      // Skip if not an image or if optimization is disabled
      if (!file.type.startsWith("image/") || !config.enabled) {
        resolve(file);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        // Get original dimensions
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        // Skip if already smaller than max size
        if (
          originalWidth <= config.maxSize &&
          originalHeight <= config.maxSize
        ) {
          console.log("Image already small enough, not optimizing");
          resolve(file);
          return;
        }

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth, newHeight;

        if (originalWidth > originalHeight) {
          newWidth = Math.min(originalWidth, config.maxSize);
          newHeight = Math.round((originalHeight / originalWidth) * newWidth);
        } else {
          newHeight = Math.min(originalHeight, config.maxSize);
          newWidth = Math.round((originalWidth / originalHeight) * newHeight);
        }

        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            // Create a new File object
            const optimizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            // Calculate token usage
            const originalTiles =
              Math.ceil(originalWidth / 512) * Math.ceil(originalHeight / 512);
            const originalTokens = 85 + 170 * originalTiles;

            const optimizedTiles =
              Math.ceil(newWidth / 512) * Math.ceil(newHeight / 512);
            const optimizedTokens = 85 + 170 * optimizedTiles;

            const tokensSaved = originalTokens - optimizedTokens;

            // Update stats
            updateStats(tokensSaved);

            // Show notification
            const percentage = Math.round((tokensSaved / originalTokens) * 100);
            showNotification(
              `Image optimized! Saved ${tokensSaved} tokens (${percentage}%)`
            );

            // Log details
            console.log(
              `Original: ${originalWidth}x${originalHeight} (${file.size} bytes, ${originalTokens} tokens)`
            );
            console.log(
              `Optimized: ${newWidth}x${newHeight} (${blob.size} bytes, ${optimizedTokens} tokens)`
            );
            console.log(`Saved ${tokensSaved} tokens (${percentage}%)`);

            resolve(optimizedFile);
          },
          "image/jpeg",
          config.quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        console.error("Failed to load image for optimization");
        resolve(file); // Fall back to original on error
      };

      img.src = url;
    });
  }

  // Update stats display
  function updateStats(tokensSaved) {
    // Load current stats
    let stats = JSON.parse(
      localStorage.getItem("tokenWhaleImageStats") ||
        '{"imagesOptimized":0,"tokensSaved":0}'
    );

    // Update stats
    stats.imagesOptimized++;
    stats.tokensSaved += tokensSaved;

    // Save stats
    localStorage.setItem("tokenWhaleImageStats", JSON.stringify(stats));

    // Update display
    const statsElement = document.getElementById("tw-stats");
    statsElement.innerHTML = `
        <div>Images optimized: <strong>${stats.imagesOptimized}</strong></div>
        <div>Tokens saved: <strong>${stats.tokensSaved}</strong></div>
      `;
  }

  // Intercept XMLHttpRequest
  function interceptXHR() {
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    // Override open to detect upload requests
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      this._tokenWhaleUrl = url;
      this._tokenWhaleMethod = method;
      return originalXHROpen.apply(this, [method, url, ...args]);
    };

    // Override send to intercept file data
    XMLHttpRequest.prototype.send = function (data) {
      // Check if this is a file upload request to Gemini's upload endpoint
      if (
        this._tokenWhaleUrl &&
        this._tokenWhaleUrl.includes("push.clients6.google.com/upload") &&
        data instanceof FormData
      ) {
        console.log("Detected Gemini upload request");

        // Try to extract the file from FormData
        const newFormData = new FormData();

        // Clone the FormData and look for File objects
        for (const pair of data.entries()) {
          const key = pair[0];
          const value = pair[1];

          if (value instanceof File && value.type.startsWith("image/")) {
            console.log("Found image file in upload:", value.name);

            // Optimize the image before adding it to the new FormData
            optimizeImage(value).then((optimizedFile) => {
              // Add the optimized file to FormData
              newFormData.append(key, optimizedFile);

              // Call the original send with our modified FormData
              originalXHRSend.call(this, newFormData);
            });

            return; // Don't call original send yet, wait for optimization to complete
          } else {
            // Not an image file, just add it as-is
            newFormData.append(key, value);
          }
        }

        // If we didn't find any image files, just use the original FormData
        return originalXHRSend.call(this, data);
      }

      // Not a Gemini upload request, proceed normally
      return originalXHRSend.call(this, data);
    };
  }

  // Intercept fetch requests
  function interceptFetch() {
    const originalFetch = window.fetch;

    window.fetch = async function (resource, init) {
      // Check if this is a file upload request to Gemini
      if (
        typeof resource === "string" &&
        resource.includes("push.clients6.google.com/upload") &&
        init &&
        init.body instanceof FormData
      ) {
        console.log("Detected Gemini fetch upload request");

        const originalFormData = init.body;
        const newFormData = new FormData();

        // Process each item in the FormData
        for (const pair of originalFormData.entries()) {
          const key = pair[0];
          const value = pair[1];

          if (value instanceof File && value.type.startsWith("image/")) {
            console.log("Found image file in fetch upload:", value.name);

            try {
              // Optimize the image
              const optimizedFile = await optimizeImage(value);

              // Add the optimized file to the new FormData
              newFormData.append(key, optimizedFile);
            } catch (error) {
              console.error("Error optimizing image for fetch:", error);
              newFormData.append(key, value); // Fall back to original on error
            }
          } else {
            // Not an image file, just add it as-is
            newFormData.append(key, value);
          }
        }

        // Create new init object with our modified FormData
        const newInit = { ...init, body: newFormData };

        // Call the original fetch with the modified init
        return originalFetch.call(this, resource, newInit);
      }

      // Not a Gemini upload request, proceed normally
      return originalFetch.call(this, resource, init);
    };
  }

  // Initialize
  function initialize() {
    // Add styles
    addStyles();

    // Create UI
    // createUI();

    // Intercept network requests
    interceptXHR();
    interceptFetch();

    // Load and display stats
    const stats = JSON.parse(
      localStorage.getItem("tokenWhaleImageStats") ||
        '{"imagesOptimized":0,"tokensSaved":0}'
    );
    const statsElement = document.getElementById("tw-stats");
    statsElement.innerHTML = `
        <div>Images optimized: <strong>${stats.imagesOptimized}</strong></div>
        <div>Tokens saved: <strong>${stats.tokensSaved}</strong></div>
      `;

    console.log("Gemini Upload Interceptor initialized");
    showNotification("Image optimization active");
  }

  // Run when page is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
