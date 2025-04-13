// Helper class for storing and retrieving optimization statistics
class OptimizationStorage {
  constructor() {
    this.storageKey = "queryOptimizerStats";
    this.defaultStats = {
      totalQueries: 0,
      totalTokensSaved: 0,
      totalTokensOriginal: 0,
      optimizationHistory: [],
      techniqueCounts: {},
    };
  }

  // Get the current stats
  getStats() {
    try {
      const storedStats = localStorage.getItem(this.storageKey);
      if (storedStats) {
        return JSON.parse(storedStats);
      }
    } catch (error) {
      console.error("Error loading stats from storage:", error);
    }
    return { ...this.defaultStats };
  }

  // Save stats to localStorage
  saveStats(stats) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error("Error saving stats to storage:", error);
      return false;
    }
  }

  // Record a new optimization result
  recordOptimization(result) {
    if (!result || typeof result !== "object") return false;

    try {
      const stats = this.getStats();

      // Update basic metrics
      stats.totalQueries = (stats.totalQueries || 0) + 1;
      stats.totalTokensSaved =
        (stats.totalTokensSaved || 0) + (result.reduction || 0);
      stats.totalTokensOriginal =
        (stats.totalTokensOriginal || 0) + (result.originalTokens || 0);

      // Update history (keep last 100 entries)
      stats.optimizationHistory = stats.optimizationHistory || [];
      stats.optimizationHistory.push({
        timestamp: Date.now(),
        originalTokens: result.originalTokens || 0,
        optimizedTokens: result.optimizedTokens || 0,
        reduction: result.reduction || 0,
        percentReduction: result.percentReduction || 0,
      });

      // Trim history to last 100 entries
      if (stats.optimizationHistory.length > 100) {
        stats.optimizationHistory = stats.optimizationHistory.slice(-100);
      }

      // Update technique counts
      stats.techniqueCounts = stats.techniqueCounts || {};
      if (result.techniques && Array.isArray(result.techniques)) {
        result.techniques.forEach((technique) => {
          stats.techniqueCounts[technique] =
            (stats.techniqueCounts[technique] || 0) + 1;
        });
      }

      // Save updated stats
      return this.saveStats(stats);
    } catch (error) {
      console.error("Error recording optimization:", error);
      return false;
    }
  }

  // Clear all stored stats
  clearStats() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error("Error clearing stats:", error);
      return false;
    }
  }
}

// Export the class
if (typeof module !== "undefined" && module.exports) {
  module.exports = { OptimizationStorage };
} else {
  // For browser use
  window.OptimizationStorage = OptimizationStorage;
}
