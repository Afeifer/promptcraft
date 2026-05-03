# PromptCraft ⚡

Create perfect AI prompts for any task — no prompt engineering knowledge required.

## What is PromptCraft?

PromptCraft is a Chrome extension that transforms your vague ideas into structured, optimized prompts for any AI model (ChatGPT, Claude, Gemini, Midjourney, etc.).

### Two modes:
- **Builder Mode (offline)** — Step-by-step form that guides you through creating a perfect prompt. Works without internet.
- **AI Enhancement (optional)** — Uses free Gemini API to further improve your prompts with AI assistance.

## Features

- 🧱 **Step-by-step prompt builder** — 5 easy steps from idea to perfect prompt
- 📂 **8 task categories** — Code, Text, Images, Analysis, Translation, Learning, Chat, Other
- 🎯 **Smart templates** — Category-specific fields (language, tone, style, etc.)
- 🤖 **AI Enhancement** — Optional Gemini API integration for smarter prompts
- 📚 **Prompt History** — All your prompts saved locally
- ⭐ **Favorites** — Star your best prompts for quick access
- 🌍 **3 languages** — English, Russian, German
- 🔒 **Privacy first** — Everything stays in your browser
- 🌙 **Dark theme** — Easy on the eyes

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the `promptcraft` folder
6. The PromptCraft icon will appear in your browser toolbar

## Optional: AI Enhancement

To use the "Enhance with AI" feature:
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a free API key
3. Open PromptCraft Settings and paste your key
4. Click "Enhance with AI" on any generated prompt

The free tier gives you 15 requests/minute — more than enough for personal use.

## How It Works

1. **Choose a category** — What type of task? (Code, Text, Image, etc.)
2. **Describe your task** — In your own words, what do you need?
3. **Set details** — Category-specific options (language, tone, style, etc.)
4. **Add context** — Any important background info (optional)
5. **Get your prompt** — Copy it, enhance it with AI, or save to favorites

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- Chrome Extension Manifest V3
- Google Gemini API (optional, for AI enhancement)
- chrome.storage for local data persistence

## License

MIT
