# -*- coding: utf-8 -*-
"""
generate_pdf.py
---------------
Genera docs/Portafolio-Guia-NextJS-Tailwind.pdf

Contenido del PDF:
  1)  Portada + índice
  2)  Next.js desde lo más básico hasta lo técnico
  3)  Tailwind CSS desde lo más básico hasta lo técnico
  4)  Comparativa Angular vs Next.js (con CLI)
  5)  Preguntas de entrevista sobre Next.js
  6)  Cheatsheet de comandos

Uso:
    python generate_pdf.py
"""

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer,
    Table, TableStyle, PageBreak, Preformatted
)
from reportlab.platypus.tableofcontents import TableOfContents

# ---------------------------------------------------------------------------
# 0. Estilos tipográficos
# ---------------------------------------------------------------------------
PAGE_W, PAGE_H = A4
MARGIN = 1.8 * cm
CONTENT_W = PAGE_W - 2 * MARGIN

ACCENT = colors.HexColor("#0f766e")
ACCENT_LIGHT = colors.HexColor("#ecfdf5")
CODE_BG = colors.HexColor("#f1f5f9")
CODE_BORDER = colors.HexColor("#cbd5e1")
TEXT = colors.HexColor("#1e293b")
MUTED = colors.HexColor("#64748b")
TABLE_HEADER_BG = colors.HexColor("#0f766e")
TABLE_HEADER_TEXT = colors.white


def make_styles():
    s = {}
    s["portada_titulo"] = ParagraphStyle(
        "portada_titulo", fontName="Helvetica-Bold", fontSize=26, leading=34,
        textColor=ACCENT, alignment=TA_CENTER, spaceAfter=10)
    s["portada_sub"] = ParagraphStyle(
        "portada_sub", fontName="Helvetica", fontSize=13, leading=19,
        textColor=TEXT, alignment=TA_CENTER, spaceAfter=4)
    s["portada_meta"] = ParagraphStyle(
        "portada_meta", fontName="Helvetica-Oblique", fontSize=9, leading=13,
        textColor=MUTED, alignment=TA_CENTER)
    s["H1"] = ParagraphStyle(
        "H1", fontName="Helvetica-Bold", fontSize=18, leading=24,
        textColor=ACCENT, spaceBefore=14, spaceAfter=8, keepWithNext=1)
    s["H2"] = ParagraphStyle(
        "H2", fontName="Helvetica-Bold", fontSize=13, leading=18,
        textColor=TEXT, spaceBefore=12, spaceAfter=5, keepWithNext=1)
    s["H3"] = ParagraphStyle(
        "H3", fontName="Helvetica-Bold", fontSize=11, leading=15,
        textColor=MUTED, spaceBefore=8, spaceAfter=3, keepWithNext=1)
    s["body"] = ParagraphStyle(
        "body", fontName="Helvetica", fontSize=9.5, leading=14.5,
        textColor=TEXT, alignment=TA_LEFT, spaceAfter=5)
    s["bullet"] = ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=9.5, leading=14,
        textColor=TEXT, leftIndent=12, bulletIndent=2, spaceAfter=2.5)
    s["code"] = ParagraphStyle(
        "code", fontName="Courier", fontSize=8.3, leading=11.5,
        textColor=colors.HexColor("#0f172a"))
    s["table_cell"] = ParagraphStyle(
        "table_cell", fontName="Helvetica", fontSize=8.6, leading=11.5,
        textColor=TEXT)
    s["table_header"] = ParagraphStyle(
        "table_header", fontName="Helvetica-Bold", fontSize=8.8,
        leading=11.8, textColor=TABLE_HEADER_TEXT)
    s["qa"] = ParagraphStyle(
        "qa", fontName="Helvetica-Bold", fontSize=10, leading=15,
        textColor=colors.HexColor("#b45309"), spaceBefore=10, spaceAfter=3)
    return s


ST = make_styles()

# ---------------------------------------------------------------------------
# 1. Helpers para construir el documento
# ---------------------------------------------------------------------------

def h1(text):    return Paragraph(text, ST["H1"])
def h2(text):    return Paragraph(text, ST["H2"])
def h3(text):    return Paragraph(text, ST["H3"])
def p(text):     return Paragraph(text, ST["body"])


def bullets(items):
    return [Paragraph("&bull;&nbsp;&nbsp;" + it, ST["bullet"]) for it in items]


