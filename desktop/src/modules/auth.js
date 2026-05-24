// Auth module for Electron desktop app
// Simplified version — no Google sign-in in desktop mode
// Users can add this later with Firebase SDK or OAuth2 desktop flow

class PromptCraftAuth {
  constructor() {
    this.AUTH_KEY = 'promptcraft_auth';
    this.user = null;
  }

  async init() {
    const stored = await window.electronAPI.storeGet(this.AUTH_KEY, null);
    if (stored && stored.name) {
      this.user = stored;
    }
    return this.user;
  }

  async signIn() {
    // Desktop version: simplified local profile
    // For full OAuth2, would need to implement PKCE flow with system browser
    throw new Error('Google Sign-In is not available in the desktop version yet. Your data is stored locally.');
  }

  async signOut() {
    this.user = null;
    await window.electronAPI.storeDelete(this.AUTH_KEY);
  }

  isSignedIn() {
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }
}
