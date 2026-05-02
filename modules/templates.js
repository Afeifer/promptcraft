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
      en: "You are a professional photographer and AI art director with expertise in lighting, composition, and visual storytelling. You craft highly detailed, technically precise image generation prompts optimized for {platform}.",
      ru: "Ты — профессиональный фотограф и AI арт-директор с экспертизой в освещении, композиции и визуальном сторителлинге. Ты создаёшь высокодетализированные, технически точные промпты для генерации изображений, оптимизированные для {platform}.",
      de: "Du bist ein professioneller Fotograf und AI Art Director mit Expertise in Beleuchtung, Komposition und visuellem Storytelling. Du erstellst hochdetaillierte, technisch präzise Bildgenerierungs-Prompts, optimiert für {platform}."
    },
    task: {
      en: "Create a professional-grade image generation prompt for {platform}: {description}",
      ru: "Создай промпт профессионального уровня для {platform}: {description}",
      de: "Erstelle einen professionellen Bildgenerierungs-Prompt für {platform}: {description}"
    },
    context: {
      en: "Additional context: {context}",
      ru: "Дополнительный контекст: {context}",
      de: "Zusätzlicher Kontext: {context}"
    },
    details: {
      en: "Target platform: {platform}\nCamera/Lens: {camera}\nVisual style: {style}\nMood/Atmosphere: {mood}\nAspect ratio: {aspect}\n\nMulti-layer composition:\n- Foreground: describe foreground elements (bokeh, objects, framing)\n- Midground: main subject placement and details\n- Background: environment, depth, atmospheric perspective\n\nPhotography specifications:\n- Lighting: {lighting} (include color temperature, e.g., 5600K)\n- Light direction: {lightDir}\n- Camera angle: {angle}\n- Focal length/Lens: {focal}\n- Composition: {composition}\n\nColor palette: specify dominant colors, tonal contrast, and color grading\nNegative prompt: {negativePrompt}\n\nInclude in the prompt:\n- Precise color palette and color temperature\n- Depth of field, aperture (e.g., f/2.0), ISO, and focus point\n- Textures, materials, and surface details\n- Film stock simulation (e.g., Kodak Portra 400, Fuji Velvia)\n- Post-processing style (cinematic color grading, film grain, bloom, etc.)\n- Quality tags: ultra-realistic, 8k, high detail",
      ru: "Целевая платформа: {platform}\nКамера/Объектив: {camera}\nВизуальный стиль: {style}\nНастроение/Атмосфера: {mood}\nСоотношение сторон: {aspect}\n\nМногослойная композиция:\n- Передний план: элементы переднего плана (боке, объекты, обрамление)\n- Средний план: размещение главного объекта и детали\n- Задний план: окружение, глубина, воздушная перспектива\n\nФотографические параметры:\n- Освещение: {lighting} (включи цветовую температуру, напр. 5600K)\n- Направление света: {lightDir}\n- Ракурс камеры: {angle}\n- Фокусное расстояние/Объектив: {focal}\n- Композиция: {composition}\n\nЦветовая палитра: укажи доминирующие цвета, тональный контраст и цветокоррекцию\nNegative prompt: {negativePrompt}\n\nВключи в промпт:\n- Точную цветовую палитру и цветовую температуру\n- Глубину резкости, диафрагму (напр. f/2.0), ISO и точку фокуса\n- Текстуры, материалы и детали поверхностей\n- Симуляцию фотоплёнки (напр. Kodak Portra 400, Fuji Velvia)\n- Стиль постобработки (кинематографическая цветокоррекция, зернистость плёнки, bloom и т.д.)\n- Теги качества: ultra-realistic, 8k, high detail",
      de: "Zielplattform: {platform}\nKamera/Objektiv: {camera}\nVisueller Stil: {style}\nStimmung/Atmosphäre: {mood}\nSeitenverhältnis: {aspect}\n\nMehrschichtige Komposition:\n- Vordergrund: Vordergrund-Elemente (Bokeh, Objekte, Rahmung)\n- Mittelgrund: Platzierung und Details des Hauptmotivs\n- Hintergrund: Umgebung, Tiefe, atmosphärische Perspektive\n\nFotografie-Spezifikationen:\n- Beleuchtung: {lighting} (inkl. Farbtemperatur, z.B. 5600K)\n- Lichtrichtung: {lightDir}\n- Kamerawinkel: {angle}\n- Brennweite/Objektiv: {focal}\n- Komposition: {composition}\n\nFarbpalette: dominante Farben, Tonkontrast und Farbkorrektur angeben\nNegative Prompt: {negativePrompt}\n\nFüge in den Prompt ein:\n- Präzise Farbpalette und Farbtemperatur\n- Schärfentiefe, Blende (z.B. f/2.0), ISO und Fokuspunkt\n- Texturen, Materialien und Oberflächendetails\n- Filmsimulation (z.B. Kodak Portra 400, Fuji Velvia)\n- Nachbearbeitungsstil (cineastische Farbkorrektur, Filmkorn, Bloom usw.)\n- Qualitäts-Tags: ultra-realistic, 8k, high detail"
    },
    format: {
      en: "Output: A single, professional prompt optimized for {platform}. Use the platform's native syntax and parameters. Structure with multi-layer composition ([Foreground], [Midground], [Background]), then [Lighting & Color], [Technical], and end with negative prompt (--no for Midjourney, Negative prompt: for SD).",
      ru: "Вывод: Один профессиональный промпт, оптимизированный для {platform}. Используй нативный синтаксис платформы. Структурируй с многослойной композицией ([Передний план], [Средний план], [Задний план]), затем [Свет и Цвет], [Технические параметры], и в конце negative prompt.",
      de: "Ausgabe: Ein einzelner, professioneller Prompt optimiert für {platform}. Verwende die native Syntax der Plattform. Strukturiere mit Mehrschicht-Komposition ([Vordergrund], [Mittelgrund], [Hintergrund]), dann [Licht & Farbe], [Technik], und am Ende Negative Prompt."
    },
    fields: [
      {
        id: "platform",
        labelKey: "imagePlatform",
        type: "pills",
        options: [
          { value: "Midjourney v7", labelKey: "platMidjourney" },
          { value: "DALL-E 3+", labelKey: "platDalle" },
          { value: "Flux 2 Pro", labelKey: "platFlux" },
          { value: "Stable Diffusion 3.5", labelKey: "platSD" },
          { value: "Adobe Firefly", labelKey: "platFirefly" },
          { value: "Leonardo AI", labelKey: "platLeonardo" },
          { value: "Ideogram 2.0", labelKey: "platIdeogram" },
          { value: "Krea AI", labelKey: "platKrea" },
          { value: "Imagen 3", labelKey: "platImagen" },
          { value: "SenseNova U1", labelKey: "platSenseNova" }
        ]
      },
      {
        id: "camera",
        labelKey: "imageCamera",
        type: "pills",
        options: [
          { value: "Canon EOS R5, 85mm f/1.4", labelKey: "camCanon85" },
          { value: "Sony A7R V, 35mm f/1.4", labelKey: "camSony35" },
          { value: "Nikon Z9, 50mm f/1.2", labelKey: "camNikon50" },
          { value: "Hasselblad X2D, 90mm f/2.5", labelKey: "camHasselblad" },
          { value: "iPhone 16 Pro", labelKey: "camIphone" },
          { value: "ARRI Alexa LF, 85mm f/2.8", labelKey: "camArri" }
        ]
      },
      {
        id: "style",
        labelKey: "imageStyle",
        type: "pills",
        options: [
          { value: "photorealistic", labelKey: "stylePhotorealistic" },
          { value: "cinematic editorial", labelKey: "styleCinematic" },
          { value: "fashion editorial", labelKey: "styleFashion" },
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
        id: "lighting",
        labelKey: "imageLighting",
        type: "pills",
        options: [
          { value: "natural light 5600K", labelKey: "lightNatural" },
          { value: "studio lighting", labelKey: "lightStudio" },
          { value: "golden hour 3200K", labelKey: "lightGoldenHour" },
          { value: "dramatic chiaroscuro", labelKey: "lightDramatic" },
          { value: "soft diffused high-key", labelKey: "lightSoft" },
          { value: "neon/RGB cyberpunk", labelKey: "lightNeon" },
          { value: "cinematic rim light", labelKey: "lightRim" }
        ]
      },
      {
        id: "lightDir",
        labelKey: "imageLightDir",
        type: "pills",
        options: [
          { value: "front lighting", labelKey: "lightDirFront" },
          { value: "side lighting", labelKey: "lightDirSide" },
          { value: "backlighting", labelKey: "lightDirBack" },
          { value: "top-down lighting", labelKey: "lightDirTop" },
          { value: "Rembrandt lighting", labelKey: "lightDirRembrandt" }
        ]
      },
      {
        id: "angle",
        labelKey: "imageAngle",
        type: "pills",
        options: [
          { value: "low angle from ground level", labelKey: "angleLow" },
          { value: "eye level", labelKey: "angleEye" },
          { value: "high angle", labelKey: "angleHigh" },
          { value: "bird's eye view", labelKey: "angleBird" },
          { value: "dutch angle", labelKey: "angleDutch" },
          { value: "macro close-up", labelKey: "angleMacro" }
        ]
      },
      {
        id: "focal",
        labelKey: "imageFocal",
        type: "pills",
        options: [
          { value: "wide angle 14-35mm", labelKey: "focalWide" },
          { value: "standard 50mm", labelKey: "focalStandard" },
          { value: "portrait 85mm", labelKey: "focalPortrait" },
          { value: "telephoto 200mm+", labelKey: "focalTele" }
        ]
      },
      {
        id: "composition",
        labelKey: "imageComposition",
        type: "pills",
        options: [
          { value: "rule of thirds", labelKey: "compRuleOfThirds" },
          { value: "centered composition", labelKey: "compCentered" },
          { value: "leading lines", labelKey: "compLeadingLines" },
          { value: "symmetry", labelKey: "compSymmetry" },
          { value: "negative space", labelKey: "compNegativeSpace" },
          { value: "three-layer depth", labelKey: "compThreeLayer" }
        ]
      },
      {
        id: "mood",
        labelKey: "imageMood",
        type: "pills",
        options: [
          { value: "dramatic cinematic", labelKey: "moodDramatic" },
          { value: "peaceful serene", labelKey: "moodPeaceful" },
          { value: "mysterious dark", labelKey: "moodMysterious" },
          { value: "vibrant colorful", labelKey: "moodVibrant" },
          { value: "nostalgic vintage", labelKey: "moodNostalgic" },
          { value: "futuristic cyberpunk", labelKey: "moodFuturistic" },
          { value: "romantic soft glow", labelKey: "moodRomantic" },
          { value: "epic heroic", labelKey: "moodEpic" },
          { value: "minimalist clean", labelKey: "moodMinimalist" },
          { value: "horror eerie", labelKey: "moodHorror" }
        ]
      },
      {
        id: "negativePrompt",
        labelKey: "imageNegative",
        type: "text",
        placeholder: "e.g., flat lighting, distorted faces, blurry, low quality"
      },
      {
        id: "aspect",
        labelKey: "imageAspect",
        type: "pills",
        options: ["1:1", "16:9", "9:16", "4:3", "3:2", "2:3"]
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

  video: {
    role: {
      en: "You are a professional cinematographer and video production expert with deep knowledge of camera movement, visual storytelling, pacing, and AI video generation. You create highly detailed, technically precise video generation prompts optimized for {videoPlatform}.",
      ru: "Ты — профессиональный кинематографист и эксперт по видеопроизводству с глубокими знаниями движения камеры, визуального сторителлинга, ритма и AI-генерации видео. Ты создаёшь высокодетализированные, технически точные промпты для генерации видео, оптимизированные для {videoPlatform}.",
      de: "Du bist ein professioneller Kameramann und Videoproduktionsexperte mit tiefem Wissen über Kamerabewegung, visuelles Storytelling, Pacing und AI-Videogenerierung. Du erstellst hochdetaillierte, technisch präzise Videogenerierungs-Prompts, optimiert für {videoPlatform}."
    },
    task: {
      en: "Create a professional video generation prompt for {videoPlatform}: {description}",
      ru: "Создай профессиональный промпт для генерации видео в {videoPlatform}: {description}",
      de: "Erstelle einen professionellen Videogenerierungs-Prompt für {videoPlatform}: {description}"
    },
    context: {
      en: "Additional context: {context}",
      ru: "Дополнительный контекст: {context}",
      de: "Zusätzlicher Kontext: {context}"
    },
    details: {
      en: "Target platform: {videoPlatform}\nVideo type: {videoType}\nDuration: {duration}\nAspect ratio: {videoAspect}\n\nScene description:\n- Setting/Environment: describe the location, time of day, weather\n- Subject: main character/object, their appearance, clothing, expression\n- Action/Motion: what happens in the scene, character movement\n\nCinematography:\n- Camera movement: {cameraMove}\n- Camera angle: {videoAngle}\n- Shot type: {shotType}\n- Pacing/Speed: {pacing}\n\nVisual specifications:\n- Lighting: {videoLighting}\n- Color grading and mood: {videoMood}\n- Textures and atmosphere\n- Depth of field and focus transitions\n- VFX elements if any (particles, lens flares, volumetric light)\n\nAudio cues (if supported): ambient sound, music style, voiceover tone\n\nQuality: cinematic, 4K, high detail, smooth motion, professional production value",
      ru: "Целевая платформа: {videoPlatform}\nТип видео: {videoType}\nДлительность: {duration}\nСоотношение сторон: {videoAspect}\n\nОписание сцены:\n- Место/Окружение: опиши локацию, время суток, погоду\n- Субъект: главный персонаж/объект, внешность, одежда, выражение\n- Действие/Движение: что происходит в сцене, движение персонажа\n\nКинематография:\n- Движение камеры: {cameraMove}\n- Ракурс камеры: {videoAngle}\n- Тип кадра: {shotType}\n- Темп/Скорость: {pacing}\n\nВизуальные параметры:\n- Освещение: {videoLighting}\n- Цветокоррекция и настроение: {videoMood}\n- Текстуры и атмосфера\n- Глубина резкости и переходы фокуса\n- VFX-элементы при необходимости (частицы, блики, объёмный свет)\n\nЗвуковые подсказки (если поддерживается): эмбиент, стиль музыки, тон голоса\n\nКачество: кинематографичное, 4K, высокая детализация, плавное движение, профессиональный уровень",
      de: "Zielplattform: {videoPlatform}\nVideotyp: {videoType}\nDauer: {duration}\nSeitenverhältnis: {videoAspect}\n\nSzenenbeschreibung:\n- Ort/Umgebung: Beschreibe den Standort, Tageszeit, Wetter\n- Subjekt: Hauptfigur/-objekt, Aussehen, Kleidung, Ausdruck\n- Aktion/Bewegung: was in der Szene passiert, Figurenbewegung\n\nKinematografie:\n- Kamerabewegung: {cameraMove}\n- Kamerawinkel: {videoAngle}\n- Einstellungsgröße: {shotType}\n- Tempo/Geschwindigkeit: {pacing}\n\nVisuelle Spezifikationen:\n- Beleuchtung: {videoLighting}\n- Farbkorrektur und Stimmung: {videoMood}\n- Texturen und Atmosphäre\n- Schärfentiefe und Fokusübergänge\n- VFX-Elemente (Partikel, Lens Flares, volumetrisches Licht)\n\nAudio-Hinweise (falls unterstützt): Ambient-Sound, Musikstil, Voiceover-Ton\n\nQualität: cineastisch, 4K, hohe Detailtreue, flüssige Bewegung, professionelle Produktionsqualität"
    },
    format: {
      en: "Output: A single, ready-to-use video generation prompt optimized for {videoPlatform}. Describe the complete scene in vivid detail — environment, subject, action, camera work, lighting, mood, and pacing. Write as one continuous, flowing prompt that reads like a film director's shot description.",
      ru: "Вывод: Один готовый промпт для генерации видео, оптимизированный для {videoPlatform}. Опиши полную сцену в ярких деталях — окружение, субъект, действие, работу камеры, свет, настроение и темп. Пиши как одно непрерывное, плавное описание, как режиссёрская раскадровка.",
      de: "Ausgabe: Ein einzelner, gebrauchsfertiger Videogenerierungs-Prompt, optimiert für {videoPlatform}. Beschreibe die komplette Szene in lebhaften Details — Umgebung, Subjekt, Aktion, Kameraarbeit, Beleuchtung, Stimmung und Pacing. Schreibe als eine zusammenhängende Beschreibung wie eine Regieanweisung."
    },
    fields: [
      {
        id: "videoPlatform",
        labelKey: "videoPlatform",
        type: "pills",
        options: [
          { value: "Sora", labelKey: "vidPlatSora" },
          { value: "Veo 3", labelKey: "vidPlatVeo" },
          { value: "Kling 3.0", labelKey: "vidPlatKling" },
          { value: "Runway Gen-4", labelKey: "vidPlatRunway" },
          { value: "Pika 2.1", labelKey: "vidPlatPika" },
          { value: "Luma Dream Machine", labelKey: "vidPlatLuma" },
          { value: "Seedance 2.0", labelKey: "vidPlatSeedance" },
          { value: "Hailuo AI", labelKey: "vidPlatHailuo" },
          { value: "HeyGen", labelKey: "vidPlatHeyGen" },
          { value: "Synthesia", labelKey: "vidPlatSynthesia" }
        ]
      },
      {
        id: "videoType",
        labelKey: "videoType",
        type: "pills",
        options: [
          { value: "cinematic", labelKey: "vidTypeCinematic" },
          { value: "commercial/ad", labelKey: "vidTypeCommercial" },
          { value: "music video", labelKey: "vidTypeMusicVideo" },
          { value: "documentary", labelKey: "vidTypeDocumentary" },
          { value: "animation", labelKey: "vidTypeAnimation" },
          { value: "social media (Reels/TikTok)", labelKey: "vidTypeSocial" },
          { value: "product showcase", labelKey: "vidTypeProduct" },
          { value: "tutorial/explainer", labelKey: "vidTypeTutorial" }
        ]
      },
      {
        id: "cameraMove",
        labelKey: "videoCameraMove",
        type: "pills",
        options: [
          { value: "static tripod", labelKey: "camMoveStatic" },
          { value: "slow dolly in", labelKey: "camMoveDolly" },
          { value: "tracking/follow", labelKey: "camMoveTracking" },
          { value: "orbit/360°", labelKey: "camMoveOrbit" },
          { value: "crane up/down", labelKey: "camMoveCrane" },
          { value: "handheld", labelKey: "camMoveHandheld" },
          { value: "drone aerial", labelKey: "camMoveDrone" },
          { value: "zoom in/out", labelKey: "camMoveZoom" }
        ]
      },
      {
        id: "videoAngle",
        labelKey: "videoAngle",
        type: "pills",
        options: [
          { value: "low angle", labelKey: "angleLow" },
          { value: "eye level", labelKey: "angleEye" },
          { value: "high angle", labelKey: "angleHigh" },
          { value: "bird's eye", labelKey: "angleBird" },
          { value: "worm's eye", labelKey: "angleWorm" }
        ]
      },
      {
        id: "shotType",
        labelKey: "videoShotType",
        type: "pills",
        options: [
          { value: "extreme close-up", labelKey: "shotECU" },
          { value: "close-up", labelKey: "shotCU" },
          { value: "medium shot", labelKey: "shotMedium" },
          { value: "full body", labelKey: "shotFull" },
          { value: "wide/establishing", labelKey: "shotWide" }
        ]
      },
      {
        id: "videoLighting",
        labelKey: "videoLighting",
        type: "pills",
        options: [
          { value: "natural daylight", labelKey: "vidLightDay" },
          { value: "golden hour", labelKey: "vidLightGolden" },
          { value: "blue hour/twilight", labelKey: "vidLightBlue" },
          { value: "studio three-point", labelKey: "vidLightStudio" },
          { value: "neon city lights", labelKey: "vidLightNeon" },
          { value: "candlelight/warm", labelKey: "vidLightCandle" },
          { value: "volumetric fog", labelKey: "vidLightFog" }
        ]
      },
      {
        id: "pacing",
        labelKey: "videoPacing",
        type: "pills",
        options: [
          { value: "slow motion", labelKey: "paceSlow" },
          { value: "normal speed", labelKey: "paceNormal" },
          { value: "fast/dynamic", labelKey: "paceFast" },
          { value: "time-lapse", labelKey: "paceTimelapse" },
          { value: "hyperlapse", labelKey: "paceHyperlapse" }
        ]
      },
      {
        id: "videoMood",
        labelKey: "videoMood",
        type: "pills",
        options: [
          { value: "epic cinematic", labelKey: "moodEpic" },
          { value: "dreamy ethereal", labelKey: "moodDreamy" },
          { value: "intense dramatic", labelKey: "moodDramatic" },
          { value: "nostalgic warm film", labelKey: "moodNostalgic" },
          { value: "futuristic neon", labelKey: "moodFuturistic" },
          { value: "dark moody", labelKey: "moodDark" },
          { value: "bright vibrant", labelKey: "moodVibrant" },
          { value: "romantic pastel", labelKey: "moodRomantic" },
          { value: "horror cold tones", labelKey: "moodHorror" },
          { value: "documentary natural", labelKey: "moodDocumentary" }
        ]
      },
      {
        id: "duration",
        labelKey: "videoDuration",
        type: "pills",
        options: [
          { value: "3-5 seconds", labelKey: "dur5s" },
          { value: "10 seconds", labelKey: "dur10s" },
          { value: "15-30 seconds", labelKey: "dur30s" },
          { value: "60 seconds", labelKey: "dur60s" }
        ]
      },
      {
        id: "videoAspect",
        labelKey: "videoAspect",
        type: "pills",
        options: ["16:9", "9:16", "1:1", "4:3", "21:9"]
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

  pinterest: {
    role: {
      en: "You are a Pinterest marketing expert and SEO specialist who creates viral pin content that drives maximum engagement and traffic.",
      ru: "Ты — эксперт по маркетингу в Pinterest и SEO-специалист, создающий вирусный контент для пинов, который привлекает максимальное вовлечение и трафик.",
      de: "Du bist ein Pinterest-Marketing-Experte und SEO-Spezialist, der virale Pin-Inhalte erstellt, die maximales Engagement und Traffic erzeugen."
    },
    task: {
      en: "Create a complete Pinterest pin package for the topic: {description}\n\nYou must provide ALL of the following:\n\n1. **TOPIC ANALYSIS** (2-3 sentences): Briefly analyze the topic — what makes it trending, who is the target audience, what search intent exists.\n\n2. **SEO TITLE** (max 100 characters): A compelling, keyword-rich title optimized for Pinterest search. Use power words that drive clicks.\n\n3. **PIN DESCRIPTION** (150-300 characters): An engaging description that includes:\n   - 2-3 relevant keywords naturally woven in\n   - A clear value proposition or call-to-action\n   - 5-10 relevant hashtags at the end (e.g., #PinterestTips #DIY #HomeDecor)\n\n4. **IMAGE PROMPT**: A detailed, professional prompt for generating the pin image, including:\n   - Exact visual composition and layout\n   - Color palette and mood\n   - Typography placement suggestions (where to put overlay text)\n   - Lighting direction and quality (e.g., soft natural light from upper-left, golden hour backlight)\n   - Camera angle and perspective (e.g., flat lay from above, 45° angle, eye-level)\n   - Depth of field and focus points\n   - Style reference (e.g., editorial photography, lifestyle flat lay, infographic)\n   - Aspect ratio: 2:3 (standard Pinterest ratio 1000x1500px)",
      ru: "Создай полный пакет для Pinterest пина на тему: {description}\n\nТы должен предоставить ВСЁ из следующего:\n\n1. **АНАЛИЗ ТЕМЫ** (2-3 предложения): Кратко проанализируй тему — что делает её трендовой, кто целевая аудитория, какой поисковый запрос существует.\n\n2. **SEO ЗАГОЛОВОК** (макс. 100 символов): Привлекательный, насыщенный ключевыми словами заголовок, оптимизированный для поиска в Pinterest. Используй сильные слова.\n\n3. **ОПИСАНИЕ ПИНА** (150-300 символов): Вовлекающее описание, которое включает:\n   - 2-3 релевантных ключевых слова, естественно вплетённых в текст\n   - Чёткое ценностное предложение или призыв к действию\n   - 5-10 релевантных хэштегов в конце (например, #Pinterest #DIY #Декор)\n\n4. **ПРОМПТ ДЛЯ ИЗОБРАЖЕНИЯ**: Детальный профессиональный промпт для генерации изображения пина, включая:\n   - Точную визуальную композицию и раскладку\n   - Цветовую палитру и настроение\n   - Предложения по размещению текста (где наложить текст)\n   - Направление и качество освещения (например, мягкий естественный свет слева сверху, контровой свет золотого часа)\n   - Ракурс и перспективу камеры (например, плоская раскладка сверху, угол 45°, на уровне глаз)\n   - Глубину резкости и точки фокуса\n   - Стилистическую референс (например, редакционная фотография, лайфстайл, инфографика)\n   - Соотношение сторон: 2:3 (стандарт Pinterest 1000x1500px)",
      de: "Erstelle ein komplettes Pinterest-Pin-Paket zum Thema: {description}\n\nDu musst ALLES Folgende bereitstellen:\n\n1. **THEMENANALYSE** (2-3 Sätze): Analysiere kurz das Thema — was es zum Trend macht, wer die Zielgruppe ist, welche Suchabsicht existiert.\n\n2. **SEO-TITEL** (max. 100 Zeichen): Ein überzeugender, keyword-reicher Titel, optimiert für die Pinterest-Suche. Verwende Powerwörter.\n\n3. **PIN-BESCHREIBUNG** (150-300 Zeichen): Eine ansprechende Beschreibung mit:\n   - 2-3 relevante Keywords natürlich eingebaut\n   - Klares Wertversprechen oder Call-to-Action\n   - 5-10 relevante Hashtags am Ende (z.B. #Pinterest #DIY #HomeDecor)\n\n4. **BILD-PROMPT**: Ein detaillierter, professioneller Prompt zur Generierung des Pin-Bildes, einschließlich:\n   - Exakte visuelle Komposition und Layout\n   - Farbpalette und Stimmung\n   - Typografie-Platzierung (wo Overlay-Text platziert werden soll)\n   - Lichtrichtung und -qualität (z.B. weiches natürliches Licht von oben links, Golden-Hour-Gegenlicht)\n   - Kamerawinkel und Perspektive (z.B. Flat Lay von oben, 45°-Winkel, Augenhöhe)\n   - Schärfentiefe und Fokuspunkte\n   - Stilreferenz (z.B. redaktionelle Fotografie, Lifestyle, Infografik)\n   - Seitenverhältnis: 2:3 (Pinterest-Standard 1000x1500px)"
    },
    context: {
      en: "Niche/Industry: {niche}\nAdditional context: {context}",
      ru: "Ниша/Отрасль: {niche}\nДополнительный контекст: {context}",
      de: "Nische/Branche: {niche}\nZusätzlicher Kontext: {context}"
    },
    details: {
      en: "Pin style: {pinStyle}\nTarget audience: {audience}\nSeason/Trend: {season}\nImage generation: {pinImageGen}",
      ru: "Стиль пина: {pinStyle}\nЦелевая аудитория: {audience}\nСезон/Тренд: {season}\nГенерация изображения: {pinImageGen}",
      de: "Pin-Stil: {pinStyle}\nZielgruppe: {audience}\nSaison/Trend: {season}\nBildgenerierung: {pinImageGen}"
    },
    format: {
      en: "Format your response with clear sections: TOPIC ANALYSIS, SEO TITLE, PIN DESCRIPTION (with hashtags), and IMAGE PROMPT. Make each section immediately actionable — the user should be able to copy-paste each part directly. If Ideogram 2.0 is selected, optimize the IMAGE PROMPT specifically for Ideogram — include precise text overlay instructions with exact wording, font style, placement coordinates, and text hierarchy. Ideogram excels at rendering text on images.",
      ru: "Оформи ответ с чёткими секциями: АНАЛИЗ ТЕМЫ, SEO ЗАГОЛОВОК, ОПИСАНИЕ ПИНА (с хэштегами) и ПРОМПТ ДЛЯ ИЗОБРАЖЕНИЯ. Каждая секция должна быть готова к использованию. Если выбран Ideogram 2.0, оптимизируй ПРОМПТ ДЛЯ ИЗОБРАЖЕНИЯ специально для Ideogram — включи точные инструкции по наложению текста: точный текст, стиль шрифта, расположение и иерархию текста. Ideogram отлично рендерит текст на изображениях.",
      de: "Formatiere die Antwort mit klaren Abschnitten: THEMENANALYSE, SEO-TITEL, PIN-BESCHREIBUNG (mit Hashtags) und BILD-PROMPT. Jeder Abschnitt soll sofort nutzbar sein. Wenn Ideogram 2.0 ausgewählt ist, optimiere den BILD-PROMPT speziell für Ideogram — füge präzise Text-Overlay-Anweisungen mit genauem Wortlaut, Schriftstil, Platzierung und Texthierarchie ein. Ideogram eignet sich hervorragend zum Rendern von Text auf Bildern."
    },
    fields: [
      {
        id: "niche",
        labelKey: "pinNiche",
        type: "text",
        placeholder: "e.g., home decor, fitness, recipes, travel"
      },
      {
        id: "pinStyle",
        labelKey: "pinStyle",
        type: "pills",
        options: [
          { value: "lifestyle photo", labelKey: "pinStyleLifestyle" },
          { value: "infographic", labelKey: "pinStyleInfographic" },
          { value: "step-by-step", labelKey: "pinStyleStepByStep" },
          { value: "quote/text overlay", labelKey: "pinStyleQuote" },
          { value: "product showcase", labelKey: "pinStyleProduct" },
          { value: "before/after", labelKey: "pinStyleBeforeAfter" }
        ]
      },
      {
        id: "pinImageGen",
        labelKey: "pinImageGen",
        type: "pills",
        options: [
          { value: "Ideogram 2.0 (best for text on images)", labelKey: "pinIdeogram" },
          { value: "Midjourney v7", labelKey: "platMidjourney" },
          { value: "DALL-E 3+", labelKey: "platDalle" },
          { value: "Flux 2 Pro", labelKey: "platFlux" },
          { value: "any platform", labelKey: "pinAnyPlatform" }
        ]
      },
      {
        id: "audience",
        labelKey: "pinAudience",
        type: "text",
        placeholder: "e.g., women 25-45, DIY enthusiasts, entrepreneurs"
      },
      {
        id: "season",
        labelKey: "pinSeason",
        type: "pills",
        options: [
          { value: "evergreen", labelKey: "pinSeasonEvergreen" },
          { value: "spring", labelKey: "pinSeasonSpring" },
          { value: "summer", labelKey: "pinSeasonSummer" },
          { value: "autumn", labelKey: "pinSeasonAutumn" },
          { value: "winter", labelKey: "pinSeasonWinter" },
          { value: "holiday", labelKey: "pinSeasonHoliday" }
        ]
      }
    ]
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
