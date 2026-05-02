const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhancePrompt') {
    enhancePrompt(request.prompt, request.apiKey, request.lang)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function enhancePrompt(prompt, apiKey, lang) {
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

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
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
