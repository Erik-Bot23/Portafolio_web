# AGENTS.md

Contexto del repositorio para leer en cualquier equipo y retomar el proyecto sin perder tiempo.

## Qué es este proyecto

Portafolio personal (landing de una sola página) para presentar tres proyectos:

1. **Sistema de Pedidos (microservicios)** — Spring Boot + Angular + PostgreSQL.
2. **Página para mi novia** — HTML + CSS + JavaScript.
3. **Automatización en Python** — script pequeño de scripting.

La web en sí está hecha con **Next.js 16 (App Router) + React + TypeScript + Tailwind CSS v4**.

## Stack y versiones

| Tecnología | Versión |
|---|---|
| Next.js | 16.3.5 |
| React | 19.2.8 |
| Tailwind CSS | 4.3.3 (configuración CSS-first, sin `tailwind.config.ts`) |
| TypeScript | 5.x |
| ESLint | 9.x (config `eslint.config.mjs`) |
| Node requerido | 18.18+ (probado con Node 22) |

> La instalación de `create-next-app` puede dejar `@next/swc-win32-x64-msvc` corrupto si se interrumpe.
> Si el build falla con "not a valid Win32 application", reinstala: `npm i @next/swc-win32-x64-msvc@16.3.5 --save-optional`.

## Estructura del proyecto

```
public/                  # archivos estáticos
src/
  app/
    layout.tsx           # layout raíz: metadata/SEO, fuentes, navbar + footer
    page.tsx             # ruta "/" (compone las secciones)
    globals.css          # estilos globales + tokens Tailwind (@theme)
  components/            # Navbar, Hero, About, Projects, ProjectCard, Contact, Footer
  data/                  # site.ts (datos personales) · projects.ts (los 3 proyectos)
  fonts/                 # Geist y Geist Mono self-hosted (next/font/local)
docs/
  Portafolio-Guia-NextJS-Tailwind.pdf   # guía de estudio (11 páginas)
  generate_pdf.py                        # script Python que regenera el PDF
```

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo -> http://localhost:3000
npm run build      # build de producción
npm run start      # servir build de producción
npm run lint       # ESLint
python docs/generate_pdf.py   # regenerar el PDF de la guía
```

## Convenciones del código

- **Comentarios en español** en todo el código: explican el "porqué", no solo el "qué".
- **Datos centralizados**: toda la información personal/proyectos vive en `src/data/` (site.ts y projects.ts). La UI solo los importa.
- **Server Components por defecto**; `"use client"` solo donde hay estado o eventos (Navbar).
- **Tailwind v4**: tokens en `@theme` dentro de `globals.css` (accent, surface, border).
- **Fuentes self-hosted**: `next/font/local` con WOFF2 en `src/fonts/`. NO usar `next/font/google` (Google Fonts está bloqueada desde la red local y rompería el build).
- **Lint estricto**: textos con `//` dentro de JSX deben ir como expresión `{"// Título"}` para no disparar `react/jsx-no-comment-textnodes`.

## Cómo personalizar (puertas de edición)

1. `src/data/site.ts` → nombre, rol, resumen, email, GitHub, LinkedIn.
2. `src/data/projects.ts` → los 3 proyectos: título, descripción, tecnologías, `github` y `demo` (usa `undefined` para ocultar un enlace; `featured: true` resalta la card).
3. `src/app/globals.css` → `--color-accent` cambia el color del tema.

## Despliegue

- **Opción A (recomendada)**: subir a GitHub y conectar el repo en Vercel. Deploy automático por push, HTTPS y dominio gratis.
- **Opción B (estático)**: activar `output: "export"` en `next.config.ts` y publicar `out/` en GitHub Pages o Netlify.

## Notas de contexto

- El directorio que contiene este proyecto fue inicializado como repo git en el *home* del usuario (sin commits). Para desplegar, conviene crear un repo nuevo solo para el portafolio.
- La guía PDF documenta Next.js/Tailwind desde cero, la comparativa Angular vs Next.js (incluye la duda de `ng g service`) y 18 preguntas de entrevista. Es buena referencia para responder en procesos de selección.

## Para el desarrollador (cómo tomar el proyecto)

1. Clonar/copiar la carpeta, ejecutar `npm install` y `npm run dev`.
2. Sustituir datos personales en `src/data/`.
3. Editar descripciones de proyectos con lo que realmente hiciste y aprendiste.
4. Agregar los links reales de GitHub/demo en `projects.ts`.
5. Desplegar en Vercel.