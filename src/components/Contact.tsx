/*
  components/Contact.tsx
  ----------------------
  Sección "Contacto": cómo llegar a ti.

  Lo mínimo imprescindible: un botón para escribirte por correo y
  enlaces directos a LinkedIn y GitHub (los que los reclutadores
  van a querer ver sí o sí).
*/
import { site } from "@/data/site";

export default function Contact() {
  return (
    /* id="contacto" es el destino del enlace #contacto de la navbar */
    <section id="contacto" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
      <h2 className="mb-10 font-mono text-sm uppercase tracking-widest text-accent">
        {"Contacto"}
      </h2>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
        <p className="text-2xl font-semibold text-zinc-50">
          ¿Tienes una oportunidad para mí?
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
          Escríbeme y hablemos. Respondo rápido tanto a ofertas laborales
          como a preguntas sobre mis proyectos.
        </p>

        {/* Botón principal: abrir el cliente de correo */}
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-accent-light"
        >
          {site.email}
        </a>

        {/* Links a redes */}
        <div className="mt-6 flex justify-center gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}