// Enhanced Pattern database for query optimization
const queryPatterns = [
  //=============================================================================
  // FILLER REMOVAL PATTERNS
  //=============================================================================
  // Introductory phrases and politeness markers
  {
    category: "Filler removal",
    subcategory: "Introductory phrases",
    patterns: [/^(can you|could you|would you|will you|please|kindly)\s+/i],
    replacement: "",
    priority: 10,
    description: "Removes introductory politeness phrases",
  },
  {
    category: "Filler removal",
    subcategory: "Trailing politeness",
    patterns: [
      /(please|if you (don't mind|can|could)|when you (have a chance|can|get the chance))\s*\.?\s*$/i,
    ],
    replacement: "",
    priority: 10,
    description: "Removes trailing politeness phrases",
  },
  {
    category: "Filler removal",
    subcategory: "Desire statements",
    patterns: [
      /^(i want to|i would like to|i'd like to|i wish to|i need to|i'm looking to|i am looking to)\s+/i,
    ],
    replacement: "",
    priority: 10,
    description: "Removes phrases expressing desire or intent",
  },
  {
    category: "Filler removal",
    subcategory: "Curiosity statements",
    patterns: [
      /^(i'm asking|i am asking|i'm wondering|i was wondering|i am wondering|i would like to know|just wondering|i've been wondering|i have been wondering)\s+/i,
    ],
    replacement: "",
    priority: 10,
    description: "Removes phrases expressing curiosity or inquiry",
  },
  {
    category: "Filler removal",
    subcategory: "Hedging phrases",
    patterns: [
      /\b(sort of|kind of|maybe|perhaps|possibly|i think|i believe|i guess|i suppose|basically|essentially|fundamentally)\b\s*/i,
    ],
    replacement: "",
    priority: 5,
    description: "Removes hedging or uncertainty phrases",
    contextual: true,
  },
  {
    category: "Filler removal",
    subcategory: "Time markers",
    patterns: [
      /\b(at this point|at this time|for now|currently|presently|right now|at the moment)\b\s*/i,
    ],
    replacement: "",
    priority: 5,
    description: "Removes unnecessary time markers",
    contextual: true,
  },
  {
    category: "Filler removal",
    subcategory: "Emphasis markers",
    patterns: [
      /\b(really|very|extremely|absolutely|definitely|certainly|surely|truly|honestly|literally|actually|basically|simply|just)\b\s*/i,
    ],
    replacement: "",
    priority: 4,
    description: "Removes unnecessary emphasis words",
    contextual: true,
  },
  {
    category: "Filler removal",
    subcategory: "Self-references",
    patterns: [
      /^(for me|to me|in my opinion|from my perspective|as far as i'm concerned|as far as i am concerned|i think that|i believe that)\s+/i,
    ],
    replacement: "",
    priority: 7,
    description: "Removes self-referential phrases",
  },
  {
    category: "Filler removal",
    subcategory: "Repetition markers",
    patterns: [
      /\b(again|once more|as i (said|mentioned)( before| earlier| previously)?|like i (said|mentioned))\b\s*/i,
    ],
    replacement: "",
    priority: 6,
    description: "Removes phrases indicating repetition",
    contextual: true,
  },

  //=============================================================================
  // QUERY RESTRUCTURING PATTERNS
  //=============================================================================
  {
    category: "Query restructuring",
    subcategory: "Knowledge probes",
    patterns: [
      /^(do you know|do you have any idea|are you familiar with|can you tell me|would you tell me|do you happen to know)\s+/i,
    ],
    replacement: "",
    priority: 9,
    description: "Removes phrases querying knowledge",
  },
  {
    category: "Query restructuring",
    subcategory: "Question framing",
    patterns: [
      /^(i have a question about|i have a question regarding|i'm asking about|i am curious about|my question is|here's my question|here is my question|this is my question)\s+/i,
    ],
    replacement: "",
    priority: 9,
    description: "Removes phrases framing questions",
  },
  {
    category: "Query restructuring",
    subcategory: "Subject introduction",
    patterns: [
      /^(on the (topic|subject) of|regarding|concerning|with respect to|with regards to|in terms of|speaking of|talking about)\s+/i,
    ],
    replacement: "",
    priority: 8,
    description: "Removes phrases introducing a subject",
  },
  {
    category: "Query restructuring",
    subcategory: "Auxiliary verbs",
    patterns: [
      /\b(is|are|was|were|has|have|had|does|do|did|should|would|could|might|may|can|will) (it|there|this|that|they|these|those)\b\s*/i,
    ],
    replacement: "",
    priority: 6,
    description: "Simplifies questions by removing auxiliary verbs",
    contextual: true,
  },
  {
    category: "Query restructuring",
    subcategory: "Hypotheticals",
    patterns: [
      /^(what if|if|let's say|imagine|suppose|hypothetically|in a scenario where)\s+/i,
    ],
    replacement: "",
    priority: 7,
    description: "Handles hypothetical scenario introductions",
    contextual: true,
  },

  //=============================================================================
  // QUESTION TO COMMAND PATTERNS
  //=============================================================================
  {
    category: "Question to command",
    subcategory: "Definition queries",
    patterns: [
      /^what is the (definition|meaning) of\s+/i,
      /^what does (.*) (mean|stand for)\??$/i,
      /^define\s+/i,
      /^(please |could you |would you )?(explain|clarify) (what|the meaning of|the term)\s+/i,
    ],
    replacement: "define ",
    priority: 9,
    description: "Converts definition questions to 'define' commands",
  },
  {
    category: "Question to command",
    subcategory: "Explanation queries",
    patterns: [
      /^(can|could|would|will|please) you explain\s+/i,
      /^how (does|do|would|will)\s+/i,
      /^why (does|do|is|are|has|have|did)\s+/i,
      /^explain\s+/i,
      /^what is the (reason|cause|explanation) (for|of|behind)\s+/i,
    ],
    replacement: "explain ",
    priority: 9,
    description: "Converts explanation questions to 'explain' commands",
  },
  {
    category: "Question to command",
    subcategory: "Process queries",
    patterns: [
      /^how (do|can|would|should) i\s+/i,
      /^what('s| is) the (best|easiest|fastest|most efficient) way to\s+/i,
      /^what('s| is) a (good|great|better) way to\s+/i,
      /^how (do|can|would|should) you\s+/i,
    ],
    replacement: "",
    priority: 9,
    description: "Simplifies process questions",
  },
  {
    category: "Question to command",
    subcategory: "List queries",
    patterns: [
      /^what are (some|the|a few|various|different|popular|common|effective|useful)\s+/i,
      /^(list|name|give me|provide|tell me|show me) (some|the|a few|various|different|popular|common)\s+/i,
      /^what (is|are) the (main|primary|key|major|important|essential|critical|significant)\s+/i,
    ],
    replacement: "list ",
    priority: 9,
    description: "Converts list questions to 'list' commands",
  },
  {
    category: "Question to command",
    subcategory: "Information queries",
    patterns: [
      /^(tell me|give me information|provide (me with )?information|give me details) (about|on|regarding)\s+/i,
      /^(what can you tell me|what (do you|can you) (say|know)) about\s+/i,
      /^i'd like to (know|learn|understand) (more )?(about|how)\s+/i,
    ],
    replacement: "",
    priority: 9,
    description: "Simplifies information-seeking questions",
  },
  {
    category: "Question to command",
    subcategory: "General what-is queries",
    patterns: [/^what (is|are)\s+/i, /^(what does|what do)\s+/i],
    replacement: "",
    priority: 8,
    description: "Simplifies general 'what is' questions",
  },
  {
    category: "Question to command",
    subcategory: "Location queries",
    patterns: [
      /^where (is|are|can i find|can one find|can you find|do you find)\s+/i,
      /^how (do|can|would) i (find|locate|get to|reach)\s+/i,
      /^where (is|are) the (best|nearest|closest|most convenient)\s+/i,
    ],
    replacement: "find ",
    priority: 9,
    description: "Converts location questions to 'find' commands",
  },
  {
    category: "Question to command",
    subcategory: "Comparison queries",
    patterns: [
      /^(what is|what are) the (differences?|similarities?) between\s+/i,
      /^how (does|do) (.*) (compare to|compare with|differ from)\s+/i,
      /^(compare|contrast)\s+/i,
    ],
    replacement: "compare ",
    priority: 9,
    description: "Converts comparison questions to 'compare' commands",
  },
  {
    category: "Question to command",
    subcategory: "Example queries",
    patterns: [
      /^(can you (give|provide)|could you (give|provide)|what are some) examples of\s+/i,
      /^(show|give|provide) me (some|a few|an) examples? of\s+/i,
      /^what (is|are) (a|an|some) examples? of\s+/i,
    ],
    replacement: "examples ",
    priority: 9,
    description: "Converts example-seeking questions to 'examples' commands",
  },
  {
    category: "Question to command",
    subcategory: "Time queries",
    patterns: [
      /^when (did|does|will|should|can|is|are|was|were)\s+/i,
      /^what time (does|will|should|is|are)\s+/i,
      /^how long (does|will|should|has|have|did)\s+/i,
    ],
    replacement: "when ",
    priority: 8,
    description: "Simplifies time-related questions",
  },
  {
    category: "Question to command",
    subcategory: "Recommendation queries",
    patterns: [
      /^what (is|are) the best\s+/i,
      /^(can|could) you recommend\s+/i,
      /^what (should|would you) recommend\s+/i,
      /^what (do|would) you (suggest|advise|recommend)\s+/i,
    ],
    replacement: "recommend ",
    priority: 9,
    description: "Converts recommendation questions to 'recommend' commands",
  },

  //=============================================================================
  // WORD OPTIMIZATION PATTERNS
  //=============================================================================
  {
    category: "Article removal",
    patterns: [/\b(the|a|an) \b/gi],
    replacement: "",
    priority: 3,
    description: "Removes articles when appropriate",
    contextual: true,
  },
  {
    category: "Preposition optimization",
    patterns: [
      /\b(in terms of|with regard to|with respect to|in the case of|when it comes to)\b/gi,
    ],
    replacement: "about ",
    priority: 6,
    description: "Simplifies verbose prepositional phrases",
    contextual: true,
  },
  {
    category: "Conjunction optimization",
    patterns: [
      /\b(due to the fact that|owing to the fact that|in light of the fact that)\b/gi,
      /\b(on the grounds that|considering that|given the fact that)\b/gi,
    ],
    replacement: "because ",
    priority: 6,
    description: "Simplifies verbose conjunctional phrases",
    contextual: true,
  },
  {
    category: "Adverb optimization",
    patterns: [/\b(at this point in time|at the present time)\b/gi],
    replacement: "now ",
    priority: 6,
    description: "Simplifies verbose adverbial phrases",
    contextual: true,
  },
  {
    category: "Verbose phrase optimization",
    patterns: [
      /\b(make a decision)\b/gi,
      /\b(come to a conclusion)\b/gi,
      /\b(at this moment in time)\b/gi,
      /\b(for the purpose of)\b/gi,
      /\b(in the event that)\b/gi,
      /\b(in the process of)\b/gi,
    ],
    replacements: {
      "make a decision": "decide",
      "come to a conclusion": "conclude",
      "at this moment in time": "now",
      "for the purpose of": "for",
      "in the event that": "if",
      "in the process of": "while",
    },
    priority: 7,
    description: "Replaces verbose phrases with concise alternatives",
    contextual: true,
  },

  //=============================================================================
  // PUNCTUATION AND FORMAT OPTIMIZATION
  //=============================================================================
  {
    category: "Punctuation optimization",
    subcategory: "Question marks",
    patterns: [/\?\s*$/],
    replacement: "",
    priority: 2,
    description: "Removes trailing question marks",
  },
  {
    category: "Punctuation optimization",
    subcategory: "Multiple punctuation",
    patterns: [/([.!?]){2,}/g],
    replacement: "$1",
    priority: 2,
    description: "Removes multiple consecutive punctuation marks",
  },
  {
    category: "Punctuation optimization",
    subcategory: "Trailing periods",
    patterns: [/\.\s*$/],
    replacement: "",
    priority: 2,
    description: "Removes trailing periods",
  },
  {
    category: "Format optimization",
    subcategory: "Multiple spaces",
    patterns: [/\s{2,}/g],
    replacement: " ",
    priority: 1,
    description: "Replaces multiple spaces with a single space",
  },
  {
    category: "Format optimization",
    subcategory: "Leading/trailing whitespace",
    patterns: [/^\s+|\s+$/g],
    replacement: "",
    priority: 1,
    description: "Removes leading and trailing whitespace",
  },

  //=============================================================================
  // SPECIALIZED DOMAIN PATTERNS
  //=============================================================================
  {
    category: "Domain specific",
    subcategory: "Programming queries",
    patterns: [
      /^how (do|can|would) i (create|implement|code|program|develop|build|write code for|make)\s+/i,
      /^(write|generate|create) (a|an)? (function|code|program|script|algorithm) (for|to|that)\s+/i,
      /^(help|assist) me (with|in) (coding|programming|developing|implementing|debugging)\s+/i,
    ],
    replacement: "code ",
    priority: 8,
    description: "Optimizes programming-related queries",
    domain: "programming",
  },
  {
    category: "Domain specific",
    subcategory: "Medical queries",
    patterns: [
      /^(what are|what is) the (symptoms|causes|treatments|signs|diagnosis|prognosis) (of|for)\s+/i,
      /^(how (do|can|would) (i|you|one|we|they) (treat|cure|manage|handle|deal with))\s+/i,
      /^(is|are) (.*) (symptom|sign|indication|cause|treatment) of\s+/i,
    ],
    replacement: "medical ",
    priority: 8,
    description: "Optimizes medical-related queries",
    domain: "medical",
  },
  {
    category: "Domain specific",
    subcategory: "Legal queries",
    patterns: [
      /^(what are|what is) the (law|legal requirements|legal implications|legal consequences|legal status) (of|for|regarding|concerning)\s+/i,
      /^(is it legal to|is it against the law to|can i legally|what are my legal rights)\s+/i,
      /^(how (do|does) the law (apply|relate) to)\s+/i,
    ],
    replacement: "legal ",
    priority: 8,
    description: "Optimizes legal-related queries",
    domain: "legal",
  },
  {
    category: "Domain specific",
    subcategory: "Academic queries",
    patterns: [
      /^(how (do|would|should) (i|you|one) (write|create|develop|craft|compose)) (a|an|the) (essay|paper|thesis|dissertation|research paper|article|report) (on|about)\s+/i,
      /^(what is|what are) the (main|key|primary|principal|major|important) (theories|concepts|ideas|arguments|debates|topics|themes) (in|of|related to)\s+/i,
      /^(how (do|would|can) i (cite|reference|analyze|critique|evaluate|review))\s+/i,
    ],
    replacement: "academic ",
    priority: 8,
    description: "Optimizes academic-related queries",
    domain: "academic",
  },
  {
    category: "Domain specific",
    subcategory: "Business queries",
    patterns: [
      /^(how (do|can|would) i (start|begin|launch|create|found|establish)) (a|an|my own) (business|company|startup|enterprise|venture) (for|in|related to|focused on)\s+/i,
      /^(what are|what is) the (best|most effective|successful|profitable) (business|marketing|sales|management|leadership) (strategies|tactics|approaches|methods|techniques) (for|to)\s+/i,
      /^(how (do|can|would) i (increase|improve|boost|enhance|maximize|optimize)) (sales|profits|revenue|growth|efficiency|productivity|performance) (for|in|of)\s+/i,
    ],
    replacement: "business ",
    priority: 8,
    description: "Optimizes business-related queries",
    domain: "business",
  },

  //=============================================================================
  // INTENT CLASSIFICATION PATTERNS
  //=============================================================================
  {
    category: "Intent classification",
    subcategory: "How-to intent",
    patterns: [
      /^how (do|to|can|should|would) (i|you|we|one)\s+/i,
      /^what('s| is) the (process|procedure|method|approach|technique|way) (to|for|of)\s+/i,
      /^(steps|instructions|guide|tutorial) (for|on|to)\s+/i,
    ],
    replacement: "howto ",
    priority: 9,
    description: "Identifies how-to intent queries",
    intent: "instructional",
  },
  {
    category: "Intent classification",
    subcategory: "Definitional intent",
    patterns: [
      /^what (is|are|does) (a|an|the)\s+/i,
      /^definition of\s+/i,
      /^meaning of\s+/i,
      /^define\s+/i,
    ],
    replacement: "define ",
    priority: 9,
    description: "Identifies definitional intent queries",
    intent: "informational",
  },
  {
    category: "Intent classification",
    subcategory: "Comparative intent",
    patterns: [
      /^(compare|contrast|difference between|similarity between)\s+/i,
      /^what('s| is) the difference between\s+/i,
      /^how (does|do) (.*) (compare|differ|stack up|measure up) (to|with|against)\s+/i,
      /^which is (better|worse|more|less|faster|slower|easier|harder|cheaper|more expensive)\s+/i,
    ],
    replacement: "compare ",
    priority: 9,
    description: "Identifies comparative intent queries",
    intent: "comparative",
  },
  {
    category: "Intent classification",
    subcategory: "Recommendation intent",
    patterns: [
      /^(best|top|recommended|suggested|preferred|ideal|excellent|outstanding|superior)\s+/i,
      /^what (is|are) the best\s+/i,
      /^(recommend|suggest)\s+/i,
      /^which (.*) (should|would you) (recommend|suggest)\s+/i,
    ],
    replacement: "recommend ",
    priority: 9,
    description: "Identifies recommendation intent queries",
    intent: "recommendation",
  },
  {
    category: "Intent classification",
    subcategory: "Factual intent",
    patterns: [
      /^(who|what|when|where|why|how many|how much|how long|how far|how old)\s+/i,
      /^(is|are|was|were|do|does|did|has|have|had|can|could|will|would|should)\s+/i,
      /^(fact|facts|information|data|statistics|figure|figures|number|numbers) (about|on|regarding)\s+/i,
    ],
    replacement: "",
    priority: 7,
    description: "Identifies factual intent queries",
    intent: "factual",
  },
  {
    category: "Intent classification",
    subcategory: "Problem-solving intent",
    patterns: [
      /^(fix|solve|repair|troubleshoot|debug|resolve|address)\s+/i,
      /^how (do|to|can|should) (i|you|we|one) (fix|solve|repair|troubleshoot|debug|resolve|address)\s+/i,
      /^(problem|issue|error|bug|fault|defect|glitch) with\s+/i,
      /^why (is|are|does|do) (.*) (not working|failing|broken|malfunctioning|crashing)\s+/i,
    ],
    replacement: "fix ",
    priority: 9,
    description: "Identifies problem-solving intent queries",
    intent: "troubleshooting",
  },
  {
    category: "Intent classification",
    subcategory: "Causation intent",
    patterns: [
      /^why (is|are|does|do|did|was|were|has|have|had)\s+/i,
      /^what (is|are) the (cause|reason|explanation) (for|of|behind)\s+/i,
      /^what causes\s+/i,
      /^how (comes|come)\s+/i,
    ],
    replacement: "why ",
    priority: 8,
    description: "Identifies causation intent queries",
    intent: "causation",
  },

  //=============================================================================
  // ADVANCED CONTEXTUAL PATTERNS
  //=============================================================================
  {
    category: "Contextual optimization",
    subcategory: "Time sensitivity",
    patterns: [
      /\b(today|right now|currently|presently|nowadays|at present|at the moment|in current times)\b/i,
    ],
    replacement: "current ",
    priority: 5,
    description: "Optimizes time-sensitive contextual phrases",
    contextual: true,
  },
  {
    category: "Contextual optimization",
    subcategory: "Location sensitivity",
    patterns: [
      /\b(near me|in my area|around here|locally|in this region|in my neighborhood|in my vicinity|close by|nearby)\b/i,
    ],
    replacement: "local ",
    priority: 5,
    description: "Optimizes location-sensitive contextual phrases",
    contextual: true,
  },
  {
    category: "Contextual optimization",
    subcategory: "Demographic sensitivity",
    patterns: [
      /\b(for (a|an) (beginner|expert|professional|amateur|novice|intermediate|advanced user|child|teenager|adult|senior|elderly person))\b/i,
    ],
    contextual: true,
    priority: 6,
    description: "Preserves important demographic context",
  },
  {
    category: "Contextual optimization",
    subcategory: "Industry sensitivity",
    patterns: [
      /\b(in the (technology|healthcare|finance|education|retail|manufacturing|construction|hospitality|entertainment|automotive|aerospace|agriculture|energy|telecommunications|transportation) (industry|sector|field))\b/i,
    ],
    contextual: true,
    priority: 6,
    description: "Preserves important industry context",
  },
  {
    category: "Pronoun removal",
    patterns: [
      /\b(i|me|my|you|your|he|she|it|we|us|they|them|his|her|its|our|their)\b/gi,
    ],
    replacement: "",
    priority: 7,
    description: "Removes pronouns unless contextually important",
    contextual: true, // Important:  Only remove if contextually safe
  },
  //=============================================================================
  // CONTEXTUAL STOP WORD REMOVAL
  //=============================================================================
  {
    category: "Stop word removal",
    patterns: [/\b(is|are|was|were|be|being|been|a|an|the)\b/gi],
    replacement: "",
    priority: 6,
    description: "Removes common stop words contextually",
    contextual: true, // Crucial:  Only remove if contextually safe
  },
  //=============================================================================
  // SYNONYM/PARAPHRASE SUBSTITUTION  (Example - needs a larger data set)
  //=============================================================================
  {
    category: "Phrase substitution",
    patterns: [/\b(give me a list of the advantages and disadvantages)\b/gi],
    replacement: "list pros cons",
    priority: 8,
    description: "Replaces verbose phrase with concise alternative",
    contextual: true, // Could be context-dependent
  },
  //=============================================================================
  // ACRONYM/ABBREVIATION HANDLING (Examples - needs a larger data set)
  //=============================================================================
  {
    category: "Acronym expansion",
    patterns: [/\bGDP\b/gi],
    replacement: "gross domestic product",
    priority: 7,
    description: "Expands common acronyms",
    contextual: false, // Generally safe to expand
  },
  {
    category: "Acronym compression",
    patterns: [/\bfrequently asked questions\b/gi],
    replacement: "FAQs",
    priority: 7,
    description: "Compresses phrase to common acronym",
    contextual: true, // Only compress if the acronym is well-known in context
  },
  //=============================================================================
  // INTENT-BASED OPTIMIZATION (Example - requires intent detection logic)
  //=============================================================================
  {
    category: "Intent-based optimization",
    patterns: [/^Send an email to\s+/i], //Simplified pattern for example
    replacement: "email ",
    priority: 9,
    description: "Optimizes task-completion intent (email)",
    contextual: true, //Very context-dependent - needs intent detection
    intent: "task_completion", // Example intent tag - needs intent detection logic.
  },
  //=============================================================================
  // ELLIPSIS HANDLING (Example - requires more sophisticated NLP)
  //=============================================================================
  {
    category: "Ellipsis handling",
    patterns: [/^Best Italian restaurant near me\??$/i],
    replacement: "find best Italian restaurant near me",
    priority: 8,
    description: "Completes elliptical query",
    contextual: true, // Very context-dependent - requires good NLP
  },
  //=============================================================================
  // NUMBER AND UNIT HANDLING
  //=============================================================================
  {
    category: "Unit standardization",
    patterns: [/(\d+)\s*kilograms\b/gi],
    replacement: "$1kg",
    priority: 7,
    description: "Standardizes kilogram representation",
    contextual: false, //Generally safe
  },
  //=============================================================================
  // DATE AND TIME NORMALIZATION (Example - requires date parsing)
  //=============================================================================
  {
    category: "Date normalization",
    patterns: [/July 4th, (\d{4})/gi],
    replacement: "$1-07-04",
    priority: 7,
    description: "Normalizes date format to ISO",
    contextual: false, //Generally safe
  },
];

// Utility functions for pattern application
const queryOptimizer = {
  /**
   * Applies all patterns to a query string
   * @param {string} query - The original query string
   * @param {Object} options - Options for optimization
   * @param {boolean} options.applyContextual - Whether to apply contextual patterns
   * @param {Array<string>} options.domains - Specific domains to optimize for
   * @param {Array<string>} options.intents - Specific intents to optimize for
   * @param {number} options.minPriority - Minimum priority level to apply
   * @returns {string} - The optimized query
   */
  optimizeQuery: function (query, options = {}) {
    const {
      applyContextual = false,
      domains = [],
      intents = [],
      minPriority = 0,
    } = options;

    let optimizedQuery = query.trim();

    // Sort patterns by priority (highest first)
    const sortedPatterns = [...queryPatterns].sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );

    for (const pattern of sortedPatterns) {
      // Skip patterns below minimum priority
      if ((pattern.priority || 0) < minPriority) continue;

      // Skip contextual patterns if not applying contextual
      if (pattern.contextual && !applyContextual) continue;

      // Skip domain-specific patterns if domain doesn't match
      if (pattern.domain && domains.length && !domains.includes(pattern.domain))
        continue;

      // Skip intent-specific patterns if intent doesn't match
      if (pattern.intent && intents.length && !intents.includes(pattern.intent))
        continue;

      // Apply pattern
      if (Array.isArray(pattern.patterns)) {
        for (const regexPattern of pattern.patterns) {
          if (
            pattern.replacements &&
            typeof pattern.replacements === "object"
          ) {
            // Handle multiple replacement mapping
            const match = optimizedQuery.match(regexPattern);
            if (match && match[0]) {
              const matchedText = match[0].trim();
              if (pattern.replacements[matchedText]) {
                optimizedQuery = optimizedQuery.replace(
                  regexPattern,
                  pattern.replacements[matchedText]
                );
              }
            }
          } else {
            // Standard replacement
            optimizedQuery = optimizedQuery.replace(
              regexPattern,
              pattern.replacement || ""
            );
          }
        }
      }
    }

    // Clean up any double spaces created during optimization
    optimizedQuery = optimizedQuery.replace(/\s{2,}/g, " ").trim();

    return optimizedQuery;
  },

  /**
   * Detects the likely domain of a query
   * @param {string} query - The query string
   * @returns {Array<string>} - Detected domains
   */
  detectDomains: function (query) {
    const domains = [];
    const domainKeywords = {
      programming: [
        /\b(code|program|function|algorithm|api|syntax|compiler|debug|variable|class|object|method|framework|library|developer|software|app|application)\b/i,
      ],
      medical: [
        /\b(health|disease|symptom|treatment|doctor|hospital|medical|medicine|condition|diagnosis|patient|therapy|cure|surgery|physician)\b/i,
      ],
      legal: [
        /\b(law|legal|attorney|lawyer|court|judge|lawsuit|contract|rights|litigation|plaintiff|defendant|statute|regulation|compliance)\b/i,
      ],
      academic: [
        /\b(research|study|paper|thesis|dissertation|academic|professor|student|university|college|school|education|theory|literature|scholar)\b/i,
      ],
      business: [
        /\b(business|company|startup|entrepreneur|profit|revenue|market|customer|product|service|strategy|management|sales|marketing|investment)\b/i,
      ],
    };

    for (const [domain, patterns] of Object.entries(domainKeywords)) {
      for (const pattern of patterns) {
        if (pattern.test(query)) {
          domains.push(domain);
          break;
        }
      }
    }

    return domains;
  },

  /**
   * Detects the likely intent of a query
   * @param {string} query - The query string
   * @returns {Array<string>} - Detected intents
   */
  detectIntents: function (query) {
    const intents = [];
    const intentPatterns = {
      instructional: [
        /^how (do|to|can|should|would) (i|you|we|one)\s+/i,
        /\b(steps|guide|tutorial|instructions|process|procedure)\b/i,
      ],
      informational: [
        /^what (is|are|does) (a|an|the)\s+/i,
        /\b(meaning|definition|explain|describe)\b/i,
      ],
      comparative: [
        /\b(compare|contrast|difference|similarity|versus|vs\.?)\b/i,
        /\b(better|worse|faster|slower|cheaper|more expensive)\b/i,
      ],
      recommendation: [
        /\b(best|top|recommended|suggest|recommend|ideal|preferred)\b/i,
        /\b(should (i|we) (use|buy|get|choose))\b/i,
      ],
      factual: [
        /^(who|what|when|where|why|how many|how much|how often|how far)\b/i,
        /\b(fact|data|statistic|figure|number|date|time|location|person|event)\b/i,
      ],
      troubleshooting: [
        /\b(fix|solve|repair|troubleshoot|debug|resolve|issue|problem|error|bug|not working|broken)\b/i,
        /\b(why (isn't|is not|won't|will not|doesn't|does not|can't|cannot))\b/i,
      ],
      causation: [
        /^why\b/i,
        /\b(cause|reason|explanation|factor|influence|impact|effect|result|outcome)\b/i,
      ],
      opinion: [
        /\b(think|believe|opinion|view|perspective|thoughts|stance|position|take)\b/i,
        /\b(do you (think|believe|feel|consider))\b/i,
      ],
    };

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(query)) {
          intents.push(intent);
          break;
        }
      }
    }

    return intents;
  },

  /**
   * Analyzes and suggests improvements for a query
   * @param {string} query - The original query string
   * @returns {Object} - Analysis results including suggested optimizations
   */
  analyzeQuery: function (query) {
    const domains = this.detectDomains(query);
    const intents = this.detectIntents(query);

    // Calculate overall verbosity score (0-100)
    const wordCount = query.split(/\s+/).length;
    const verbosityScore = Math.min(
      100,
      Math.max(
        0,
        ((wordCount - 5) / 20) * 100 // 5 words = 0%, 25 words = 100%
      )
    );

    // Calculate filler word percentage
    const fillerWordPatterns = queryPatterns
      .filter((p) => p.category === "Filler removal")
      .flatMap((p) => p.patterns);

    let fillerWordCount = 0;
    for (const pattern of fillerWordPatterns) {
      const matches = query.match(pattern);
      if (matches) fillerWordCount += matches.length;
    }

    const fillerPercentage =
      wordCount > 0 ? Math.min(100, (fillerWordCount / wordCount) * 100) : 0;

    // Get optimized query with different strategies
    const conservativeOptimized = this.optimizeQuery(query, {
      applyContextual: false,
      domains,
      intents,
      minPriority: 7,
    });

    const moderateOptimized = this.optimizeQuery(query, {
      applyContextual: true,
      domains,
      intents,
      minPriority: 4,
    });

    const aggressiveOptimized = this.optimizeQuery(query, {
      applyContextual: true,
      domains,
      intents,
      minPriority: 0,
    });

    return {
      originalQuery: query,
      originalLength: query.length,
      wordCount,
      domains,
      intents,
      metrics: {
        verbosityScore,
        fillerPercentage,
      },
      optimized: {
        conservative: {
          query: conservativeOptimized,
          length: conservativeOptimized.length,
          reductionPercent: (
            ((query.length - conservativeOptimized.length) / query.length) *
            100
          ).toFixed(1),
        },
        moderate: {
          query: moderateOptimized,
          length: moderateOptimized.length,
          reductionPercent: (
            ((query.length - moderateOptimized.length) / query.length) *
            100
          ).toFixed(1),
        },
        aggressive: {
          query: aggressiveOptimized,
          length: aggressiveOptimized.length,
          reductionPercent: (
            ((query.length - aggressiveOptimized.length) / query.length) *
            100
          ).toFixed(1),
        },
      },
    };
  },

  /**
   * Batch processes multiple queries for optimization
   * @param {Array<string>} queries - Array of query strings to optimize
   * @param {Object} options - Options for optimization
   * @returns {Array<Object>} - Array of results with original and optimized queries
   */
  batchOptimize: function (queries, options = {}) {
    return queries.map((query) => ({
      original: query,
      optimized: this.optimizeQuery(query, options),
    }));
  },

  /**
   * Suggests alternative formulations for a query
   * @param {string} query - The original query
   * @returns {Array<string>} - Array of alternative formulations
   */
  suggestAlternatives: function (query) {
    const alternatives = [];
    const domains = this.detectDomains(query);
    const intents = this.detectIntents(query);

    // Basic optimization
    alternatives.push(
      this.optimizeQuery(query, {
        applyContextual: true,
        domains,
        intents,
      })
    );

    // Intent-focused alternatives
    if (intents.length > 0) {
      const primaryIntent = intents[0];

      switch (primaryIntent) {
        case "instructional":
          alternatives.push(
            `how to ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          alternatives.push(
            `steps for ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          break;
        case "informational":
          alternatives.push(
            `define ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          alternatives.push(
            `explain ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          break;
        case "comparative":
          alternatives.push(
            `compare ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          alternatives.push(
            `differences between ${this.optimizeQuery(query, {
              minPriority: 9,
            })}`
          );
          break;
        case "recommendation":
          alternatives.push(
            `best ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          alternatives.push(
            `recommend ${this.optimizeQuery(query, { minPriority: 9 })}`
          );
          break;
      }
    }

    // Add domain-specific alternatives
    if (domains.length > 0) {
      const primaryDomain = domains[0];
      alternatives.push(
        `${primaryDomain} ${this.optimizeQuery(query, { minPriority: 8 })}`
      );
    }

    // Remove duplicates
    return [...new Set(alternatives)].filter(
      (alt) => alt !== query && alt.trim().length > 0
    );
  },

  /**
   * Gets a list of all patterns for a given category
   * @param {string} category - The category to filter by
   * @returns {Array<Object>} - Array of pattern objects
   */
  getPatternsByCategory: function (category) {
    return queryPatterns.filter((pattern) => pattern.category === category);
  },

  /**
   * Gets a list of all patterns for a given subcategory
   * @param {string} subcategory - The subcategory to filter by
   * @returns {Array<Object>} - Array of pattern objects
   */
  getPatternsBySubcategory: function (subcategory) {
    return queryPatterns.filter(
      (pattern) => pattern.subcategory === subcategory
    );
  },

  /**
   * Gets a list of all available categories
   * @returns {Array<string>} - Array of category names
   */
  getAllCategories: function () {
    return [...new Set(queryPatterns.map((pattern) => pattern.category))];
  },

  /**
   * Gets a list of all available subcategories
   * @returns {Array<string>} - Array of subcategory names
   */
  getAllSubcategories: function () {
    return [
      ...new Set(
        queryPatterns.filter((p) => p.subcategory).map((p) => p.subcategory)
      ),
    ];
  },

  /**
   * Counts the number of patterns in the database
   * @returns {Object} - Counts by category and total
   */
  getPatternCount: function () {
    const total = queryPatterns.length;
    const byCategory = {};

    for (const pattern of queryPatterns) {
      if (!byCategory[pattern.category]) {
        byCategory[pattern.category] = 0;
      }
      byCategory[pattern.category]++;
    }

    return { total, byCategory };
  },

  /**
   * Adds a new pattern to the database
   * @param {Object} pattern - The pattern object to add
   */
  addPattern: function (pattern) {
    if (!pattern.category || !pattern.patterns) {
      throw new Error("Pattern must have category and patterns properties");
    }

    queryPatterns.push(pattern);
  },

  /**
   * Removes a pattern from the database by index
   * @param {number} index - The index of the pattern to remove
   */
  removePattern: function (index) {
    if (index < 0 || index >= queryPatterns.length) {
      throw new Error("Invalid pattern index");
    }

    queryPatterns.splice(index, 1);
  },

  /**
   * Updates an existing pattern
   * @param {number} index - The index of the pattern to update
   * @param {Object} updatedPattern - The updated pattern properties
   */
  updatePattern: function (index, updatedPattern) {
    if (index < 0 || index >= queryPatterns.length) {
      throw new Error("Invalid pattern index");
    }

    queryPatterns[index] = { ...queryPatterns[index], ...updatedPattern };
  },
};

// Specific application for search query optimization
const searchQueryOptimizer = {
  /**
   * Optimizes a query specifically for search engines
   * @param {string} query - The original query
   * @returns {string} - Optimized search query
   */
  optimizeForSearch: function (query) {
    // First apply general optimization
    let optimized = queryOptimizer.optimizeQuery(query, {
      applyContextual: true,
      minPriority: 5,
    });

    // Search-specific optimizations

    // 1. Add quotes around exact phrases (phrases with 2+ words that should stay together)
    const potentialPhrases =
      optimized.match(/\b[A-Za-z0-9]+ [A-Za-z0-9]+(?: [A-Za-z0-9]+){1,3}\b/g) ||
      [];
    for (const phrase of potentialPhrases) {
      // Only add quotes if phrase seems like it should stay together
      if (phrase.split(" ").length >= 2 && phrase.split(" ").length <= 5) {
        // Check if phrase seems like a proper noun or common phrase
        if (
          /^[A-Z]/.test(phrase) ||
          commonPhrases.some((p) => phrase.toLowerCase().includes(p))
        ) {
          optimized = optimized.replace(phrase, `"${phrase}"`);
        }
      }
    }

    // 2. Remove unnecessary operators
    optimized = optimized.replace(/\b(and|or)\b/gi, " ");

    // 3. Add explicit plus for important terms (first noun and verb)
    const words = optimized.split(" ");
    let addedPlus = false;
    for (let i = 0; i < words.length && !addedPlus; i++) {
      const word = words[i];
      // Skip short words, quoted phrases, and words already with operators
      if (
        word.length <= 3 ||
        word.startsWith('"') ||
        word.startsWith("+") ||
        word.startsWith("-")
      ) {
        continue;
      }

      // Check if it's likely a meaningful noun or verb
      if (/^[A-Za-z][a-z]+[^.,;:"'!?]$/.test(word)) {
        words[i] = `+${word}`;
        addedPlus = true;
      }
    }

    if (addedPlus) {
      optimized = words.join(" ");
    }

    return optimized;
  },

  // List of common phrases that should be kept together
  commonPhrases: [
    "new york",
    "los angeles",
    "san francisco",
    "united states",
    "social media",
    "machine learning",
    "artificial intelligence",
    "climate change",
    "global warming",
    "white house",
    "black friday",
    "real estate",
    "virtual reality",
    "customer service",
    "health care",
    "credit card",
    "high school",
    "real time",
    "mobile phone",
    "open source",
    "search engine",
    "quality assurance",
    "operating system",
    "user experience",
    "user interface",
    "natural language",
    "remote work",
    "home office",
    "best practice",
    "data science",
    "data analysis",
    "project management",
    "supply chain",
    "human resources",
  ],
};

// Specialized optimization for voice queries
const voiceQueryOptimizer = {
  /**
   * Optimizes a query that likely came from voice input
   * @param {string} query - The original voice query
   * @returns {string} - Optimized query
   */
  optimizeVoiceQuery: function (query) {
    // First apply general optimization
    let optimized = queryOptimizer.optimizeQuery(query, {
      applyContextual: true,
    });

    // Voice-specific optimizations

    // 1. Fix common voice transcription errors
    const transcriptionFixes = [
      { pattern: /\bhour\b/g, replacement: "our" },
      { pattern: /\bfor\b/g, replacement: "four" },
      { pattern: /\bwon\b/g, replacement: "one" },
      { pattern: /\bto\b/g, replacement: "two" },
      { pattern: /\bthree\b/g, replacement: "3" },
      { pattern: /\bfor\b/g, replacement: "4" },
      { pattern: /\bby\b/g, replacement: "buy" },
      { pattern: /\bknow\b/g, replacement: "no" },
      { pattern: /\bwear\b/g, replacement: "where" },
      { pattern: /\bthere\b/g, replacement: "their" },
      { pattern: /\bweight\b/g, replacement: "wait" },
      { pattern: /\bsee\b/g, replacement: "sea" },
    ];

    // Only apply these selectively based on context
    // (This is simplified - would need more sophisticated context detection)

    // 2. Add punctuation (simplified approach)
    if (
      !optimized.includes(".") &&
      !optimized.includes("?") &&
      !optimized.includes("!")
    ) {
      if (
        /^(who|what|when|where|why|how|is|are|do|does|can|could|will|would|should)/.test(
          optimized
        )
      ) {
        optimized += "?";
      } else {
        optimized += ".";
      }
    }

    // 3. Fix common filler words more aggressively
    optimized = optimized
      .replace(
        /\b(um|uh|hmm|like|you know|i mean|actually|basically|so)\b\s*/gi,
        " "
      )
      .replace(/\s{2,}/g, " ");

    return optimized.trim();
  },

  /**
   * Detects if a query was likely from voice input
   * @param {string} query - The query to analyze
   * @returns {boolean} - Whether query appears to be from voice input
   */
  isLikelyVoiceQuery: function (query) {
    // Check for common voice query indicators
    const voiceIndicators = [
      // Lack of punctuation in longer queries
      query.length > 15 && !/[.,;:!?]/.test(query),

      // Presence of filler words
      /\b(um|uh|hmm|like|you know|i mean)\b/i.test(query),

      // Run-on sentences
      query.split(" ").length > 15 && !/[.,;:!?]/.test(query),

      // Informal/conversational style
      /\b(hey|hi|hello|okay so|so|anyway)\b/i.test(query),
    ];

    // If at least two indicators are present, likely a voice query
    return voiceIndicators.filter(Boolean).length >= 2;
  },
};

// Specialized optimization for programming/technical queries
const technicalQueryOptimizer = {
  /**
   * Optimizes a technical or programming-related query
   * @param {string} query - The original query
   * @returns {string} - Optimized technical query
   */
  optimizeTechnicalQuery: function (query) {
    // First apply general optimization
    let optimized = queryOptimizer.optimizeQuery(query, {
      applyContextual: true,
      domains: ["programming"],
      minPriority: 5,
    });

    // Technical-specific optimizations

    // 1. Preserve code snippets (anything that looks like code)
    const codeSnippets = [];
    optimized = optimized.replace(/`([^`]+)`/g, (match, code) => {
      codeSnippets.push(code);
      return `__CODE_PLACEHOLDER_${codeSnippets.length - 1}__`;
    });

    // 2. Preserve technical terms and library/framework names
    const technicalTerms = [
      // Programming languages
      "javascript",
      "python",
      "java",
      "c++",
      "c#",
      "ruby",
      "go",
      "rust",
      "php",
      "swift",
      // Frameworks and libraries
      "react",
      "angular",
      "vue",
      "node.js",
      "express",
      "django",
      "flask",
      "spring",
      "tensorflow",
      // Concepts
      "api",
      "rest",
      "graphql",
      "http",
      "ajax",
      "json",
      "xml",
      "dom",
      "sql",
      "nosql",
      // Tools
      "git",
      "docker",
      "kubernetes",
      "jenkins",
      "aws",
      "azure",
      "gcp",
    ];

    for (const term of technicalTerms) {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      optimized = optimized.replace(regex, term.toLowerCase());
    }

    // 3. Add language or framework context if missing
    const programmingContext = this.detectProgrammingContext(query);
    if (programmingContext && !optimized.includes(programmingContext)) {
      optimized = `${programmingContext} ${optimized}`;
    }

    // 4. Restore code snippets
    for (let i = 0; i < codeSnippets.length; i++) {
      optimized = optimized.replace(
        `__CODE_PLACEHOLDER_${i}__`,
        `\`${codeSnippets[i]}\``
      );
    }

    return optimized;
  },

  /**
   * Detects programming language or framework context from a query
   * @param {string} query - The query to analyze
   * @returns {string|null} - Detected programming context or null
   */
  detectProgrammingContext: function (query) {
    const programmingContexts = {
      javascript: [
        "javascript",
        "js",
        "node",
        "nodejs",
        "react",
        "angular",
        "vue",
      ],
      python: [
        "python",
        "django",
        "flask",
        "numpy",
        "pandas",
        "tensorflow",
        "pytorch",
      ],
      java: ["java", "spring", "hibernate", "maven", "gradle", "android"],
      "c#": ["c#", "csharp", ".net", "asp.net", "dotnet", "blazor"],
      php: ["php", "laravel", "symfony", "wordpress", "drupal"],
      ruby: ["ruby", "rails", "sinatra", "rake"],
      sql: ["sql", "mysql", "postgresql", "oracle", "database", "query"],
      "html/css": ["html", "css", "sass", "scss", "less", "stylesheet"],
      go: ["golang", "go lang", "go programming"],
      rust: ["rust", "cargo"],
      swift: ["swift", "ios", "xcode", "swiftui"],
    };

    for (const [context, keywords] of Object.entries(programmingContexts)) {
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        if (regex.test(query)) {
          return context;
        }
      }
    }

    return null;
  },
};

// Export all the utilities
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    queryPatterns,
    queryOptimizer,
    searchQueryOptimizer,
    voiceQueryOptimizer,
    technicalQueryOptimizer,
  };
} else {
  // For browser use
  window.queryPatterns = queryPatterns;
  window.queryOptimizer = queryOptimizer;
  window.searchQueryOptimizer = searchQueryOptimizer;
  window.voiceQueryOptimizer = voiceQueryOptimizer;
  window.technicalQueryOptimizer = technicalQueryOptimizer;
}
