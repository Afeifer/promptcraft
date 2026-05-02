// Content script for future integration with ChatGPT, Claude, etc.
// This will allow direct prompt insertion into AI chat interfaces.
// For MVP, this is a placeholder for future functionality.

(function() {
  'use strict';

  // Listen for messages from the popup/background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'insertPrompt') {
      insertPromptIntoChat(request.prompt);
      sendResponse({ success: true });
    }
    return true;
  });

  function insertPromptIntoChat(prompt) {
    // Try common chat input selectors
    const selectors = [
      // ChatGPT
      'textarea[data-id="root"]',
      '#prompt-textarea',
      'div[contenteditable="true"][data-placeholder]',
      // Claude
      'div.ProseMirror[contenteditable="true"]',
      // Gemini
      'div[contenteditable="true"].ql-editor',
      // Generic
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
        return;
      }
    }
  }
})();
