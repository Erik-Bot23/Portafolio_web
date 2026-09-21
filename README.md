# Portafolio

Portafolio personal hecho con **Next.js 16** (App Router), **React**, **TypeScript** y **Tailwind CSS v4**.

Sección de landing con:

- **Sobre mí** — quién soy y qué busco (junior full stack: Spring Boot + Angular + React).
- **Proyectos** — los 3 proyectos (edita `src/data/projects.ts`).
- **Contacto** — email, GitHub y LinkedIn (edita `src/data/site.ts`).

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo -> http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build de producción
npm run lint       # ejecutar ESLint
```

## Estructura relevante

```
public/                  # archivos estáticos
src/
  app/
    layout.tsx           # layout raíz (metadata/SEO, fuentes, navbar, footer)
    page.tsx             # ruta "/"
    globals.css          # estilos globales + tokens de Tailwind (v4)
  components/            # Navbar, Hero, About, Projects, ProjectCard, Contact, Footer
  data/                  # site.ts (datos personales) · projects.ts (los 3 proyectos)
  fonts/                 # fuentes Geist auto-hospedadas (no dependen de Google Fonts)
docs/
  Portafolio-Guia-NextJS-Tailwind.pdf   # guía de estudio (Next.js, Tailwind, Angular vs Next, entrevistas)
  generate_pdf.py                        # script que regenera el PDF
```

## Personalizar

1. `src/data/site.ts` — tu nombre, rol, resumen, correo, GitHub, LinkedIn.
2. `src/data/projects.ts` — título, descripción, tecnologías y links de cada proyecto.
3. `src/app/globals.css` — color de acento y tokens (`--color-accent`).

> Nota: si Google Fonts está bloqueado desde tu red, el build fallará al descargarlas.
> Este proyecto ya las sirve auto-hospedadas desde `src/fonts/` con `next/font/local`.

## Desplegar

Opción recomendada: empuja el repositorio a GitHub y conecta el repo en [vercel.com](https://vercel.com).
Cada `git push` genera un deploy automático con HTTPS y dominio gratis.

Alternativa estática: activa `output: "export"` en `next.config.ts` y publica la carpeta `out/` en GitHub Pages o Netlify.