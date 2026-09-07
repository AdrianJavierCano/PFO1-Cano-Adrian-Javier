# PFO1 — Landing de portafolio personal

Landing de presentación personal desarrollada para la materia **Desarrollo de Sistemas Web (Front End)**, IFTS29, 2do cuatrimestre 2026.

- **Autor:** Adrian Javier Cano
- **GitHub:** https://github.com/AdrianJavierCano
- **URL de Vercel:** https://pfo-1-cano-adrian-javier.vercel.app/

## Descripción

La landing presenta mi perfil (nombre, presentación, habilidades), una sección personal a elección con mis proyectos de IA y ciberseguridad, y un formulario de contacto. Estética "dark tech" inspirada en terminales y dashboards de ciberseguridad: tipografía monoespaciada, fondo de red animado en canvas, y un bloque de terminal con efecto de tipeo.

## Decisiones tomadas

- **Estructura semántica:** `header` (con `nav` y el hero), `main` con las secciones (`sobre-mi`, `habilidades`, `proyectos`, `contacto`) y `footer`.
- **Tipografía:** Google Fonts — JetBrains Mono (display/datos) e IBM Plex Sans (cuerpo de texto), IBM Plex Mono para etiquetas.
- **Layout:** Flexbox para nav y listas de habilidades/canales; CSS Grid para la sección "sobre mí" y la grilla de proyectos (`auto-fit`), con breakpoints responsive.
- **Animación:** efecto de tipeo (typewriter) en la terminal del hero, fondo de red de nodos animado en `<canvas>`, transiciones en hover de tarjetas y botones. Se respeta `prefers-reduced-motion`.
- **Formulario:** campos con `label` asociado (`nombre`, `email`, `mensaje`), validación nativa HTML5 y confirmación por JavaScript (sin backend).
- **GitHub:** enlace visible en el nav (desktop) y en el footer, con `target="_blank"` y `rel="noopener noreferrer"`.
- **Imagen de perfil:** `<img>` con `alt` descriptivo; si `assets/foto.jpg` no está presente, se muestra un placeholder (no rompe el layout).

## Declaración de uso de IA

- **Herramienta usada:** Claude (Anthropic), plan **gratuito (Free)**.
- **Para qué se usó:** generación del HTML/CSS/JS de la landing a partir de mis datos reales (nombre, bio, proyectos, contacto), y de este README.
- **Experiencia previa con la herramienta:** uso frecuente/regular de Claude y otras IAs generativas (ChatGPT, Gemini, DeepSeek, Grok) en proyectos personales previos.
- **Qué revisé/adapté con criterio propio:** definí el contenido real (datos personales, proyectos, contacto), el enfoque estético (dark tech / ciberseguridad) y los requisitos técnicos de la consigna que debía cumplir; ajusté la estructura para que fuera semánticamente correcta y verifiqué que el formulario tuviera `label` asociado a cada campo antes de darlo por terminado.

## Estructura del proyecto

```
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── foto.jpg 
└── README.md
```

## Cómo correrlo localmente

Abrir `index.html` directamente en el navegador, o servirlo con cualquier servidor estático (por ejemplo `npx serve .`).
