const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GITHUB_REPO = 'Afeifer/promptcraft';
const CURRENT_VERSION = '1.2.0';

const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' }
];

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 700,
    minWidth: 380,
    minHeight: 500,
    resizable: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'src', 'assets', 'icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ==================== IPC Handlers ====================

// Storage
ipcMain.handle('store-get', (event, key, defaultValue) => {
  return store.get(key, defaultValue);
});

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('store-delete', (event, key) => {
  store.delete(key);
  return true;
});

// Clipboard
ipcMain.handle('clipboard-write', (event, text) => {
  clipboard.writeText(text);
  return true;
});

// Enhance prompt with Gemini
ipcMain.handle('enhance-prompt', async (event, { prompt, apiKey, lang, model }) => {
  try {
    const result = await enhanceWithFallback(prompt, apiKey, lang, model);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Check for updates
ipcMain.handle('check-update', async () => {
  try {
    const result = await checkForUpdates();
    return result;
  } catch (error) {
    return { hasUpdate: false, error: error.message };
  }
});

// Get app version
ipcMain.handle('get-version', () => {
  return CURRENT_VERSION;
});

// ==================== Gemini API ====================

async function enhanceWithFallback(prompt, apiKey, lang, preferredModel) {
  const modelOrder = buildModelOrder(preferredModel);
  let lastError = null;

  for (const modelId of modelOrder) {
    try {
      const result = await callGemini(prompt, apiKey, lang, modelId);
      return { ...result, usedModel: modelId };
    } catch (error) {
      lastError = error;
      if (isQuotaError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error('All models unavailable');
}

function buildModelOrder(preferredModel) {
  const allIds = AVAILABLE_MODELS.map(m => m.id);
  if (!preferredModel || !allIds.includes(preferredModel)) {
    return allIds;
  }
  return [preferredModel, ...allIds.filter(id => id !== preferredModel)];
}

function isQuotaError(error) {
  const msg = error.message || '';
  return msg.includes('quota') || msg.includes('Quota') ||
         msg.includes('rate') || msg.includes('429') ||
         msg.includes('limit');
}

async function callGemini(prompt, apiKey, lang, modelId) {
  const systemInstructions = {
    en: `You are an expert prompt engineer. Your task is to enhance and improve the given prompt to get better results from AI models.\n\nRules:\n- Keep the original intent and all specified requirements\n- Add more specific details, context, and constraints where helpful\n- Improve the structure and clarity\n- Add role-specific expertise details\n- Make the prompt more actionable and precise\n- Do NOT add unnecessary fluff or filler text\n- Return ONLY the improved prompt, no explanations or meta-commentary`,
    ru: `Ты — эксперт в промпт-инжиниринге. Твоя задача — улучшить данный промпт для получения лучших результатов от AI-моделей.\n\nПравила:\n- Сохрани оригинальное намерение и все указанные требования\n- Добавь более конкретные детали, контекст и ограничения где полезно\n- Улучши структуру и ясность\n- Добавь детали экспертизы, специфичные для роли\n- Сделай промпт более практичным и точным\n- НЕ добавляй лишний текст или воду\n- Верни ТОЛЬКО улучшенный промпт, без объяснений или мета-комментариев`,
    de: `Du bist ein Experte für Prompt Engineering. Deine Aufgabe ist es, den gegebenen Prompt zu verbessern, um bessere Ergebnisse von AI-Modellen zu erzielen.\n\nRegeln:\n- Bewahre die ursprüngliche Absicht und alle angegebenen Anforderungen\n- Füge spezifischere Details, Kontext und Einschränkungen hinzu\n- Verbessere die Struktur und Klarheit\n- Füge rollenspezifische Expertise-Details hinzu\n- Mache den Prompt praktischer und präziser\n- Füge KEINEN unnötigen Fülltext hinzu\n- Gib NUR den verbesserten Prompt zurück, keine Erklärungen`
  };

  const systemPrompt = systemInstructions[lang] || systemInstructions.en;
  const url = `${GEMINI_BASE_URL}/${modelId}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const errorMessage = error?.error?.message || `API error: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!enhanced) {
    throw new Error('No response from Gemini API');
  }

  return { success: true, enhanced: enhanced.trim() };
}

// ==================== Update Check ====================

async function checkForUpdates() {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
  );

  if (!response.ok) {
    throw new Error('Failed to check for updates');
  }

  const release = await response.json();
  const latestVersion = release.tag_name.replace(/^v/, '');
  const hasUpdate = compareVersions(latestVersion, CURRENT_VERSION) > 0;

  return {
    hasUpdate,
    currentVersion: CURRENT_VERSION,
    latestVersion,
    downloadUrl: release.html_url
  };
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}
