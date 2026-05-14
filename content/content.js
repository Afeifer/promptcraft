/**
 * PromptCraft Content Script
 *
 * Injected into AI chat interfaces (ChatGPT, Claude, Gemini, Copilot)
 * to enable direct prompt insertion from the extension's side panel.
 *
 * Listens for 'insertPrompt' messages from popup/background scripts
 * and pastes the prompt text into the active chat input field.
 *
 * Supported platforms:
 *  - ChatGPT (chat.openai.com, chatgpt.com)
 *  - Claude (claude.ai)
 *  - Gemini (gemini.google.com)
 *  - Microsoft Copilot (copilot.microsoft.com)
 */
(function() {
  'use strict';

  // Listen for messages from the popup/background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'insertPrompt') {
      const success = insertPromptIntoChat(request.prompt);
      sendResponse({ success });
    }
    return true;
  });

  /**
   * Attempt to insert a prompt into the active AI chat input field.
   * Tries multiple selectors for different platforms.
   *
   * @param {string} prompt - The prompt text to insert.
   * @returns {boolean} - Whether insertion was successful.
   */
  function insertPromptIntoChat(prompt) {
    // Selectors ordered from most specific to generic
    const selectors = [
      // ChatGPT
      'textarea[data-id="root"]',
      '#prompt-textarea',
      'div[contenteditable="true"][data-placeholder]',
      // Claude
      'div.ProseMirror[contenteditable="true"]',
      // Gemini
      'div[contenteditable="true"].ql-editor',
      // Generic fallbacks
      'textarea',
      '[contenteditable="true"]'
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) {
        if (el.tagName === 'TEXTAREA') {
          el.value = prompt;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          el.textContent = prompt;
          el.dispatchEvent(new InputEvent('input', { bubbles: true }));
        }
        el.focus();
        return true;
      }
    }

    console.warn('[PromptCraft] No chat input field found on this page.');
    return false;
  }
})();
