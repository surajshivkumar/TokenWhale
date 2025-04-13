// Query Optimizer class for LLM Query Optimization
class QueryOptimizer {
  constructor(patterns) {
    this.patternDatabase = patterns || [];

    // Protected phrases where articles should be preserved
    this.protectedPhrases = [
      "the United States",
      "the UK",
      "the EU",
      "the UN",
      "the Beatles",
      "The New York Times",
      "the Netherlands",
      "a lot",
      "a few",
      "a bit",
      "the same",
      "the other",
      "the following",
      "the above",
      "the below",
    ];
  }

  // Count tokens using approximate counting
  countTokens(text) {
    if (!text) return 0;

    // Approximate token counting
    let tokenCount = 0;

    // Split by whitespace first
    const words = text.split(/\s+/).filter((w) => w.length > 0);

    for (const word of words) {
      // Most words are 1-2 tokens
      if (word.length <= 2) {
        tokenCount += 1;
      } else if (word.length <= 6) {
        tokenCount += 1;
      } else if (word.length <= 10) {
        tokenCount += 2;
      } else {
        // Longer words are often split into multiple tokens
        tokenCount += Math.ceil(word.length / 5);
      }

      // Punctuation often gets its own token
      tokenCount += (word.match(/[,.;:!?()[\]{}'"]/g) || []).length;
    }

    return Math.max(1, tokenCount);
  }

  // More intelligent article removal that preserves proper names and fixed phrases
  contextuallyRemoveArticles(text) {
    let result = text;

    // Replace protected phrases with placeholders
    const placeholders = {};
    let placeholderIndex = 0;

    for (const phrase of this.protectedPhrases) {
      const regex = new RegExp(
        phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
        "gi"
      );
      result = result.replace(regex, (match) => {
        const placeholder = `__PROTECTED_${placeholderIndex++}__`;
        placeholders[placeholder] = match;
        return placeholder;
      });
    }

    // Remove articles except in protected phrases
    result = result.replace(/\b(the|a|an) \b(?!__PROTECTED)/gi, "");

    // Restore protected phrases
    for (const [placeholder, original] of Object.entries(placeholders)) {
      result = result.replace(new RegExp(placeholder, "g"), original);
    }

    return result;
  }

  // Optimize query using pattern-based approach
  optimize(query) {
    if (!query || typeof query !== "string") {
      return {
        original: query || "",
        optimized: "",
        originalTokens: 0,
        optimizedTokens: 0,
        techniques: [],
      };
    }

    const original = query.trim();
    const originalTokens = this.countTokens(original);
    let optimized = original;
    const appliedTechniques = [];

    // Apply pattern replacements
    for (const { category, patterns, replacement, contextual } of this
      .patternDatabase) {
      if (contextual) continue; // Skip contextual patterns for now

      for (const pattern of patterns) {
        const before = optimized;
        optimized = optimized.replace(pattern, replacement);

        if (before !== optimized) {
          appliedTechniques.push(category);
        }
      }
    }

    // Apply contextual article removal after other optimizations
    for (const { category, patterns, replacement, contextual } of this
      .patternDatabase) {
      if (contextual) {
        const before = optimized;
        optimized = this.contextuallyRemoveArticles(optimized);

        if (before !== optimized) {
          appliedTechniques.push(category);
        }
      }
    }

    // Clean up multiple spaces and trim
    optimized = optimized.replace(/\s+/g, " ").trim();

    // For longer optimized text, apply additional restructuring
    if (optimized.length > 50) {
      // Extract key phrases based on common patterns
      const keyPhrases = [];

      // Common patterns that indicate important parts of a query
      const importantPatterns = [
        /\b(how|what|why|when|where|who|which)\b/i, // Question words
        /\b(explain|describe|compare|analyze|define)\b/i, // Command verbs
        /\b(difference|between|relationship|impact|effect|cause)\b/i, // Relationship words
        /\b(example|instance|case|scenario)\b/i, // Example indicators
      ];

      // Find sentences or phrases containing important patterns
      const sentences = optimized
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      for (const sentence of sentences) {
        for (const pattern of importantPatterns) {
          if (pattern.test(sentence)) {
            keyPhrases.push(sentence.trim());
            break;
          }
        }
      }

      // If we found key phrases, use them instead
      if (keyPhrases.length > 0) {
        optimized = keyPhrases.join(" ").trim();
        appliedTechniques.push("Key phrase extraction");
      }
    }

    const optimizedTokens = this.countTokens(optimized);

    return {
      original,
      optimized,
      techniques: [...new Set(appliedTechniques)], // Remove duplicates
      originalTokens,
      optimizedTokens,
      reduction: originalTokens - optimizedTokens,
      percentReduction: Math.round(
        ((originalTokens - optimizedTokens) / originalTokens) * 100
      ),
    };
  }
}

// Export the class
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QueryOptimizer };
} else {
  // For browser use
  window.QueryOptimizer = QueryOptimizer;
}
