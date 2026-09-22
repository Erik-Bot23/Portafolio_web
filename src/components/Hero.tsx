/*
  components/Hero.tsx
  -------------------
  Sección principal (parte alta de la landing).

  Aquí va el "elevator pitch": tu nombre, el rol que buscas y una
  frase corta. Es la primera impresión que se lleva quien visita
  tu página, por eso debe ser clara en menos de 5 segundos.
*/
import { site } from "@/data/site";

export default function Hero() {
  return (
    /* id="inicio" lo usa el logo de la Navbar para hacer scroll arriba */
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-20">
      {/* Círculo decorativo de fondo (sutil) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* "Hola, soy..." en pequeño */}
        <p className="mb-3 font-mono text-sm text-accent">Hola, soy </p>

        {/* Nombre (grande) */}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
          {site.name}.
        </h1>

        {/* Rol que buscas */}
        <p className="mt-4 text-lg font-medium text-zinc-300 sm:text-xl">
          {site.role}
        </p>

        {/* Frase corta (o resumen breve) */}
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
          {site.tagline}
        </p>
      </div>
    </section>
  );
}