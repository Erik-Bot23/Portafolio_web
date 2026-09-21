/*
  app/page.tsx
  ------------
  Página principal del portafolio (ruta raíz "/").

  En el App Router, cada archivo page.tsx dentro de una carpeta
  representa una ruta:
    app/page.tsx        -> "/"
    app/about/page.tsx  -> "/about"

  Esta página es centrada: NO contiene casi lógica, solo "compone"
  (combina) las secciones. Cada sección es un componente separado
  en src/components/ para mantener el código legible y reutilizable.
*/

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    /* Las secciones van en orden de lectura natural de una landing */
    <>
      {/* 1. Presentación y CTA principal */}
      <Hero />
      {/* 2. Quién soy y qué busco */}
      <About />
      {/* 3. Mis proyectos (los 3) */}
      <Projects />
      {/* 4. Cómo contactarme */}
      <Contact />
    </>
  );
}