def code(text, size=8.3):
    """Bloque de código con fondo y borde (usa Courier)."""
    style = ParagraphStyle(
        "code_inline", fontName="Courier", fontSize=size, leading=size * 1.45,
        textColor=colors.HexColor("#0f172a"))
    body = Preformatted(text.replace("\t", "    "), style)
    t = Table([[body]], colWidths=[CONTENT_W - 12])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CODE_BG),
        ("BOX", (0, 0), (-1, -1), 0.6, CODE_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def btext(text):
    """Texto con fuente mono corto (código en línea)."""
    return Paragraph(text, ST["code"])


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def table(rows, col_widths, header=True):
    """Convierte una lista de filas (listas de strings) en una tabla.

    Las celdas se escapan como texto plano (por eso no admiten marcas HTML).
    Si la celda empieza por 'ng ', 'npm ', 'npx ' o 'next ' se dibuja en
    fuente mono Courier (parece un comando/código).
    """
    data = []
    for i, row in enumerate(rows):
        line = []
        for cell in row:
            text = str(cell)
            if header and i == 0:
                line.append(Paragraph(escape(text), ST["table_header"]))
            elif text.startswith(("ng ", "npm ", "npx ", "next ")):
                line.append(btext(escape(text)))
            else:
                line.append(Paragraph(escape(text), ST["table_cell"]))
        data.append(line)

    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0)
    style_cmds = [
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
    ]
    if header:
        style_cmds.append(("BACKGROUND", (0, 0), (-1, 0), TABLE_HEADER_BG))
        style_cmds.append(("ROWBACKGROUNDS", (0, 1), (-1, -1),
                           [colors.white, ACCENT_LIGHT]))
    t.setStyle(TableStyle(style_cmds))
    return t


# ---------------------------------------------------------------------------
# 2. Plantillas de página (encabezado/pie y numeración)
# ---------------------------------------------------------------------------
def on_page(canvas, doc):
    canvas.saveState()
    # Encabezado
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, PAGE_H - 1.1 * cm, "Portafolio - Guía Next.js + Tailwind")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 1.1 * cm, "v1.0")
    canvas.setStrokeColor(colors.HexColor("#e2e8f0"))
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, PAGE_H - 1.3 * cm, PAGE_W - MARGIN, PAGE_H - 1.3 * cm)
    # Pie y número de página
    canvas.line(MARGIN, 1.25 * cm, PAGE_W - MARGIN, 1.25 * cm)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(PAGE_W / 2, 0.85 * cm, "Página %d" % doc.page)
    canvas.restoreState()


class Doc(BaseDocTemplate):
    def __init__(self, filename, **kw):
        super().__init__(filename, pagesize=A4,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=1.6 * cm, bottomMargin=1.6 * cm, **kw)
        frame = Frame(MARGIN, 1.6 * cm, CONTENT_W, PAGE_H - 3.2 * cm, id="F")
        self.addPageTemplates([PageTemplate(id="P", frames=[frame], onPage=on_page)])

    def afterFlowable(self, flowable):
        """Registra H1/H2 en el índice."""
        if isinstance(flowable, Paragraph):
            style_name = flowable.style.name
            if style_name in ("H1", "H2"):
                level = 0 if style_name == "H1" else 1
                text = flowable.getPlainText()
                key = "h-%s" % (style_name + text)
                self.canv.bookmarkPage(key)
                self.canv.addOutlineEntry(text, key, level=level, closed=False)
                self.notify("TOCEntry", (level, text, self.page))


