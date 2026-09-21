/*
  app/layout.tsx
  --------------
  Layout raíz de la aplicación. Es obligatorio en Next.js (App Router):
  envuelve TODAS las páginas del proyecto.

  Aquí se define:
    - La configuración general de SEO/metadata (etiqueta <head>)
    - El idioma de la página (<html lang="es">)
    - Las fuentes (cargadas con next/font para optimizarlas al vuelo)
    - El contenido COMPARTIDO por todas las rutas (Navbar + Footer)

  Los archivos layout.tsx y page.tsx son "Server Components" por defecto,
  es decir, se renderizan en el servidor y no envían su JS al navegador.
*/

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

/*
  Fuentes servidas desde NUESTRO servidor (self-hosted) con
  next/font/local. No dependemos de Google Fonts en tiempo de build
  ni de terceros en el navegador, lo que hace el build offline-safe
  (útil si tu red no llega a fonts.googleapis.com).

  Las fuentes WOFF2 versionadas están en src/fonts.
*/
const geistSans = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
});

// Metadata API: genera automáticamente <title>, <meta name="description">, etc.
// Es la forma de hacer SEO en el App Router.
export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  // Open Graph: cómo se ve el enlace al compartirlo (WhatsApp, LinkedIn...)
  openGraph: {
    title: `${site.name} — Portafolio`,
    description: site.summary,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col">
        {/* Navbar visible en TODAS las rutas */}
        <Navbar />

        {/* children contiene la página que Next.js resuelve según la ruta */}
        <main className="flex flex-1 flex-col">{children}</main>

        {/* Footer visible en TODAS las rutas */}
        <Footer />
      </body>
    </html>
  );
}