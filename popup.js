<<<<<<< HEAD
// Navigation between main page and settings
const mainPage = document.getElementById("main-page");
const settingsPage = document.getElementById("settings-page");
const settingsBtn = document.getElementById("settings-btn");
const backBtn = document.getElementById("back-btn");
const dashboardBtn = document.getElementById("dashboard-btn");
const helpLink = document.getElementById("help-link");

// Fix for back button - ensure proper display property is set
settingsBtn.addEventListener("click", () => {
  settingsPage.classList.remove("page-hidden");
});

backBtn.addEventListener("click", () => {
  settingsPage.classList.add("page-hidden");
  showNotification("Settings saved successfully!");
});

// Word limit slider
const wordLimitSlider = document.getElementById("word-limit-slider");
const wordLimitValue = document.getElementById("word-limit-value");

wordLimitSlider.addEventListener("input", () => {
  wordLimitValue.textContent = wordLimitSlider.value;
});

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const darkModeToggle = document.getElementById("dark-mode-toggle");

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  darkModeToggle.checked = isDarkMode;

  if (isDarkMode) {
    themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
  } else {
    themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
  }
}

themeToggle.addEventListener("click", toggleDarkMode);
darkModeToggle.addEventListener("change", toggleDarkMode);

// Notification system
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");
const notificationClose = document.getElementById("notification-close");

function showNotification(message) {
  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

notificationClose.addEventListener("click", () => {
  notification.classList.remove("show");
});

// Tab switching
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.getAttribute("data-tab");

    // Update active tab
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Show active content
    tabContents.forEach((content) => {
      content.classList.remove("active");
      if (content.id === `${tabId}-tab`) {
        content.classList.add("active");
      }
    });
  });
});

// Animate metrics counting up
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    let value = Math.floor(progress * (end - start) + start);

    // Handle decimal values
    if (String(end).includes(".")) {
      value = (progress * (end - start) + start).toFixed(1);
    }

    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate chart bars
function animateChartBars() {
  const bars = document.querySelectorAll(".chart-bar");
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.classList.add("animate");
    }, index * 100);
  });
}

// Animate progress bar
function animateProgressBar() {
  const progressFill = document.querySelector(".progress-fill");
  setTimeout(() => {
    progressFill.style.width = "69%"; // 347/500 = ~69%
  }, 500);
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  // Animate metrics
  const metricValues = document.querySelectorAll(".metric-value");
  metricValues.forEach((metric) => {
    const value = parseFloat(metric.getAttribute("data-value"));
    animateValue(metric, 0, value, 1500);
  });

  // Animate chart bars
  animateChartBars();

  // Animate progress bar
  animateProgressBar();
});

// Demo interactions
dashboardBtn.addEventListener("click", () => {
  showNotification("Opening dashboard...");
});

helpLink.addEventListener("click", (e) => {
  e.preventDefault();
  showNotification("Help center opening soon!");
});

// App toggle notification
const appToggle = document.getElementById("app-toggle");
appToggle.addEventListener("change", () => {
  if (appToggle.checked) {
    showNotification("Token Whale activated!");
  } else {
    showNotification("Token Whale paused");
  }
});

// Add this to the existing JavaScript to make the whale interactive
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");
  const whaleContainer = footer.querySelector(".whale-container");

  if (whaleContainer) {
    footer.addEventListener("click", () => {
      // Reset splash animation
      const splash = whaleContainer.querySelector(".splash");
      const splashDrops = whaleContainer.querySelectorAll(".splash-drop");

      splash.style.animation = "none";
      splashDrops.forEach((drop) => {
        drop.style.animation = "none";
      });

      // Trigger reflow
      void splash.offsetWidth;

      // Restart animations
      splash.style.animation = "";
      splash.style.opacity = "1";

      splashDrops.forEach((drop, index) => {
        drop.style.animation = "";
        drop.style.animationName = "splashDrop";
        drop.style.animationDuration = "0.5s";
        drop.style.animationTimingFunction = "ease-out";
        drop.style.animationDelay = `${index * 0.1}s`;
      });

      // Trigger water spout
      const waterSpout = whaleContainer.querySelector(".water-spout");
      waterSpout.style.opacity = "1";

      setTimeout(() => {
        splash.style.opacity = "0";
      }, 500);
    });
  }
});
=======
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
>>>>>>> 64a70d9686d1fae6f6f2437c647e63e207580dfa