# ---------------------------------------------------------------------------
# 3. Contenido
# ---------------------------------------------------------------------------
def build_story():
    S = []

    # ---------------------- PORTADA ----------------------
    S.append(Spacer(1, 2.3 * cm))
    S.append(Paragraph("<font color='#10b981'>PORTFOLIO</font> + GUÍA DE ESTUDIO", ST["portada_titulo"]))
    S.append(Spacer(1, 0.4 * cm))
    S.append(Paragraph("Next.js &amp; Tailwind CSS", ST["portada_titulo"]))
    S.append(Spacer(1, 1.1 * cm))
    S.append(Paragraph("De lo más básico a lo más técnico, con comparativa con Angular", ST["portada_sub"]))
    S.append(Paragraph("y preguntas frecuentes de entrevistas", ST["portada_sub"]))
    S.append(Spacer(1, 2.6 * cm))
    S.append(table([
        ["Documento de aprendizaje para el portafolio personal"],
        ["Autor: Desarrollador Junior Full Stack (Spring Boot + Angular + React/Next)"],
        ["Estructura: 5 partes + cheatsheet de comandos"],
    ], [CONTENT_W], header=False))
    S.append(Spacer(1, 2.4 * cm))
    S.append(Paragraph("Generado con Python + ReportLab", ST["portada_meta"]))
    S.append(PageBreak())

    # ---------------------- ÍNDICE ----------------------
    S.append(h1("Índice"))
    S.append(toc)
    S.append(PageBreak())

    # ======================================================================
    # PARTE 1: NEXT.JS
    # ======================================================================
    S.append(h1("1. Next.js: de lo básico a lo técnico"))

    S.append(h2("1.1 ¿Qué es Next.js?"))
    S.append(p(
        "Next.js es un <b>framework de React</b> creado y mantenido por Vercel. Sobre React "
        "añade un conjunto de decisiones <i>opiniadas</i> para que una aplicación no la armes "
        "pieza a pieza: <b>enrutado</b>, <b>renderizado en servidor</b>, <b>optimización de "
        "imágenes</b>, <b>SEO</b>, <b>API interna</b> (rutas de servidor) y <b>despliegue</b> "
        "listo para producción."))
    S.append(p(
        "Se le llama <b>framework full-stack</b> porque con un solo proyecto puedes crear tanto "
        "la interfaz (React) como el servidor (API route handlers, server actions), igual que tu "
        "proyecto de Spring Boot + Angular, pero con React en lugar de Angular y Node en lugar "
        "de Java."))

    S.append(h2("1.2 Requisitos y primeros pasos"))
    S.append(code("""# Requisitos mínimos: Node.js 18.18+ y npm (es una app de JavaScript, no necesitas instalar nada más)
node --version   # verifica tu versión de Node

# Crear un proyecto nuevo (equivalente a "ng new")
npx create-next-app@latest mi-portafolio

# Responde las preguntas: TypeScript, ESLint, Tailwind, App Router, src dir
# Comandos que usas todos los días:
npm run dev      # servidor de desarrollo (equivalente a "ng serve")  -> http://localhost:3000
npm run build    # build de producción (equivalente a "ng build")
npm run start    # sirve el build de producción
npm run lint     # ejecuta ESLint (equivalente a "ng lint")"""))

    S.append(h2("1.3 Estructura de carpetas (App Router)"))
    S.append(p(
        "A diferencia de Angular (con src/app/modules, services, etc.), Next.js fija las "
        "<b>convenciones de archivos</b>. La carpeta <font name='Courier'>src/app/</font> define "
        "las rutas del sitio: cada <font name='Courier'>page.tsx</font> es una página."))
    S.append(code("""mi-portafolio/
  public/                  # archivos estáticos (logo, favicon, imágenes)
  src/
    app/
      layout.tsx           # layout raíz: envuelve TODAS las páginas
      page.tsx             # la ruta "/"
      globals.css          # estilos globales (aquí se importa Tailwind)
      about/page.tsx       # la ruta "/about"
      api/route.ts         # una ruta de API (Route Handler)
    components/            # tus componentes de React (Navbar, Hero, ProjectCard...)
    data/                  # datos que centralizas (projects.ts, site.ts)
    lib/                   # lógica de negocio: "servicios" (funciones y helpers)
  package.json
  next.config.ts
  tsconfig.json""", 7.8))
    S.append(p(
        "No hay un CLI que genere estos archivos (como <font name='Courier'>ng g component</font>). "
        "El 'generador' de Next.js es la <b>estructura de carpetas y archivos con nombres "
        "convencionales</b>: <font name='Courier'>page.tsx</font>, "
        "<font name='Courier'>layout.tsx</font>, <font name='Courier'>route.ts</font>, "
        "<font name='Courier'>loading.tsx</font>, <font name='Courier'>error.tsx</font>, "
        "<font name='Courier'>not-found.tsx</font>."))

    S.append(h2("1.4 Componentes: Server vs Client"))
    S.append(p(
        "Es la idea más importante del App Router. Por defecto <b>todo es Server Component</b> "
        "(se ejecuta en el servidor y no envía JS al navegador). Solo cuando necesitas "
        "interactividad (estado, eventos, hooks del navegador) marcas el archivo con "
        "<font name='Courier'>'use client'</font> al inicio."))
    S.append(code("""// Server Component (por defecto): corre en el servidor
// Sirve para: leer datos de API/BD, importar librerías pesadas, SEO, sin JS en el cliente.
async function Usuarios() {
  const res = await fetch("https://api.ejemplo.com/users");   // fetch directo en el servidor
  const users = await res.json();
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Client Component: con "use client" al inicio del archivo
'use client';
import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);      // estado solo funciona en el cliente
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}""", 7.6))

    S.append(h2("1.5 Tipos de renderizado"))
    S.append(p(
        "Comparado con Angular (que por defecto es una SPA / CSR), Next.js ofrece 4 estrategias "
        "de rendering:"))
    S.append(table([
        ["Estrategia", "Qué es", "Cuándo se genera", "Uso típico"],
        ["CSR (Client Side Rendering)", "React renderiza en el navegador (como Angular SPA)", "En el cliente", "Dashboards, apps con estado muy dinámico, requiere autenticación"],
        ["SSG (Static Site Generation)", "La página se genera una vez en build y se sirve como HTML estático", "En build", "Landings, blogs, documentos (tu portafolio)"],
        ["SSR (Server Side Rendering)", "La página se genera por cada petición en el servidor", "En cada request", "Datos personalizados que cambian seguido"],
        ["ISR (Incremental Static Regeneration)", "SSG pero con revalidación automática", "En build + revalida cada X segundos", "Catálogo, precios, noticias (dato que cambia a menudo)"],
    ], [2.6 * cm, 5.4 * cm, 3.0 * cm, 5.6 * cm]))
    S.append(p(
        "En el App Router NO eliges una de ellas de forma explícita: Next.js lo decide de forma "
        "inteligente. Por defecto intenta renderizar <b>estático</b> (SSG). Puedes usar "
        "<font name='Courier'>export const dynamic</font> o <font name='Courier'>revalidate</font> "
        "para forzar SSR/ISR."))
    S.append(code("""// SSG estático (default en App Router): no es necesario configurar nada
export const revalidate = 60;                 // ISR: revalida la página cada 60 segundos
// o bien:
export const dynamic = "force-static";        // SSG siempre
export const dynamic = "force-dynamic";       // SSR en cada request

// Tu portafolio NO necesita ninguna de las dos: es todo estático por defecto.""" , 7.8))

    S.append(h2("1.6 Obtención de datos (data fetching)"))
    S.append(p(
        "Ya no hay HttpClient ni RxJS. En el servidor puedes usar <font name='Courier'>fetch()</font> "
        "nativo directamente en un Server Component con <font name='Courier'>async/await</font>."))
    S.append(code("""// Data fetching SIN dependencias (la forma moderna en Next.js):
async function getProyectos() {
  const res = await fetch("https://api.tuserver.com/proyectos", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo obtener los proyectos");
  return res.json();
}

export default async function Proyectos() {
  const proyectos = await getProyectos();
  return <section>{proyectos.map(proj => <Card key={proj.id} titulo={proj.title} />)}</section>;
}""", 7.6))
    S.append(p(
        "<b>Route Handlers</b> son tu 'API' dentro de Next.js (equivalente a tus "
        "<font name='Courier'>@RestController</font> de Spring Boot, pero como capa de redirección, "
        "no reemplazan un backend real):"))
    S.append(code("""// src/app/api/saludo/route.ts  -> expone POST /api/saludo
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();                     // lee el cuerpo de la petición
  const nombre = body.nombre ?? "mundo";
  return NextResponse.json({ mensaje: `Hola ${nombre}` });
}""", 7.6))

    S.append(h2("1.7 SEO y Metadata API"))
    S.append(p(
        "Con <font name='Courier'>export const metadata: Metadata = {...}</font> en cualquier "
        "<font name='Courier'>layout.tsx</font> o <font name='Courier'>page.tsx</font>, Next.js "
        "genera <font name='Courier'>title</font>, <font name='Courier'>meta description</font>, "
        "Open Graph, etc. Además puedes generar sitemap.xml y robots.ts sin tocar HTML."))
    S.append(code("""// En tu layout.tsx (equivale al index.html + meta tags de una app Angular):
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Portafolio - Dev Junior",
  description: "Portafolio con Spring Boot, Angular y proyectos personales.",
  openGraph: { title: "Mi Portafolio", type: "website" },
};""", 7.6))

    S.append(h2("1.8 next/image y next/font (optimización incluida)"))
    S.append(p(
        "<font name='Courier'>next/image</font> optimiza imágenes: las convierte a WebP/AVIF, "
        "añade lazy loading automático y exige <b>width y height</b> (o fill) para evitar layout "
        "shift. <font name='Courier'>next/font</font> sirve tipografías auto-hospedadas "
        "<b>sin peticiones externas</b>, mejorando velocidad y privacidad."))
    S.append(code("""import Image from "next/image";

// Obligatorio pasar width/height (o fill dentro de un contenedor posicionado)
<Image src="/foto.jpg" alt="Foto de perfil" width={400} height={400} className="rounded-full" priority />""", 7.6))

    S.append(h2("1.9 Fuentes auto-hospedadas (self-hosted)"))
    S.append(p(
        "En este portafolio usamos <font name='Courier'>next/font/local</font> con las fuentes "
        "Geist y Geist Mono guardadas en <font name='Courier'>src/fonts/</font>. Así el build no "
        "depende de Google Fonts (puede estar bloqueada en tu red o en la de producción)."))
    S.append(code("""import localFont from "next/font/local";

const geistSans = localFont({ src: "../fonts/Geist-Variable.woff2", variable: "--font-geist-sans" });
const geistMono = localFont({ src: "../fonts/GeistMono-Variable.woff2", variable: "--font-geist-mono" });""", 7.6))

    S.append(h2("1.10 Despliegue"))
    S.append(p(
        "La forma más fácil es <b>Vercel</b> (la empresa de Next.js): conectas tu repo de GitHub "
        "y cada <font name='Courier'>git push</font> genera un deploy con HTTPS y dominio gratis. "
        "También puedes desplegar en cualquier hosting que corra Node, o exportar HTML estático "
        "con <font name='Courier'>output: 'export'</font> en next.config.ts (así el sitio se puede "
        "subir a GitHub Pages o Netlify)."))

    # ======================================================================
    # PARTE 2: TAILWIND
    # ======================================================================
    S.append(h1("2. Tailwind CSS: de lo básico a lo técnico"))

    S.append(h2("2.1 ¿Qué es Tailwind CSS?"))
    S.append(p(
        "Tailwind es un framework CSS <b>utility-first</b>: en lugar de escribir clases "
        "semánticas en un archivo CSS (como en Angular: <font name='Courier'>.btn-alerta{...}</font>), "
        "compones utilidades directamente en el <font name='Courier'>class</font> de tus etiquetas: "
        "<font name='Courier'>bg-red-500</font>, <font name='Courier'>px-4</font>, "
        "<font name='Courier'>rounded-lg</font>, <font name='Courier'>md:hidden</font>. Eso evita "
        "inventar nombres de clase y mantiene el CSS casi sin escribir."))

    S.append(h2("2.2 Instalación en Next.js (Tailwind v4)"))
    S.append(p(
        "En esta app (Next.js 16 + Tailwind v4) la configuración ya NO es un archivo "
        "<font name='Courier'>tailwind.config.ts</font> como en v3: ahora Tailwind se configura "
        "dentro del CSS. El único archivo necesario es <font name='Courier'>globals.css</font>:"))
    S.append(code("""/* src/app/globals.css */
@import "tailwindcss";          /* 1) trae todo el framework */

@theme {                        /* 2) define tokens: colores, fuentes personalizadas */
  --color-accent: #10b981;
  --font-sans: var(--font-geist-sans);
}
/* 3) ahora puedes usar: bg-accent, text-accent, font-sans... */""", 7.6))

    S.append(h2("2.3 Sistema de tamaño: escala de 4px (0.25rem)"))
    S.append(p(
        "Las utilidades de espaciado y tamaño usan una escala incrementada de <b>0.25rem (4px)</b>: "
        "<font name='Courier'>p-1</font> = 4px, <font name='Courier'>p-4</font> = 16px, "
        "<font name='Courier'>p-10</font> = 40px. Casi nunca escribes valores sueltos: usas "
        "<font name='Courier'>p-0 ... p-96</font>, y además <font name='Courier'>px-</font> "
        "(horizontal), <font name='Courier'>py-</font> (vertical), <font name='Courier'>mx-</font>/"
        "<font name='Courier'>my-</font> (márgenes)."))

    S.append(h2("2.4 Colores"))
    S.append(p(
        "Los colores siguen el patrón <font name='Courier'>color-escala</font>. La escala va de "
        "50 (más claro) a 950 (más oscuro)."))
    S.append(code("""text-zinc-500       # texto gris medio (tono "zinc" de Tailwind)
bg-accent          # usa tu token personalizado definido en @theme
border-border      # token :root para los bordes
bg-surface/50      # el sufijo "/50" (opacity) no existe en Angular: 50 = 50% de transparencia""", 7.6))

    S.append(h2("2.5 Responsive con breakpoints"))
    S.append(p(
        "Tailwind es <b>mobile-first</b>: las clases base aplican al móvil y prefijas breakpoints "
        "para pantallas mayores. No escribes media queries a mano."))
    S.append(code("""<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- móvil: 1 columna | tablet (>=768px): 2 | desktop (>=1024px): 3 -->
</div>
sm = >=640px   md = >=768px   lg = >=1024px   xl = >=1280px   2xl = >=1536px""", 7.6))

    S.append(h2("2.6 Estados: hover, focus, activo"))
    S.append(code("""<button class="bg-accent hover:bg-accent-light focus:outline-2 active:scale-95">
  Enviar
</button>""", 7.6))

    S.append(h2("2.7 Modo oscuro"))
    S.append(p(
        "En Tailwind v4 controlas el modo claro/oscuro con el modificador "
        "<font name='Courier'>dark:</font> activado por una clase <font name='Courier'>.dark</font> "
        "sobre <font name='Courier'>html</font>. Este portafolio es oscuro de base: define los "
        "colores ('tokens') y usa utilitarios concretos."))

    S.append(h2("2.8 Reutilización: componentes antes que @apply"))
    S.append(p(
        "La filosofía de Tailwind dice: <b>no abras un archivo CSS</b>. Si repites utilidades, "
        "crea un <b>componente de React</b> y centralízalo. En Next.js eso es un archivo nuevo en "
        "<font name='Courier'>src/components/</font> (lo que hace tu portafolio con "
        "ProjectCard). Si aún así quieres reutilizar en CSS (muy puntual), Tailwind v4 permite "
        "usar la directiva <font name='Courier'>@apply</font>:"))
    S.append(code("""/* Solo para casos muy puntuales: NO abuses de @apply */
.card {
  @apply rounded-xl border border-border bg-surface p-6;
}""", 7.6))

    S.append(h2("2.9 Personalización con @theme (v4)"))
    S.append(p(
        "En v4 defines tus <i>design tokens</i> en <font name='Courier'>@theme</font> y Tailwind "
        "genera automáticamente las utilidades. Este portafolio define "
        "<font name='Courier'>--color-accent</font>, <font name='Courier'>--color-surface</font>, "
        "<font name='Courier'>--color-border</font> y <font name='Courier'>--font-sans</font>."))

    S.append(h2("2.10 Ejemplo completo: una card"))
    S.append(code("""<article class="rounded-xl border border-border bg-surface p-6 hover:border-accent/60">
  <h3 class="text-lg font-semibold text-zinc-50">Título</h3>
  <p class="mt-2 text-sm text-zinc-400">Descripción</p>
  <span class="mt-3 inline-block rounded bg-border/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
    Java
  </span>
</article>""", 7.6))

    # ======================================================================
    # PARTE 3: ANGULAR VS NEXT.JS
    # ======================================================================
    S.append(h1("3. Comparativa: Angular vs Next.js"))

    S.append(h2("3.1 Respuesta directa a tu duda sobre el CLI"))
    S.append(p(
        "<b>En Angular usas <font name='Courier'>ng g service nombre --skip-tests</font> para "
        "generar archivos. En Next.js NO existe un CLI generador como ese.</b> Los archivos se "
        "crean a mano siguiendo convenciones de nombres; el 'framework' de Next es el sistema de "
        "carpetas y archivos. Para un 'servicio' (lógica reutilizable) creas una función en "
        "<font name='Courier'>src/lib/</font> y la importas:"))
    S.append(code("""// "Servicio" equivalente en Next.js (sin CLI, sin decoradores @Injectable):
// src/lib/greeting.ts
export function saludar(nombre: string) {
  return `Hola ${nombre}!`;
}

// uso en cualquier página o componente:
import { saludar } from "@/lib/greeting";
<p>{saludar("Ana")}</p>""", 7.6))

    S.append(h2("3.2 Tabla de equivalencias CLI"))
    S.append(table([
        ["Acción", "Angular CLI", "Next.js / npm"],
        ["Crear proyecto", "ng new mi-app", "npx create-next-app@latest mi-app"],
        ["Servir en desarrollo", "ng serve -o", "npm run dev"],
        ["Generar componente", "ng g c componentes/nombre", "Manual: crear components/Nombre.tsx (no hay CLI de generación)"],
        ["Generar servicio", "ng g service servicio --skip-tests", "Manual: crear lib/servicio.ts con una función"],
        ["Generar módulo", "ng g m modulo", "No existe: la estructura de src/app/ es tu 'módulo'"],
        ["Guard / rutas", "ng g guard ... + app-routing", "Manual + middleware.ts, o carpeta + page.tsx"],
        ["Pipe / interfaz", "ng g pipe / ng g interface", "Manual: función normal / type en TS"],
        ["Build de producción", "ng build", "npm run build"],
        ["Lint", "ng lint", "npm run lint (ESLint ya configurado)"],
        ["Tests", "ng test / ng e2e", "npm test (configuras Vitest/Jest) - no viene por defecto"],
        ["Añadir librería", "ng add <paquete>", "npm install <paquete> + config manual"],
        ["UI Components", "ng generate + Angular Material", "npx shadcn add button (ecosistema shadcn/ui)"],
    ], [3.4 * cm, 5.6 * cm, 7.6 * cm]))

    S.append(h2("3.3 Conceptos equivalentes"))
    S.append(table([
        ["Concepto Angular", "Equivalente en Next.js / React"],
        ["AppModule + declarations", "layout.tsx + componentes importados"],
        ["Routing (app-routing.module.ts)", "Carpetas + page.tsx (file-based routing)"],
        ["Ruta con parámetro (id)", "app/usuario/[id]/page.tsx; recibe params: { id }"],
        ["ActivatedRoute.paramMap", "En server: params de la página · en client: useParams()"],
        ["@Injectable + inyección de dependencias", "Importar funciones/constantes (no hay DI: proximidad por imports)"],
        ["HttpClient + interceptores", "fetch() nativo o axios; a nivel HTTP usa middleware.ts"],
        ["RxJS + Observables", "async/await + fetch; estado reactivo con hooks o librerías"],
        ["Guards de rutas", "middleware.ts (se ejecuta antes de llegar a una página)"],
        ["ngIf / ngFor / ngSwitch", "Condicionales ternarios + .map() en JSX"],
        ["Pipes (date, uppercase)", "Funciones de JS (new Date().toLocaleDateString('es-ES'))"],
        ["@Input() / @Output()", "props (de padre a hijo) / callbacks (onClick, onX)"],
        ["ReactiveFormsModule + validators", "react-hook-form + zod (librerías de React)"],
        ["ngOnInit / ciclo de vida", "useEffect (solo en client components)"],
        ["ChangeDetectionStrategy", "React re-renderiza automáticamente con estado (no lo configuras)"],
        ["Servicios singleton", "Import global del módulo ES + const compartida"],
    ], [5.6 * cm, 11.0 * cm]))

    S.append(h2("3.4 Dificultades típicas al migrar la mentalidad de Angular"))
    S.extend(bullets([
        "<b>No hay 'módulos':</b> no necesitas declarar dependencias. Si importas algo, simplemente funciona.",
        "<b>Los componentes son por defecto server-side:</b> un useEffect o un onClick en un Server Component da error; añade 'use client' arriba de ese archivo.",
        "<b>La reactividad es con estado:</b> para que una variable cambie la UI, usa hooks (useState, useMemo).",
        "<b>No hay inyección automática:</b> importas cada dependencia de forma explícita (puedes crear singletons con ES Modules).",
        "<b>No manipulas el DOM:</b> no hay *ngFor ni @ViewChild; renderizas de nuevo con .map().",
        "<b>Rutas dinámicas:</b> creas carpetas con corchetes ([id]) en lugar de definir un array de rutas.",
    ]))

    # ======================================================================
    # PARTE 4: PREGUNTAS DE ENTREVISTA
    # ======================================================================
    S.append(h1("4. Preguntas frecuentes de entrevistas sobre Next.js"))
    S.append(p(
        "Respuestas cortas que demuestran dominio. Repásalas 10 minutos antes de una entrevista. "
        "Normalmente preguntan 'cuándo usarías cada una': piensa siempre en tu proyecto real "
        "(portafolio, sistema de pedidos)."))

    qa = [
        ("1. ¿Qué es Next.js y por qué usarlo en vez de React puro?",
         "Next.js es un framework de React que añade convenciones: enrutado por archivos, "
         "renderizado en servidor (SSR/SSG/ISR), optimización de imágenes, SEO y API interna. "
         "React puro solo pinta en el navegador; Next.js te da una SPA con toda la capa de "
         "servidor sin configurarla tú."),
        ("2. ¿Qué es el App Router? ¿Cómo se diferencia del Pages Router (v12 y anteriores)?",
         "El App Router (13.4+) usa la carpeta app/ con convenciones de archivos (page, layout, "
         "loading, error, route) y trae Server Components, layouts anidados y streaming. El Pages "
         "Router (carpeta pages/) era la API anterior: cada archivo era una página y todo era "
         "Client Component."),
        ("3. ¿Qué son los Server Components y los Client Components?",
         "Los Server Components corren en el servidor, no envían JS al navegador (ideales para "
         "datos y SEO) y son el comportamiento por defecto. Los Client Components se marcan con "
         "'use client' al inicio del archivo y son los únicos que pueden usar hooks (useState, "
         "useEffect) y eventos. Lleva al cliente solo lo necesario."),
        ("4. Explica SSR, SSG, ISR y CSR. ¿Cuándo usarías cada una?",
         "SSG genera HTML en build (ideal para el portafolio). SSR renderiza en cada request "
         "(datos personalizados). ISR es SSG que se revalida cada T segundos (precios/noticias). "
         "CSR renderiza todo en el navegador (dashboards con estado vivo). En el App Router la "
         "decisión es automática: por defecto intenta ser estático; con revalidate/dynamic la "
         "fuerzas."),
        ("5. ¿Qué significa 'use client'?",
         "Es una directiva (no un import) que indica que ese archivo (y lo que importe) se "
         "ejecutará en el navegador. Se coloca como primera línea del archivo."),
        ("6. ¿Cómo haces fetching de datos en un Server Component?",
         "Con fetch() nativo en una función async y await. Puedes cachear con 'cache: "
         "'force-cache'' (por defecto) u omitir la caché con 'cache: 'no-store''."),
        ("7. ¿Qué es un Route Handler y cuándo lo usarías?",
         "Un archivo route.ts dentro de app/ que exporta GET, POST, PUT, DELETE... Expone un "
         "endpoint HTTP en tu app. Sirve como capa intermedia, webhooks o para no exponer "
         "credenciales en el cliente (el código corre en el servidor)."),
        ("8. ¿Qué es un Server Action?",
         "Una función async marcada con 'use server' que se ejecuta en el servidor y puede "
         "llamarse desde un formulario o cliente (mutation). Es la evolución de los formularios "
         "de Next.js: evita montar un endpoint API para una mutación."),
        ("9. ¿Cómo haces SEO en el App Router?",
         "Exportando metadata desde layout.tsx o page.tsx (Metadata API): title, description, "
         "openGraph, robots, etc. Next.js genera las etiquetas del head. También tienes sitemap.ts "
         "y robots.ts."),
        ("10. ¿Para qué sirve next/image?",
         "Optimiza imágenes automáticamente: lazy loading, resize, formato WebP/AVIF y previene "
         "layout shift al exigir width/height (o fill). Funciona con imágenes locales y remotas "
         "(configurando remotePatterns)."),
        ("11. ¿Qué es el middleware.ts de Next.js?",
         "Código que corre antes de las rutas (equivale a un guard o interceptor de Angular) para "
         "validar sesión, redirigir o modificar la request. Se ejecuta en el edge."),
        ("12. ¿Cómo optimizarías el rendimiento de una página Next.js?",
         "Priorizando Server Components, usando next/image y next/font, carga diferida con "
         "next/dynamic, reduciendo JS en el cliente, minimizando re-renders (useMemo/useCallback "
         "solo cuando hacen falta) y cacheando consultas (ISR, revalidate)."),
        ("13. ¿Para qué sirve next/dynamic?",
         "Carga un componente bajo demanda (code splitting dinámico), como en 'lazy' de bibliotecas "
         "pesadas que no hacen falta al inicio (gráficas, editores)."),
        ("14. ¿Qué son loading.tsx, error.tsx y not-found.tsx?",
         "Son 'boundaries' opcionales del App Router: loading.tsx muestra un estado de carga "
         "(suspense), error.tsx captura errores de su sección y not-found.tsx personaliza el 404."),
        ("15. ¿Cómo desplegarías este portafolio gratis?",
         "Con Vercel conectado a GitHub: deploy automático con cada push, HTTPS y dominio gratis. "
         "Alternativa: exportar estático (output: 'export') y subirlo a GitHub Pages o Netlify."),
        ("16. ¿Cuándo usas un Server Component vs un Client Component?",
         "Servidor: leer BD/API, sesión, SEO, logs, librerías pesadas. Cliente: formularios "
         "interactivos, drag & drop, estado, animaciones que dependen del DOM. Regla práctica: "
         "empieza en servidor y baja al cliente solo lo imprescindible."),
        ("17. ¿Qué diferencia hay entre una SPA de Angular y una app Next.js (App Router)?",
         "Una SPA de Angular descarga JS y renderiza todo en el navegador. Next.js decide en el "
         "servidor: la primera respuesta trae HTML listo (SEEO/velocidad) y crece de forma "
         "incremental. Ambos usan TypeScript de serie."),
        ("18. ¿Cómo manejas variables de entorno de forma segura?",
         "Con archivos .env.local y .env. Las variables públicas van con el prefijo NEXT_PUBLIC_ "
         "y se exponen en el cliente. Las privadas (claves, tokens) se leen solo en código de "
         "servidor, nunca con NEXT_PUBLIC_. Nunca subas secretos a GitHub."),
    ]
    for q, a in qa:
        S.append(Paragraph(q, ST["qa"]))
        S.append(p(a))

    # ======================================================================
    # PARTE 5: CHEATSHEET
    # ======================================================================
    S.append(h1("5. Cheatsheet: comandos y snippets rápidos"))
    S.append(h2("5.1 Comandos"))
    S.append(table([
        ["Comando", "Qué hace"],
        ["npx create-next-app@latest mi-app", "crear proyecto"],
        ["npm run dev", "servidor de desarrollo"],
        ["npm run build", "build de producción"],
        ["npm run start", "servir build"],
        ["npm run lint", "ESLint"],
        ["npx next dev --turbopack", "dev con Turbopack (más rápido)"],
        ["npx shadcn@latest init / add", "componentes UI generados"],
    ], [8.6 * cm, 8.0 * cm]))

    S.append(h2("5.2 Snippet: Server Action básico"))
    S.append(code("""// En el archivo donde quieras la acción o en un archivo "use server":
"use server";

export async function crearProyecto(formData: FormData) {
  const titulo = formData.get("titulo");
  // ... inserta, procesa, redirige
  return { ok: true };
}""", 7.6))

    S.append(h2("5.3 Snippet: ruta dinámica con params"))
    S.append(code("""// app/proyecto/[id]/page.tsx
export default async function ProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proyecto = await getProyecto(id);
  return <main>{proyecto.title}</main>;
}""", 7.6))

    S.append(h2("5.4 Snippet: estático con incremento (ISR)"))
    S.append(code("""// En un page.tsx o route handler:
export const revalidate = 3600;   // se regenera como máximo cada 1h""", 7.6))

    S.append(Spacer(1, 0.6 * cm))
    S.append(Paragraph(
        "Fin de la guía. Siguiente paso recomendado: abre el código de tu portafolio en "
        "<font name='Courier'>src/app/layout.tsx</font>, <font name='Courier'>src/data/*.ts</font> "
        "y los componentes de <font name='Courier'>src/components/</font>, y repasa los "
        "comentarios: están pensados como mini-lecciones.",
        ST["body"]))

    return S


# ---------------------------------------------------------------------------
# 4. Ensamblado + build de dos pasadas (para el índice con números de página)
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import os

    out_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(out_dir, "Portafolio-Guia-NextJS-Tailwind.pdf")

    doc = Doc(pdf_path)

    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle("TOC0", fontName="Helvetica-Bold", fontSize=10.5,
                       leading=17, textColor=TEXT),
        ParagraphStyle("TOC1", fontName="Helvetica", fontSize=9,
                       leading=13, textColor=MUTED, leftIndent=14),
    ]

    story = build_story()
    doc.multiBuild(story)

    print("PDF generado:", pdf_path, "| tamaño:", os.path.getsize(pdf_path), "bytes")