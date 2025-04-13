# 🐋 TokenWhale

**TokenWhale** is a Chrome extension that helps users reduce token usage when interacting with Large Language Models (LLMs) like ChatGPT. By optimizing prompts, managing outputs, and estimating image token costs, TokenWhale promotes more sustainable and efficient AI usage.

---

## 🐋 Name Inspiration: TokenWhale
The name TokenWhale is inspired by the carbon-capturing power of real whales. According to Sustainability by Numbers, each whale can capture and help store around 33 tons of CO₂, making them vital to the planet’s climate balance.

Just like whales reduce carbon from the atmosphere, TokenWhale aims to reduce the “carbon footprint” of AI interactions by helping users minimize token usage—each token saved is a step toward greener, more responsible AI.
---

## 🚀 Features

- 🔹 Suggests prompt rewrites to reduce input token count  
- 🔹 Allows users to control response verbosity  
- 🔹 Real-time dashboard to track session token usage  
- 🔹 Estimates token cost for image inputs (based on resolution)  
- 🔹 Flags oversized context windows to reduce compute usage

---

## 🧠 Why TokenWhale?

Every token processed by an LLM consumes compute, energy, and adds to its environmental footprint.

- ChatGPT consumes over **1000 GWh annually**, equivalent to powering 100K+ homes  
- GPT-4 uses **50x more energy** to train than GPT-3  
- **Tokens = Energy = Cost = Carbon Impact**

TokenWhale empowers users to interact with LLMs more efficiently and sustainably.

---

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surajshivkumar/TokenWhale.git
   ```

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `extension` folder from your local machine

---

## 📁 Project Structure

```
TokenWhale/extension
├── background.js             # Handles background events (e.g., extension installed)
├── content.js                # Injected into ChatGPT webpage to monitor usage
├── dashboard.html            # Token usage dashboard UI
├── dashboard.js              # Dashboard interactivity & metrics
├── popup.html                # Extension popup for quick stats/tips
├── popup.js                  # Popup script logic
├── query-optimizer.js        # Core logic to optimize user prompts and responses
├── query-patterns.js         # Stores optimization patterns and best practices
├── storage.js                # Manages persistent data storage (local/session)
├── environment.css           # Styling for dashboard interface
├── manifest.json             # Chrome extension manifest/configuration
└── images/                   # Icons and visual assets
```

---

## 🔢 Token Calculation for Images

TokenWhale uses the following estimate for image-based input costs:

```
Total Tokens = (Number of 512×512 tiles × 170) + 85
```

📷 **Example:**
- Image size = **1100 × 716**
- Tiled into 3 x 2 = 6 tiles
- Token usage = (6 × 170) + 85 = **1,105 tokens**

After resizing to **512 × 512**:
- 1 tile → (1 × 170) + 85 = **255 tokens**

✅ **Savings: ~850 tokens**

---

## 💡 Optimization Tips

TokenWhale recommends:
- Writing shorter prompts (e.g., “Summarize in 3 lines”)
- Reducing unnecessary response length
- Starting new chats when history/context gets long
- Resizing high-res images before uploading to models

---

## 👨‍💻 Contributing

We welcome contributions from the community!

To contribute:
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes  
4. Push and submit a pull request

## 📬 Contact

Questions, ideas, or feedback?  
Open an issue or start a discussion on the repo:  
🔗 [https://github.com/surajshivkumar/TokenWhale/issues](https://github.com/surajshivkumar/TokenWhale/issues)
