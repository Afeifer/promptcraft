class PromptGenerator {
  constructor() {
    this.templates = PROMPT_TEMPLATES;
  }

  generate(data) {
    const { category, description, details, context, promptLang } = data;
    const lang = promptLang || 'en';
    const template = this.templates[category];

    if (!template) {
      return description;
    }

    const parts = [];

    const role = this.fillTemplate(template.role[lang] || template.role.en, details);
    if (role) parts.push(role);

    const task = this.fillTemplate(template.task[lang] || template.task.en, { ...details, description });
    if (task) parts.push(task);

    if (context && context.trim()) {
      const ctx = this.fillTemplate(template.context[lang] || template.context.en, { ...details, context });
      parts.push(ctx);
    }

    const det = this.fillTemplate(template.details[lang] || template.details.en, details);
    if (det) parts.push(det);

    const format = template.format[lang] || template.format.en;
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
