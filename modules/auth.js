class PromptCraftAuth {
  constructor() {
    this.AUTH_KEY = 'promptcraft_auth';
    this.user = null;
    this.MAX_RETRIES = 2;
  }

  async init() {
    const stored = await this._getStored();
    if (stored && stored.idToken) {
      this.user = stored;
    }
    return this.user;
  }

  async signIn() {
    // Clear any cached tokens before starting fresh sign-in
    await this._clearCachedTokens();

    let lastError = null;

    for (let attempt = 0; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        const accessToken = await this._getGoogleToken(attempt > 0);
        const firebaseUser = await this._signInWithFirebase(accessToken);
        await this._saveUserToFirestore(firebaseUser);
        this.user = firebaseUser;
        await this._setStored(firebaseUser);
        return firebaseUser;
      } catch (error) {
        lastError = error;
        // Clear tokens and retry on auth errors
        await this._clearCachedTokens();

        if (error.message === 'The user did not approve access.' ||
            error.message === 'Auth flow was cancelled') {
          throw error; // User cancelled — don't retry
        }
      }
    }

    throw lastError || new Error('Sign in failed after multiple attempts');
  }

  async signOut() {
    await this._clearCachedTokens();
    this.user = null;
    await this._clearStored();
  }

  isSignedIn() {
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }

  async _getGoogleToken(isRetry) {
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;
    const scopes = 'openid email profile';

    // On retry, add login_hint='' to force account chooser
    let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(GOOGLE_OAUTH_CLIENT_ID)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `prompt=select_account`;

    if (isRetry) {
      authUrl += `&_retry=${Date.now()}`;
    }

    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        { url: authUrl, interactive: true },
        (responseUrl) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          if (!responseUrl) {
            reject(new Error('Auth flow was cancelled'));
            return;
          }

          // Check for error in response
          if (responseUrl.includes('error=')) {
            const url = new URL(responseUrl);
            const params = new URLSearchParams(url.hash.substring(1));
            const error = params.get('error');
            const errorDesc = params.get('error_description') || error;
            reject(new Error(errorDesc));
            return;
          }

          const url = new URL(responseUrl);
          const params = new URLSearchParams(url.hash.substring(1));
          const accessToken = params.get('access_token');

          if (!accessToken) {
            reject(new Error('No access token received'));
            return;
          }

          resolve(accessToken);
        }
      );
    });
  }

  async _signInWithFirebase(accessToken) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${FIREBASE_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postBody: `access_token=${accessToken}&providerId=google.com`,
          requestUri: `https://${chrome.runtime.id}.chromiumapp.org/`,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const msg = error?.error?.message || '';
      if (msg.includes('INVALID_IDP_RESPONSE')) {
        throw new Error('Token expired, retrying...');
      }
      throw new Error(msg || 'Firebase auth failed');
    }

    const data = await response.json();

    return {
      uid: data.localId,
      email: data.email,
      name: data.displayName || data.email.split('@')[0],
      photo: data.photoUrl || null,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    };
  }

  async _saveUserToFirestore(user) {
    const docUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/users/${user.uid}`;

    const body = {
      fields: {
        email: { stringValue: user.email },
        name: { stringValue: user.name },
        photo: { stringValue: user.photo || '' },
        lastLogin: { timestampValue: new Date().toISOString() },
        createdAt: { timestampValue: new Date().toISOString() },
        newsletter: { booleanValue: true }
      }
    };

    try {
      const existing = await fetch(docUrl, {
        headers: { 'Authorization': `Bearer ${user.idToken}` }
      });

      if (existing.ok) {
        const doc = await existing.json();
        if (doc.fields?.createdAt) {
          body.fields.createdAt = doc.fields.createdAt;
        }
        if (doc.fields?.newsletter) {
          body.fields.newsletter = doc.fields.newsletter;
        }
      }
    } catch {
      // First time user — use defaults
    }

    await fetch(docUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.idToken}`
      },
      body: JSON.stringify(body)
    });
  }

  async _clearCachedTokens() {
    return new Promise((resolve) => {
      try {
        chrome.identity.clearAllCachedAuthTokens(() => resolve());
      } catch {
        resolve();
      }
    });
  }

  async _getStored() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.AUTH_KEY, (result) => {
        resolve(result[this.AUTH_KEY] || null);
      });
    });
  }

  async _setStored(user) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.AUTH_KEY]: user }, resolve);
    });
  }

  async _clearStored() {
    return new Promise((resolve) => {
      chrome.storage.local.remove(this.AUTH_KEY, resolve);
    });
  }
}
