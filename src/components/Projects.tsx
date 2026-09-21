/*
  components/Projects.tsx
  -----------------------
  Sección "Proyectos".

  Es un componente que "pide" datos (importa projects de
  src/data/projects.ts) y los pinta con un simple map() sobre la
  lista de `ProjectCard`. Este componente se renderiza en el
  servidor (Server Component), al igual que ProjectCard, porque no
  necesita nada del navegador.
*/

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    /* id="proyectos" es el destino del enlace #proyectos de la navbar.
       scroll-mt evita que la navbar fija tape el título al navegar. */
    <section id="proyectos" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
      <h2 className="mb-10 font-mono text-sm uppercase tracking-widest text-accent">
        {"// Proyectos"}
      </h2>

      {/*
        Tip: agrega la clase "lg:grid-cols-3" para que muestre las
        tres tarjetas en fila en pantallas grandes.
        Con 2 columnas, la card destacada respira mejor.
      */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}