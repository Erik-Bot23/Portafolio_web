/*
  Tarjeta individual de un proyecto.

  Es un componente "presentacional": solo recibe un objeto `Project`
  por props y lo pinta. No sabe nada de dónde vienen los datos, de
  forma que se puede reutilizar en cualquier lugar.
*/

import type { Project } from "@/data/projects";

/**
 * Flecha decorativa. Se usa como máscara(mask-image) para poder pintarla
 * con currentColor: así hereda el color del texto y cambia al hacer hover, sin
 * depender del PNG ni del tema
 */
function Arrow(){
  return (
    <span 
      aria-hidden = "true"
      className = "inline-block h-3 w-3 shrink-0 bg-current transition-transform duration-200 group-hover/link:translate-x-0.5"
      style={{
        maskImage: 'url("/icons/derecha.png")',
        WebkitMaskImage: 'url("/icons/derecha.png")',
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center"
      }}
    />
  );
}

const LINK = "group/link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors";

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

      {/* Descripción */}
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
        {project.description}
      </p>

      {/*&& es lo que evita el hueco invisible */}
      {project.highlights && (
        <ul className="mt-4 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm leading-6 text-zinc-400">
              <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"/>
              {h}
            </li>
          ))}
        </ul>
      )}
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
        {project.githubRepo1 && (
          <a
            href={project.githubRepo1}
            target="_blank"
            rel="noopener noreferrer"
            className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Spring Boot
            <Arrow/>
          </a>
        )}
        {project.githubRepo2 && (
          <a
            href= {project.githubRepo2}
            target="_blank"
            rel="noopener noreferrer"
            className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Angular
            <Arrow/>
          </a>
        )}
        {project.githubRepo3 && (
          <a
            href= {project.githubRepo3}
            target="_blank"
            rel="noopener noreferrer"
            className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Docker
            <Arrow/>
          </a>
        )}
        {project.github && (
          <a
            href= {project.github}
            target="_blank"
            rel="noopener noreferrer"
            className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Repositorio del proyecto
            <Arrow/>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Demo en vivo
            <Arrow/>
          </a>
        )}
        {project.demo1 && (
          <a
            href={project.demo1}
            target="_blank"
            rel="noopener noreferrer"
             className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Ventas locales
           <Arrow/>
          </a>
        )}
        {project.demo2 && (
          <a
            href={project.demo2}
            target="_blank"
            rel="noopener noreferrer"
             className= {`${LINK} text-zinc-300 hover:text-accent`}
          >
            Ventas en línea
            <Arrow/>
          </a>
        )}
      </div>
    </article>
  );
}