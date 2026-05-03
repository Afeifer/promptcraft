class PromptStorage {
  constructor() {
    this.HISTORY_KEY = 'promptcraft_history';
    this.FAVORITES_KEY = 'promptcraft_favorites';
    this.SETTINGS_KEY = 'promptcraft_settings';
    this.MAX_HISTORY = 50;
  }

  async getSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.SETTINGS_KEY, (result) => {
        resolve(result[this.SETTINGS_KEY] || {
          lang: 'en',
          promptLang: 'en',
          apiKey: '',
          model: 'gemini-2.5-flash'
        });
      });
    });
  }

  async saveSettings(settings) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.SETTINGS_KEY]: settings }, resolve);
    });
  }

  async getHistory() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.HISTORY_KEY, (result) => {
        resolve(result[this.HISTORY_KEY] || []);
      });
    });
  }

  async addToHistory(entry) {
    const history = await this.getHistory();
    const item = {
      id: Date.now().toString(),
      category: entry.category,
      description: entry.description,
      prompt: entry.prompt,
      timestamp: new Date().toISOString(),
      details: entry.details || {}
    };
    history.unshift(item);
    if (history.length > this.MAX_HISTORY) {
      history.pop();
    }
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.HISTORY_KEY]: history }, () => resolve(item));
    });
  }

  async removeFromHistory(id) {
    const history = await this.getHistory();
    const filtered = history.filter(item => item.id !== id);
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.HISTORY_KEY]: filtered }, resolve);
    });
  }

  async getFavorites() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.FAVORITES_KEY, (result) => {
        resolve(result[this.FAVORITES_KEY] || []);
      });
    });
  }

  async addToFavorites(entry) {
    const favorites = await this.getFavorites();
    const exists = favorites.some(f => f.id === entry.id);
    if (exists) return;

    const item = {
      id: entry.id || Date.now().toString(),
      category: entry.category,
      description: entry.description,
      prompt: entry.prompt,
      timestamp: entry.timestamp || new Date().toISOString()
    };
    favorites.unshift(item);
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.FAVORITES_KEY]: favorites }, resolve);
    });
  }

  async removeFromFavorites(id) {
    const favorites = await this.getFavorites();
    const filtered = favorites.filter(item => item.id !== id);
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.FAVORITES_KEY]: filtered }, resolve);
    });
  }

  async isFavorite(id) {
    const favorites = await this.getFavorites();
    return favorites.some(f => f.id === id);
  }
}
