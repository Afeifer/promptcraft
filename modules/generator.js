class PromptGenerator {
  constructor() {
    this.templates = PROMPT_TEMPLATES;
  }

  // Categories where prompts are always generated in English
  // (AI image/video generators work best with English prompts)
  static ENGLISH_ONLY_CATEGORIES = ['image', 'video'];

  // Categories that support LLM-specific formatting
  static LLM_CATEGORIES = ['code', 'text', 'analysis', 'learning', 'chat'];

  // LLM-specific formatting strategies
  static LLM_FORMATS = {
    chatgpt: {
      name: 'ChatGPT (GPT-4o)',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`[System]\n${role}`);
        parts.push(`[User]\n${task}`);
        if (context) parts.push(context);
        if (details) parts.push(details);
        if (format) parts.push(format);
        parts.push('Use markdown formatting for better readability. Think step by step when needed.');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    claude: {
      name: 'Claude (Sonnet/Opus)',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`<role>\n${role}\n</role>`);
        parts.push(`<task>\n${task}\n</task>`);
        if (context) parts.push(`<context>\n${context}\n</context>`);
        if (details) parts.push(`<requirements>\n${details}\n</requirements>`);
        if (format) parts.push(`<output_format>\n${format}\n</output_format>`);
        parts.push('<instructions>\nThink through this carefully. Provide a thorough, well-structured response. Use artifacts for code blocks when appropriate.\n</instructions>');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    gemini: {
      name: 'Gemini',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`**Role:** ${role}`);
        parts.push(`**Task:** ${task}`);
        if (context) parts.push(`**Context:** ${context}`);
        if (details) parts.push(`**Details:**\n${details}`);
        if (format) parts.push(`**Output Format:** ${format}`);
        parts.push('Provide a comprehensive and well-organized response. Use structured formatting.');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    deepseek: {
      name: 'DeepSeek',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(role);
        parts.push(task);
        if (context) parts.push(context);
        if (details) parts.push(details);
        if (format) parts.push(format);
        parts.push('Think step by step. Show your reasoning process clearly before giving the final answer. For code tasks, consider edge cases and optimize for performance.');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    llama: {
      name: 'Llama (Meta)',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n${role}<|eot_id|>`);
        let userContent = task;
        if (context) userContent += `\n\n${context}`;
        if (details) userContent += `\n\n${details}`;
        if (format) userContent += `\n\n${format}`;
        parts.push(`<|start_header_id|>user<|end_header_id|>\n${userContent}<|eot_id|>`);
        parts.push(`<|start_header_id|>assistant<|end_header_id|>`);
        return parts.join('\n');
      }
    },
    grok: {
      name: 'Grok (xAI)',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`System: ${role}`);
        parts.push(`User: ${task}`);
        if (context) parts.push(context);
        if (details) parts.push(details);
        if (format) parts.push(format);
        parts.push('Be direct, precise, and thorough. Provide actionable results with real-world applicability.');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    mistral: {
      name: 'Mistral',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`[INST] ${role}\n\n${task}`);
        if (context) parts.push(context);
        if (details) parts.push(details);
        if (format) parts.push(format);
        parts.push('Be efficient and precise. Prioritize clarity and correctness. [/INST]');
        return parts.filter(Boolean).join('\n\n');
      }
    },
    copilot: {
      name: 'Microsoft Copilot',
      wrap(role, task, context, details, format) {
        const parts = [];
        parts.push(`# Role\n${role}`);
        parts.push(`# Task\n${task}`);
        if (context) parts.push(`# Context\n${context}`);
        if (details) parts.push(`# Requirements\n${details}`);
        if (format) parts.push(`# Output Format\n${format}`);
        parts.push('# Instructions\nProvide a well-structured, detailed response. Use headings and bullet points for clarity.');
        return parts.filter(Boolean).join('\n\n');
      }
    }
  };

  generate(data) {
    const { category, description, details, context, promptLang } = data;
    const lang = PromptGenerator.ENGLISH_ONLY_CATEGORIES.includes(category) ? 'en' : (promptLang || 'en');
    const template = this.templates[category];

    if (!template) {
      return description;
    }

    const role = this.fillTemplate(template.role[lang] || template.role.en, details);
    const task = this.fillTemplate(template.task[lang] || template.task.en, { ...details, description });

    let ctx = '';
    if (context && context.trim()) {
      ctx = this.fillTemplate(template.context[lang] || template.context.en, { ...details, context });
    }

    const det = this.fillTemplate(template.details[lang] || template.details.en, details);
    const format = template.format[lang] || template.format.en;

    const targetLLM = details && details.targetLLM;
    if (targetLLM && PromptGenerator.LLM_CATEGORIES.includes(category) && PromptGenerator.LLM_FORMATS[targetLLM]) {
      return PromptGenerator.LLM_FORMATS[targetLLM].wrap(role, task, ctx, det, format);
    }

    const parts = [];
    if (role) parts.push(role);
    if (task) parts.push(task);
    if (ctx) parts.push(ctx);
    if (det) parts.push(det);
    if (format) parts.push(format);

    return parts.join('\n\n');
  }

  fillTemplate(templateStr, data) {
    if (!templateStr) return '';

    return templateStr.replace(/\{(\w+)\}/g, (match, key) => {
      const val = data[key];
      if (val === undefined || val === null || val === '') {
        return match;
      }
      return val;
    });
  }

  getFieldsForCategory(category) {
    const template = this.templates[category];
    return template ? template.fields : [];
  }
}
