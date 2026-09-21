/*
  components/ProjectCard.tsx
  --------------------------
  Tarjeta individual de un proyecto.

  Es un componente "presentacional": solo recibe un objeto `Project`
  por props y lo pinta. No sabe nada de dónde vienen los datos, de
  forma que se puede reutilizar en cualquier lugar.

  Ejemplo de props:
    <ProjectCard project={projects[0]} />
*/

import type { Project } from "@/data/projects";

/* Props que recibe el componente: exactamente un proyecto */
type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/60">
      {/* Cabecera de la card */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-zinc-50">{project.title}</h3>
        {/* Badget "principal" si el proyecto está marcado como destacado */}
        {project.featured && (
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
            Destacado
          </span>
        )}
      </div>

      {/* Frase corta del proyecto */}
      <p className="font-mono text-xs text-zinc-500">{project.tagline}</p>

      {/* Descripción */}
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
        {project.description}
      </p>

      {/* Tecnologías usadas (se renderizan con map sobre el array) */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded bg-border/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Enlaces a GitHub y demo en vivo */}
      <div className="mt-5 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-accent"
          >
            GitHub →
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            Demo en vivo →
          </a>
        )}
      </div>
    </article>
  );
}