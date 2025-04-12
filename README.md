# 🐋 TokenWhale

![TokenWhale Logo](./images/token_whale.png)  
*Chrome extension to optimize token usage in LLM chat apps (ChatGPT, Gemini, etc.)*

**Reduce Tokens. Save Energy. Sustain the Future.**

---

## What is TokenWhale?

**TokenWhale** is a Chrome extension designed to make everyday usage of LLMs (like ChatGPT) more sustainable by reducing the number of input and output tokens — which in turn reduces energy consumption and the water used to cool data center GPUs.

With LLMs becoming deeply embedded in daily workflows, each token processed has a hidden cost. Our goal is to **minimize environmental impact** without compromising user experience.

---

## Why TokenWhale?

Recent studies show that AI workloads consume massive amounts of electricity and water — especially during inference. Every token counts:

- More tokens → More GPU cycles  
- More GPU cycles → More energy  
- More energy → More water to cool those GPUs

If we can **cut down token usage at scale**, we can help reduce this carbon and water footprint significantly.

---

## How It Works

TokenWhale adds smart features directly into the ChatGPT interface:

### ✅ Prompt Optimizer
- Injects a lightweight “**Optimize**” button above the Send button.
- Uses rule-based logic (no model calls!) to reduce verbose or redundant text in the user’s prompt before submission.
- Keeps the intent intact, while minimizing input token usage.

### ✂️ Output Limit Controller
- Adds a floating control panel with response length options:  
  `LIMIT 1-2 sentences`, `LENGTH: short`, `RESPONSE: medium`, etc.
- These short-tail directives are **token-efficient** and guide ChatGPT to produce concise outputs.
- Avoids verbose instructions like "Please summarize in short form" that waste tokens.

### 🔢 Live Token Tracker 
- Displays number of queries optimized and total estimated token savings.
- Gamifies sustainable AI usage and rewards mindful behavior.



---

## 🌊 Vision

If just 1% of LLM interactions adopted token-saving practices like TokenWhale, the global energy and water savings could be substantial.

TokenWhale aims to **shift LLM usage toward sustainability**, one optimized prompt at a time.

---
# 🔖 References

- [LLM Energy Consumption – Adasci](https://adasci.org/how-much-energy-do-llms-consume-unveiling-the-power-behind-ai/)
- [LLM Energy Use – Epoch AI](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use)
- [Blog Post – GenAI Impact](https://genai-impact.org/blog/post-1/)
- [Prompt Engineering Guide – PromptHub](https://www.prompthub.us/blog/10-best-practices-for-prompt-engineering-with-an-llm-openai-gpt-model)
