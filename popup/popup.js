document.addEventListener('DOMContentLoaded', async () => {
  const generator = new PromptGenerator();
  const storage = new PromptStorage();

  // State
  let currentStep = 1;
  let selectedCategory = null;
  let detailValues = {};
  let currentPrompt = '';
  let currentPromptId = null;
  let currentLang = 'en';
  let promptLang = 'en';
  let previousView = 'builder';

  // i18n messages cache
  let messages = {};

  // Load settings
  const settings = await storage.getSettings();
  currentLang = settings.lang || 'en';
  promptLang = settings.promptLang || 'en';

  // Load i18n
  await loadMessages(currentLang);
  applyI18n();

  // ==================== i18n ====================

  async function loadMessages(lang) {
    try {
      const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
      const response = await fetch(url);
      messages = await response.json();
    } catch (e) {
      console.warn('Failed to load messages for', lang, e);
    }
  }

  function msg(key) {
    if (messages[key] && messages[key].message) {
      return messages[key].message;
    }
    return chrome.i18n.getMessage(key) || key;
  }

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = msg(key);
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = msg(key);
      if (text) el.placeholder = text;
    });
  }

  // ==================== Navigation ====================

  function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tab = document.querySelector(`.tab[data-tab="${viewId}"]`);
    if (tab) tab.classList.add('active');
  }

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const viewId = tab.dataset.tab;
      previousView = viewId;
      showView(viewId);
      if (viewId === 'history') renderHistory();
      if (viewId === 'favorites') renderFavorites();
    });
  });

  // Settings button
  document.getElementById('btn-settings').addEventListener('click', () => {
    showView('settings');
    loadSettingsUI();
  });

  // ==================== Steps ====================

  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');

    // Update progress
    const progressPercent = (step / 5) * 100;
    document.getElementById('progress-bar').style.setProperty('--progress', `${progressPercent}%`);

    document.querySelectorAll('.progress-step').forEach(ps => {
      const s = parseInt(ps.dataset.step);
      ps.classList.remove('active', 'completed');
      if (s === step) ps.classList.add('active');
      if (s < step) ps.classList.add('completed');
    });
  }

  // Step 1: Category selection
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedCategory = card.dataset.category;
      detailValues = {};
      setTimeout(() => goToStep(2), 200);
    });
  });

  // Step 2: Next/Back
  document.getElementById('btn-next-2').addEventListener('click', () => {
    const desc = document.getElementById('task-description').value.trim();
    if (!desc) {
      document.getElementById('task-description').focus();
      return;
    }
    renderDetailsFields();
    goToStep(3);
  });
  document.getElementById('btn-back-2').addEventListener('click', () => goToStep(1));

  // Step 3: Next/Back
  document.getElementById('btn-next-3').addEventListener('click', () => goToStep(4));
  document.getElementById('btn-back-3').addEventListener('click', () => goToStep(2));

  // Step 4: Generate/Back
  document.getElementById('btn-back-4').addEventListener('click', () => goToStep(3));
  document.getElementById('btn-generate').addEventListener('click', generatePrompt);

  // Step 5: New prompt
  document.getElementById('btn-new-prompt').addEventListener('click', resetBuilder);

  // ==================== Details Fields ====================

  function renderDetailsFields() {
    const container = document.getElementById('details-fields');
    container.innerHTML = '';

    const fields = generator.getFieldsForCategory(selectedCategory);
    if (fields.length === 0) {
      const p = document.createElement('p');
      p.style.color = 'var(--text-muted)';
      p.style.fontSize = '13px';
      p.textContent = selectedCategory === 'chat'
        ? (currentLang === 'ru' ? 'Нет дополнительных параметров для этой категории.' :
           currentLang === 'de' ? 'Keine zusätzlichen Parameter für diese Kategorie.' :
           'No additional parameters for this category.')
        : '';
      if (p.textContent) container.appendChild(p);
      return;
    }

    fields.forEach(field => {
      const fieldDiv = document.createElement('div');
      fieldDiv.className = 'detail-field';

      const label = document.createElement('label');
      label.className = 'detail-label';
      label.textContent = msg(field.labelKey);
      fieldDiv.appendChild(label);

      if (field.type === 'pills') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'detail-options';

        field.options.forEach(opt => {
          const btn = document.createElement('button');
          btn.className = 'detail-option';

          let value, labelText;
          if (typeof opt === 'object') {
            value = opt.value;
            labelText = msg(opt.labelKey);
          } else {
            value = opt;
            labelText = opt;
          }

          btn.textContent = labelText;
          btn.dataset.value = value;

          if (detailValues[field.id] === value) {
            btn.classList.add('selected');
          }

          btn.addEventListener('click', () => {
            optionsDiv.querySelectorAll('.detail-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            detailValues[field.id] = value;
          });

          optionsDiv.appendChild(btn);
        });

        fieldDiv.appendChild(optionsDiv);
      } else if (field.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-text';
        input.placeholder = field.placeholder || '';
        input.value = detailValues[field.id] || '';
        input.addEventListener('input', (e) => {
          detailValues[field.id] = e.target.value;
        });
        fieldDiv.appendChild(input);
      }

      container.appendChild(fieldDiv);
    });
  }

  // ==================== Generate ====================

  async function generatePrompt() {
    const description = document.getElementById('task-description').value.trim();
    const context = document.getElementById('task-context').value.trim();

    const data = {
      category: selectedCategory,
      description,
      details: detailValues,
      context,
      promptLang
    };

    currentPrompt = generator.generate(data);
    currentPromptId = Date.now().toString();

    document.getElementById('generated-prompt').textContent = currentPrompt;

    // Reset buttons
    const copyBtn = document.getElementById('btn-copy');
    copyBtn.classList.remove('copied');
    copyBtn.querySelector('span').textContent = msg('btnCopy');

    const favBtn = document.getElementById('btn-favorite');
    favBtn.classList.remove('favorited');

    document.getElementById('enhance-status').classList.add('hidden');

    // Save to history
    await storage.addToHistory({
      id: currentPromptId,
      category: selectedCategory,
      description,
      prompt: currentPrompt,
      details: detailValues
    });

    goToStep(5);
  }

  // ==================== Copy ====================

  document.getElementById('btn-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      const btn = document.getElementById('btn-copy');
      btn.classList.add('copied');
      btn.querySelector('span').textContent = msg('btnCopied');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.querySelector('span').textContent = msg('btnCopy');
      }, 2000);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  });

  // ==================== Favorite ====================

  document.getElementById('btn-favorite').addEventListener('click', async () => {
    const btn = document.getElementById('btn-favorite');
    if (btn.classList.contains('favorited')) return;

    await storage.addToFavorites({
      id: currentPromptId,
      category: selectedCategory,
      description: document.getElementById('task-description').value.trim(),
      prompt: currentPrompt
    });

    btn.classList.add('favorited');
    showToast(msg('btnFavorited'));
  });

  // ==================== Enhance with AI ====================

  document.getElementById('btn-enhance').addEventListener('click', async () => {
    const settings = await storage.getSettings();
    const statusEl = document.getElementById('enhance-status');

    if (!settings.apiKey) {
      statusEl.className = 'enhance-status error';
      statusEl.textContent = msg('enhanceNoKey');
      statusEl.classList.remove('hidden');
      return;
    }

    statusEl.className = 'enhance-status loading';
    statusEl.textContent = msg('enhancing');
    statusEl.classList.remove('hidden');

    try {
      const response = await chrome.runtime.sendMessage({
        action: 'enhancePrompt',
        prompt: currentPrompt,
        apiKey: settings.apiKey,
        lang: promptLang,
        model: settings.model || 'gemini-2.5-flash'
      });

      if (response && response.success) {
        currentPrompt = response.enhanced;
        document.getElementById('generated-prompt').textContent = currentPrompt;
        statusEl.className = 'enhance-status success';
        const modelUsed = response.usedModel ? ` (${response.usedModel})` : '';
        statusEl.textContent = (currentLang === 'ru' ? 'Промпт улучшен!' :
                               currentLang === 'de' ? 'Prompt verbessert!' :
                               'Prompt enhanced!') + modelUsed;

        // Update history with enhanced version
        await storage.addToHistory({
          id: currentPromptId,
          category: selectedCategory,
          description: document.getElementById('task-description').value.trim(),
          prompt: currentPrompt,
          details: detailValues
        });
      } else {
        statusEl.className = 'enhance-status error';
        statusEl.textContent = response ? response.error : 'Unknown error';
      }
    } catch (e) {
      statusEl.className = 'enhance-status error';
      statusEl.textContent = e.message || 'Failed to enhance prompt';
    }

    setTimeout(() => statusEl.classList.add('hidden'), 5000);
  });

  // ==================== Reset ====================

  function resetBuilder() {
    currentStep = 1;
    selectedCategory = null;
    detailValues = {};
    currentPrompt = '';
    currentPromptId = null;

    document.getElementById('task-description').value = '';
    document.getElementById('task-context').value = '';
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));

    goToStep(1);
  }

  // ==================== History ====================

  async function renderHistory() {
    const history = await storage.getHistory();
    const container = document.getElementById('history-list');

    if (history.length === 0) {
      container.innerHTML = `<p class="empty-state">${msg('historyEmpty')}</p>`;
      return;
    }

    container.innerHTML = '';
    history.forEach(item => {
      container.appendChild(createPromptItem(item, 'history'));
    });
  }

  // ==================== Favorites ====================

  async function renderFavorites() {
    const favorites = await storage.getFavorites();
    const container = document.getElementById('favorites-list');

    if (favorites.length === 0) {
      container.innerHTML = `<p class="empty-state">${msg('favoritesEmpty')}</p>`;
      return;
    }

    container.innerHTML = '';
    favorites.forEach(item => {
      container.appendChild(createPromptItem(item, 'favorites'));
    });
  }

  // ==================== Prompt Item Component ====================

  function createPromptItem(item, source) {
    const div = document.createElement('div');
    div.className = 'prompt-item';

    const date = new Date(item.timestamp);
    const dateStr = date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' :
                                            currentLang === 'de' ? 'de-DE' : 'en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const categoryName = msg(`cat${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`) || item.category;
    const preview = item.prompt.substring(0, 120) + (item.prompt.length > 120 ? '...' : '');

    div.innerHTML = `
      <div class="prompt-item-header">
        <span class="prompt-item-category">${categoryName}</span>
        <span class="prompt-item-date">${dateStr}</span>
      </div>
      <div class="prompt-item-preview">${escapeHtml(preview)}</div>
      <div class="prompt-item-actions">
        <button class="prompt-item-btn copy-btn" title="${msg('btnCopy')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          ${msg('btnCopy')}
        </button>
        <button class="prompt-item-btn delete" title="${msg('deleteConfirm')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        </button>
      </div>
    `;

    // Copy
    div.querySelector('.copy-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(item.prompt);
      showToast(msg('btnCopied'));
    });

    // Delete
    div.querySelector('.delete').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (source === 'history') {
        await storage.removeFromHistory(item.id);
        renderHistory();
      } else {
        await storage.removeFromFavorites(item.id);
        renderFavorites();
      }
    });

    // Click to view full prompt
    div.addEventListener('click', () => {
      currentPrompt = item.prompt;
      currentPromptId = item.id;
      selectedCategory = item.category;
      document.getElementById('task-description').value = item.description || '';
      document.getElementById('generated-prompt').textContent = item.prompt;

      const favBtn = document.getElementById('btn-favorite');
      favBtn.classList.remove('favorited');

      showView('builder');
      goToStep(5);
    });

    return div;
  }

  // ==================== Settings ====================

  function loadSettingsUI() {
    document.getElementById('settings-lang').value = currentLang;
    document.getElementById('settings-prompt-lang').value = promptLang;
    storage.getSettings().then(s => {
      document.getElementById('settings-api-key').value = s.apiKey || '';
      document.getElementById('settings-model').value = s.model || 'gemini-2.0-flash';
    });
  }

  document.getElementById('btn-settings-save').addEventListener('click', async () => {
    const newLang = document.getElementById('settings-lang').value;
    const newPromptLang = document.getElementById('settings-prompt-lang').value;
    const apiKey = document.getElementById('settings-api-key').value.trim();
    const model = document.getElementById('settings-model').value;

    await storage.saveSettings({
      lang: newLang,
      promptLang: newPromptLang,
      apiKey,
      model
    });

    currentLang = newLang;
    promptLang = newPromptLang;

    await loadMessages(newLang);
    applyI18n();

    showToast(msg('settingsSaved'));
    showView(previousView);
  });

  document.getElementById('btn-settings-back').addEventListener('click', () => {
    showView(previousView);
  });

  // ==================== Toast ====================

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ==================== Utils ====================

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ==================== Update Check ====================

  document.getElementById('btn-check-update').addEventListener('click', async () => {
    const statusEl = document.getElementById('update-status');
    const btn = document.getElementById('btn-check-update');
    btn.disabled = true;

    statusEl.className = 'update-status loading';
    statusEl.textContent = msg('updateChecking');
    statusEl.classList.remove('hidden');

    try {
      const result = await chrome.runtime.sendMessage({ action: 'checkUpdate' });

      if (result.error) {
        statusEl.className = 'update-status error';
        statusEl.textContent = result.error;
      } else if (result.hasUpdate) {
        statusEl.className = 'update-status update-available';
        statusEl.innerHTML = `
          <strong>${msg('updateAvailable')} v${result.latestVersion}</strong>
          <a href="${result.downloadUrl}" target="_blank" class="update-download-link">
            ${msg('updateDownload')}
          </a>
        `;
      } else {
        statusEl.className = 'update-status success';
        statusEl.textContent = msg('updateLatest');
      }
    } catch (e) {
      statusEl.className = 'update-status error';
      statusEl.textContent = e.message || 'Failed to check for updates';
    }

    btn.disabled = false;
    setTimeout(() => {
      if (!statusEl.classList.contains('update-available')) {
        statusEl.classList.add('hidden');
      }
    }, 5000);
  });

  // ==================== API Key Banner ====================

  async function initApiKeyBanner() {
    const banner = document.getElementById('api-key-banner');
    if (!banner) return;

    const settings = await storage.getSettings();

    // Hide if API key is already set or banner was dismissed
    const dismissed = await new Promise(resolve => {
      chrome.storage.local.get('apiKeyBannerDismissed', (r) => resolve(r.apiKeyBannerDismissed));
    });

    if (settings.apiKey || dismissed) {
      banner.style.display = 'none';
      return;
    }

    document.getElementById('api-key-banner-dismiss').addEventListener('click', () => {
      banner.style.display = 'none';
      chrome.storage.local.set({ apiKeyBannerDismissed: true });
    });
  }

  initApiKeyBanner();

  // Initialize
  goToStep(1);
});
