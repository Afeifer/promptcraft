const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GITHUB_REPO = 'Afeifer/promptcraft';
const CURRENT_VERSION = '1.2.0';

const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' }
];

// Open Side Panel when clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhancePrompt') {
    enhanceWithFallback(request.prompt, request.apiKey, request.lang, request.model)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.action === 'checkUpdate') {
    checkForUpdates()
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ hasUpdate: false, error: error.message }));
    return true;
  }

  if (request.action === 'getModels') {
    sendResponse({ models: AVAILABLE_MODELS });
    return false;
  }
});

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
    en: `You are an expert prompt engineer. Your task is to enhance and improve the given prompt to get better results from AI models.

Rules:
- Keep the original intent and all specified requirements
- Add more specific details, context, and constraints where helpful
- Improve the structure and clarity
- Add role-specific expertise details
- Make the prompt more actionable and precise
- Do NOT add unnecessary fluff or filler text
- Return ONLY the improved prompt, no explanations or meta-commentary`,
    ru: `Ты — эксперт в промпт-инжиниринге. Твоя задача — улучшить данный промпт для получения лучших результатов от AI-моделей.

Правила:
- Сохрани оригинальное намерение и все указанные требования
- Добавь более конкретные детали, контекст и ограничения где полезно
- Улучши структуру и ясность
- Добавь детали экспертизы, специфичные для роли
- Сделай промпт более практичным и точным
- НЕ добавляй лишний текст или воду
- Верни ТОЛЬКО улучшенный промпт, без объяснений или мета-комментариев`,
    de: `Du bist ein Experte für Prompt Engineering. Deine Aufgabe ist es, den gegebenen Prompt zu verbessern, um bessere Ergebnisse von AI-Modellen zu erzielen.

Regeln:
- Bewahre die ursprüngliche Absicht und alle angegebenen Anforderungen
- Füge spezifischere Details, Kontext und Einschränkungen hinzu
- Verbessere die Struktur und Klarheit
- Füge rollenspezifische Expertise-Details hinzu
- Mache den Prompt praktischer und präziser
- Füge KEINEN unnötigen Fülltext hinzu
- Gib NUR den verbesserten Prompt zurück, keine Erklärungen`
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

async function checkForUpdates() {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/manifest.json`,
    { headers: { 'Accept': 'application/vnd.github.v3.raw' } }
  );

  if (!response.ok) {
    throw new Error('Failed to check for updates');
  }

  const manifest = await response.json();
  const latestVersion = manifest.version;

  const hasUpdate = compareVersions(latestVersion, CURRENT_VERSION) > 0;

  return {
    hasUpdate,
    currentVersion: CURRENT_VERSION,
    latestVersion,
    downloadUrl: `https://github.com/${GITHUB_REPO}/archive/refs/heads/init.zip`
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
