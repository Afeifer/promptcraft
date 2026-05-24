class PromptStorage {
  constructor() {
    this.HISTORY_KEY = 'promptcraft_history';
    this.FAVORITES_KEY = 'promptcraft_favorites';
    this.SETTINGS_KEY = 'promptcraft_settings';
    this.MAX_HISTORY = 50;
  }

  async getSettings() {
    const result = await window.electronAPI.storeGet(this.SETTINGS_KEY, {
      lang: 'en',
      promptLang: 'en',
      apiKey: '',
      model: 'gemini-2.5-flash'
    });
    return result;
  }

  async saveSettings(settings) {
    await window.electronAPI.storeSet(this.SETTINGS_KEY, settings);
  }

  async getHistory() {
    return await window.electronAPI.storeGet(this.HISTORY_KEY, []);
  }

  async addToHistory(entry) {
    const history = await this.getHistory();

    // If entry has an id, try to update existing record
    if (entry.id) {
      const existingIndex = history.findIndex(item => item.id === entry.id);
      if (existingIndex !== -1) {
        history[existingIndex].prompt = entry.prompt;
        history[existingIndex].description = entry.description;
        history[existingIndex].details = entry.details || history[existingIndex].details;
        await window.electronAPI.storeSet(this.HISTORY_KEY, history);
        return history[existingIndex];
      }
    }

    const item = {
      id: entry.id || Date.now().toString(),
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
    await window.electronAPI.storeSet(this.HISTORY_KEY, history);
    return item;
  }

  async removeFromHistory(id) {
    const history = await this.getHistory();
    const filtered = history.filter(item => item.id !== id);
    await window.electronAPI.storeSet(this.HISTORY_KEY, filtered);
  }

  async getFavorites() {
    return await window.electronAPI.storeGet(this.FAVORITES_KEY, []);
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
    await window.electronAPI.storeSet(this.FAVORITES_KEY, favorites);
  }

  async removeFromFavorites(id) {
    const favorites = await this.getFavorites();
    const filtered = favorites.filter(item => item.id !== id);
    await window.electronAPI.storeSet(this.FAVORITES_KEY, filtered);
  }

  async isFavorite(id) {
    const favorites = await this.getFavorites();
    return favorites.some(f => f.id === id);
  }
}
