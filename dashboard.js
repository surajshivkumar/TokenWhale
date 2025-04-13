// Constants for calculations
const COST_PER_1K_INPUT_TOKENS = 0.00025; // Example cost per 1K tokens (varies by model)
const ENERGY_PER_TOKEN = 0.0000003; // kWh per token (approximate)
const CO2_PER_KWH = 400; // grams of CO2 per kWh (average)
const KWH_PER_PHONE_CHARGE = 0.0152; // kWh per smartphone charge

// Load saved statistics
function loadStats() {
  const stats = JSON.parse(localStorage.getItem("queryOptimizerStats") || "{}");
  return {
    totalQueries: stats.totalQueries || 0,
    totalTokensSaved: stats.totalTokensSaved || 0,
    optimizationHistory: stats.optimizationHistory || [],
    techniqueCounts: stats.techniqueCounts || {},
    ...stats,
  };
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update the dashboard UI with the stats
function updateDashboard(stats) {
  // Update basic metrics
  document.getElementById("total-queries").textContent = formatNumber(
    stats.totalQueries
  );
  document.getElementById("total-tokens").textContent = formatNumber(
    stats.totalTokensSaved
  );

  // Calculate and update average reduction
  const avgReduction =
    stats.totalQueries > 0
      ? Math.round(
          (stats.totalTokensSaved / (stats.totalTokensOriginal || 1)) * 100
        )
      : 0;
  document.getElementById("avg-reduction").textContent = avgReduction + "%";

  // Calculate and update cost savings
  const costSavings =
    (stats.totalTokensSaved / 1000) * COST_PER_1K_INPUT_TOKENS;
  document.getElementById("cost-savings").textContent =
    "$" + costSavings.toFixed(2);

  // Calculate and update environmental impact
  const energySaved = stats.totalTokensSaved * ENERGY_PER_TOKEN;
  document.getElementById("energy-saved").textContent = energySaved.toFixed(4);

  const carbonReduced = energySaved * CO2_PER_KWH;
  document.getElementById("carbon-reduced").textContent = formatNumber(
    Math.round(carbonReduced)
  );

  const phoneCharges = Math.round(energySaved / KWH_PER_PHONE_CHARGE);
  document.getElementById(
    "energy-equivalent"
  ).textContent = `charging ${formatNumber(phoneCharges)} smartphone${
    phoneCharges !== 1 ? "s" : ""
  }`;

  // Update techniques list
  updateTechniquesList(stats.techniqueCounts);

  // Update chart
  updateChart(stats.optimizationHistory);
}

// Update the techniques list
function updateTechniquesList(techniqueCounts) {
  const techniquesList = document.getElementById("techniques-list");
  techniquesList.innerHTML = "";

  // Sort techniques by count
  const sortedTechniques = Object.entries(techniqueCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 techniques

  sortedTechniques.forEach(([technique, count]) => {
    const item = document.createElement("div");
    item.className = "technique-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "technique-name";
    nameSpan.textContent = technique;

    const countSpan = document.createElement("span");
    countSpan.className = "technique-count";
    countSpan.textContent = count;

    item.appendChild(nameSpan);
    item.appendChild(countSpan);
    techniquesList.appendChild(item);
  });

  // If no techniques yet
  if (sortedTechniques.length === 0) {
    const noData = document.createElement("p");
    noData.textContent =
      "No optimization techniques data yet. Start optimizing queries!";
    techniquesList.appendChild(noData);
  }
}

// Update the optimization history chart
function updateChart(history) {
  // Use only the last 10 entries for the chart
  const recentHistory = history.slice(-10);

  // Prepare data for the chart
  const labels = recentHistory.map((_, index) => `Query ${index + 1}`);
  const originalTokens = recentHistory.map((entry) => entry.originalTokens);
  const optimizedTokens = recentHistory.map((entry) => entry.optimizedTokens);

  // Create or update the chart
  const ctx = document.getElementById("optimization-chart").getContext("2d");

  // Check if chart already exists
  if (window.optimizationChart) {
    window.optimizationChart.data.labels = labels;
    window.optimizationChart.data.datasets[0].data = originalTokens;
    window.optimizationChart.data.datasets[1].data = optimizedTokens;
    window.optimizationChart.update();
  } else {
    // Create new chart
    window.optimizationChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Original Tokens",
            data: originalTokens,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Optimized Tokens",
            data: optimizedTokens,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Token Count",
            },
          },
          x: {
            title: {
              display: true,
              text: "Recent Queries",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Token Reduction History",
          },
          tooltip: {
            callbacks: {
              afterBody: function (context) {
                const index = context[0].dataIndex;
                const original = originalTokens[index];
                const optimized = optimizedTokens[index];
                const savings = original - optimized;
                const percent = Math.round((savings / original) * 100);
                return `Tokens Saved: ${savings} (${percent}%)`;
              },
            },
          },
        },
      },
    });
  }

  // If no history yet
  if (recentHistory.length === 0) {
    const noDataText = new Image();
    noDataText.src =
      "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    noDataText.onload = function () {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "16px Arial";
      ctx.fillStyle = "#666";
      ctx.fillText(
        "No optimization history yet. Start optimizing queries!",
        ctx.canvas.width / 2,
        ctx.canvas.height / 2
      );
      ctx.restore();
    };
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", function () {
  const stats = loadStats();
  updateDashboard(stats);
});
