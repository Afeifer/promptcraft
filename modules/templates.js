const PROMPT_TEMPLATES = {
  code: {
    role: {
      en: "You are an expert software developer with deep knowledge of {language} and {framework}.",
      ru: "Ты — опытный разработчик программного обеспечения с глубокими знаниями {language} и {framework}.",
      de: "Du bist ein erfahrener Softwareentwickler mit umfassenden Kenntnissen in {language} und {framework}."
    },
    task: {
      en: "Task: {description}",
      ru: "Задача: {description}",
      de: "Aufgabe: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Complexity level: {complexity}\n- Write clean, well-documented code\n- Include error handling\n- Follow best practices and design patterns",
      ru: "Требования:\n- Уровень сложности: {complexity}\n- Напиши чистый, хорошо документированный код\n- Включи обработку ошибок\n- Следуй лучшим практикам и паттернам проектирования",
      de: "Anforderungen:\n- Komplexitätsstufe: {complexity}\n- Schreibe sauberen, gut dokumentierten Code\n- Füge Fehlerbehandlung hinzu\n- Befolge Best Practices und Designmuster"
    },
    format: {
      en: "Output format: Provide the complete code with comments explaining key sections. If multiple files are needed, clearly separate them.",
      ru: "Формат вывода: Предоставь полный код с комментариями, объясняющими ключевые секции. Если нужно несколько файлов, чётко раздели их.",
      de: "Ausgabeformat: Stelle den vollständigen Code mit Kommentaren bereit, die die wichtigsten Abschnitte erklären. Wenn mehrere Dateien benötigt werden, trenne sie deutlich."
    },
    fields: [
      {
        id: "language",
        labelKey: "langCode",
        type: "pills",
        options: ["JavaScript", "Python", "TypeScript", "Java", "C#", "Go", "Rust", "PHP", "Swift", "Kotlin"]
      },
      {
        id: "framework",
        labelKey: "langFramework",
        type: "pills",
        options: ["React", "Vue", "Angular", "Node.js", "Django", "Flask", "Spring", "Laravel", "Next.js", "None"]
      },
      {
        id: "complexity",
        labelKey: "langComplexity",
        type: "pills",
        options: [
          { value: "beginner", labelKey: "complexityBeginner" },
          { value: "intermediate", labelKey: "complexityIntermediate" },
          { value: "advanced", labelKey: "complexityAdvanced" }
        ]
      }
    ]
  },

  text: {
    role: {
      en: "You are a skilled writer and content creator specializing in {tone} writing for {audience}.",
      ru: "Ты — опытный писатель и контент-мейкер, специализирующийся на {tone} текстах для {audience}.",
      de: "Du bist ein erfahrener Autor und Content-Creator, spezialisiert auf {tone} Texte für {audience}."
    },
    task: {
      en: "Task: {description}",
      ru: "Задача: {description}",
      de: "Aufgabe: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Tone: {tone}\n- Target audience: {audience}\n- Length: {length}\n- Make the text engaging, clear, and well-structured",
      ru: "Требования:\n- Тон: {tone}\n- Целевая аудитория: {audience}\n- Длина: {length}\n- Сделай текст увлекательным, чётким и хорошо структурированным",
      de: "Anforderungen:\n- Ton: {tone}\n- Zielgruppe: {audience}\n- Länge: {length}\n- Mache den Text ansprechend, klar und gut strukturiert"
    },
    format: {
      en: "Output format: Well-structured text with headings, subheadings, and paragraphs where appropriate.",
      ru: "Формат вывода: Хорошо структурированный текст с заголовками, подзаголовками и абзацами где уместно.",
      de: "Ausgabeformat: Gut strukturierter Text mit Überschriften, Unterüberschriften und Absätzen."
    },
    fields: [
      {
        id: "tone",
        labelKey: "textTone",
        type: "pills",
        options: [
          { value: "formal", labelKey: "toneFormal" },
          { value: "casual", labelKey: "toneCasual" },
          { value: "creative", labelKey: "toneCreative" },
          { value: "professional", labelKey: "toneProfessional" },
          { value: "academic", labelKey: "toneAcademic" }
        ]
      },
      {
        id: "audience",
        labelKey: "textAudience",
        type: "text",
        placeholder: "e.g., business professionals, students, general public"
      },
      {
        id: "length",
        labelKey: "textLength",
        type: "pills",
        options: [
          { value: "short", labelKey: "lengthShort" },
          { value: "medium", labelKey: "lengthMedium" },
          { value: "long", labelKey: "lengthLong" },
          { value: "detailed", labelKey: "lengthDetailed" }
        ]
      }
    ]
  },

  image: {
    role: {
      en: "You are a creative AI art director who crafts detailed, evocative image generation prompts.",
      ru: "Ты — креативный AI арт-директор, создающий детальные, образные промпты для генерации изображений.",
      de: "Du bist ein kreativer AI Art Director, der detaillierte, aussagekräftige Bildgenerierungs-Prompts erstellt."
    },
    task: {
      en: "Create a detailed image generation prompt for: {description}",
      ru: "Создай детальный промпт для генерации изображения: {description}",
      de: "Erstelle einen detaillierten Bildgenerierungs-Prompt für: {description}"
    },
    context: {
      en: "Additional context: {context}",
      ru: "Дополнительный контекст: {context}",
      de: "Zusätzlicher Kontext: {context}"
    },
    details: {
      en: "Style: {style}\nMood/Atmosphere: {mood}\nAspect ratio: {aspect}\n\nInclude details about:\n- Lighting and color palette\n- Composition and perspective\n- Textures and materials\n- Environment and background",
      ru: "Стиль: {style}\nНастроение/Атмосфера: {mood}\nСоотношение сторон: {aspect}\n\nВключи детали о:\n- Освещении и цветовой палитре\n- Композиции и перспективе\n- Текстурах и материалах\n- Окружении и фоне",
      de: "Stil: {style}\nStimmung/Atmosphäre: {mood}\nSeitenverhältnis: {aspect}\n\nFüge Details hinzu über:\n- Beleuchtung und Farbpalette\n- Komposition und Perspektive\n- Texturen und Materialien\n- Umgebung und Hintergrund"
    },
    format: {
      en: "Output: A single, detailed prompt ready to paste into Midjourney, DALL-E, or Stable Diffusion. Use comma-separated descriptors.",
      ru: "Вывод: Один детальный промпт, готовый для вставки в Midjourney, DALL-E или Stable Diffusion. Используй дескрипторы через запятую.",
      de: "Ausgabe: Ein einzelner, detaillierter Prompt, bereit zum Einfügen in Midjourney, DALL-E oder Stable Diffusion."
    },
    fields: [
      {
        id: "style",
        labelKey: "imageStyle",
        type: "pills",
        options: [
          { value: "photorealistic", labelKey: "stylePhotorealistic" },
          { value: "digital art", labelKey: "styleDigitalArt" },
          { value: "oil painting", labelKey: "styleOilPainting" },
          { value: "watercolor", labelKey: "styleWatercolor" },
          { value: "anime", labelKey: "styleAnime" },
          { value: "minimalist", labelKey: "styleMinimalist" },
          { value: "3D render", labelKey: "style3D" },
          { value: "sketch", labelKey: "styleSketch" }
        ]
      },
      {
        id: "mood",
        labelKey: "imageMood",
        type: "text",
        placeholder: "e.g., dramatic, peaceful, mysterious, vibrant"
      },
      {
        id: "aspect",
        labelKey: "imageAspect",
        type: "pills",
        options: ["1:1", "16:9", "9:16", "4:3", "3:2"]
      }
    ]
  },

  analysis: {
    role: {
      en: "You are a senior analyst with expertise in research, data interpretation, and structured analysis.",
      ru: "Ты — старший аналитик с опытом в исследованиях, интерпретации данных и структурированном анализе.",
      de: "Du bist ein erfahrener Analyst mit Expertise in Forschung, Dateninterpretation und strukturierter Analyse."
    },
    task: {
      en: "Task: {description}",
      ru: "Задача: {description}",
      de: "Aufgabe: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Analysis depth: {depth}\n- Output format: {format}\n- Provide data-driven insights\n- Include key findings, trends, and actionable recommendations",
      ru: "Требования:\n- Глубина анализа: {depth}\n- Формат вывода: {format}\n- Предоставь выводы на основе данных\n- Включи ключевые находки, тренды и практические рекомендации",
      de: "Anforderungen:\n- Analysetiefe: {depth}\n- Ausgabeformat: {format}\n- Liefere datengestützte Erkenntnisse\n- Füge wichtige Ergebnisse, Trends und umsetzbare Empfehlungen hinzu"
    },
    format: {
      en: "Structure your analysis with: Executive Summary, Key Findings, Detailed Analysis, and Recommendations.",
      ru: "Структурируй анализ: Краткое резюме, Ключевые находки, Детальный анализ, Рекомендации.",
      de: "Strukturiere die Analyse mit: Zusammenfassung, Wichtigste Ergebnisse, Detailanalyse, Empfehlungen."
    },
    fields: [
      {
        id: "depth",
        labelKey: "analysisDepth",
        type: "pills",
        options: [
          { value: "overview", labelKey: "depthOverview" },
          { value: "standard", labelKey: "depthStandard" },
          { value: "deep", labelKey: "depthDeep" }
        ]
      },
      {
        id: "format",
        labelKey: "analysisFormat",
        type: "pills",
        options: ["Report", "Table", "Bullet points", "SWOT", "Presentation"]
      }
    ]
  },

  translation: {
    role: {
      en: "You are a professional translator and linguist with expertise in nuanced, context-aware translation.",
      ru: "Ты — профессиональный переводчик и лингвист с опытом в нюансированном, контекстно-зависимом переводе.",
      de: "Du bist ein professioneller Übersetzer und Linguist mit Expertise in nuancierter, kontextbewusster Übersetzung."
    },
    task: {
      en: "Translate the following from {from} to {to}: {description}",
      ru: "Переведи следующее с {from} на {to}: {description}",
      de: "Übersetze Folgendes von {from} nach {to}: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Translation style: {style}\n- Preserve the original meaning, tone, and cultural nuances\n- Adapt idioms and expressions naturally\n- Maintain formatting and structure",
      ru: "Требования:\n- Стиль перевода: {style}\n- Сохрани оригинальный смысл, тон и культурные нюансы\n- Адаптируй идиомы и выражения естественно\n- Сохрани форматирование и структуру",
      de: "Anforderungen:\n- Übersetzungsstil: {style}\n- Bewahre die ursprüngliche Bedeutung, den Ton und kulturelle Nuancen\n- Passe Redewendungen natürlich an\n- Behalte Formatierung und Struktur bei"
    },
    format: {
      en: "Provide the translation followed by a brief note on any cultural adaptations made.",
      ru: "Предоставь перевод, а затем краткую заметку о сделанных культурных адаптациях.",
      de: "Liefere die Übersetzung, gefolgt von einer kurzen Anmerkung zu kulturellen Anpassungen."
    },
    fields: [
      {
        id: "from",
        labelKey: "transFrom",
        type: "pills",
        options: ["English", "Russian", "German", "French", "Spanish", "Chinese", "Japanese", "Arabic"]
      },
      {
        id: "to",
        labelKey: "transTo",
        type: "pills",
        options: ["English", "Russian", "German", "French", "Spanish", "Chinese", "Japanese", "Arabic"]
      },
      {
        id: "style",
        labelKey: "transStyle",
        type: "pills",
        options: [
          { value: "literal", labelKey: "toneFormal" },
          { value: "natural", labelKey: "toneCasual" },
          { value: "creative", labelKey: "toneCreative" },
          { value: "professional", labelKey: "toneProfessional" }
        ]
      }
    ]
  },

  learning: {
    role: {
      en: "You are an expert educator and tutor who explains complex topics clearly and engagingly.",
      ru: "Ты — опытный преподаватель и репетитор, который объясняет сложные темы понятно и увлекательно.",
      de: "Du bist ein erfahrener Pädagoge und Tutor, der komplexe Themen klar und ansprechend erklärt."
    },
    task: {
      en: "Explain/Teach: {description}",
      ru: "Объясни/Научи: {description}",
      de: "Erkläre/Unterrichte: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Student level: {level}\n- Teaching style: {style}\n- Use practical examples and analogies\n- Break down complex concepts into simple steps",
      ru: "Требования:\n- Уровень ученика: {level}\n- Стиль обучения: {style}\n- Используй практические примеры и аналогии\n- Разбей сложные концепции на простые шаги",
      de: "Anforderungen:\n- Schülerniveau: {level}\n- Lehrstil: {style}\n- Verwende praktische Beispiele und Analogien\n- Zerlege komplexe Konzepte in einfache Schritte"
    },
    format: {
      en: "Structure: Start with a brief overview, then explain step by step, include examples, and end with a summary and practice exercises.",
      ru: "Структура: Начни с краткого обзора, затем объясни пошагово, включи примеры и заверши резюме и практическими упражнениями.",
      de: "Struktur: Beginne mit einem kurzen Überblick, erkläre dann Schritt für Schritt, füge Beispiele hinzu und schließe mit einer Zusammenfassung und Übungsaufgaben."
    },
    fields: [
      {
        id: "level",
        labelKey: "learnLevel",
        type: "pills",
        options: [
          { value: "beginner", labelKey: "complexityBeginner" },
          { value: "intermediate", labelKey: "complexityIntermediate" },
          { value: "advanced", labelKey: "complexityAdvanced" }
        ]
      },
      {
        id: "style",
        labelKey: "learnStyle",
        type: "pills",
        options: ["Step-by-step", "Examples-first", "Theory + Practice", "Socratic", "Visual"]
      }
    ]
  },

  chat: {
    role: {
      en: "You are a helpful, knowledgeable assistant ready to have a productive conversation.",
      ru: "Ты — полезный, знающий ассистент, готовый к продуктивному разговору.",
      de: "Du bist ein hilfreicher, sachkundiger Assistent, bereit für ein produktives Gespräch."
    },
    task: {
      en: "{description}",
      ru: "{description}",
      de: "{description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Please be concise, accurate, and helpful. Ask clarifying questions if needed.",
      ru: "Будь кратким, точным и полезным. Задавай уточняющие вопросы при необходимости.",
      de: "Sei präzise, genau und hilfreich. Stelle bei Bedarf Rückfragen."
    },
    format: {
      en: "Respond in a conversational but informative tone.",
      ru: "Отвечай в разговорном, но информативном тоне.",
      de: "Antworte in einem gesprächigen, aber informativen Ton."
    },
    fields: []
  },

  other: {
    role: {
      en: "You are a versatile AI assistant capable of handling any task with expertise and creativity.",
      ru: "Ты — универсальный AI-ассистент, способный справиться с любой задачей экспертно и креативно.",
      de: "Du bist ein vielseitiger KI-Assistent, der jede Aufgabe mit Expertise und Kreativität bewältigt."
    },
    task: {
      en: "Task: {description}",
      ru: "Задача: {description}",
      de: "Aufgabe: {description}"
    },
    context: {
      en: "Context: {context}",
      ru: "Контекст: {context}",
      de: "Kontext: {context}"
    },
    details: {
      en: "Requirements:\n- Be thorough and precise\n- Provide actionable results\n- Structure your response clearly",
      ru: "Требования:\n- Будь тщательным и точным\n- Предоставь практические результаты\n- Структурируй ответ чётко",
      de: "Anforderungen:\n- Sei gründlich und präzise\n- Liefere umsetzbare Ergebnisse\n- Strukturiere deine Antwort klar"
    },
    format: {
      en: "Organize your response with clear sections and formatting.",
      ru: "Организуй ответ с чёткими секциями и форматированием.",
      de: "Organisiere deine Antwort mit klaren Abschnitten und Formatierung."
    },
    fields: []
  }
};
