/*
  components/About.tsx
  --------------------
  Sección "Sobre mí": quién eres y qué buscas.

  Como quieres optar a un puesto junior (backend o frontend), es
  importante dejar claro qué tecnologías manejas y qué estás
  buscando. La lista de habilidades se renderiza con un map() sobre
  un array, evitando repetir etiquetas.
*/

import { site } from "@/data/site";

/* Tecnologías que dominas/usas (edítala para añadir o quitar) */
const SKILLS = [
  "Java",
  "Spring Boot",
  "Angular",
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "Docker",
  "Python",
];

/* Lo que estás buscando laboralmente */
const GOALS = [
  "Primera experiencia como desarrollador junior (backend).",
  "Trabajar en un equipo donde pueda aprender de perfiles senior.",
  "Seguirme especializando en el ecosistema Java (Spring Boot) y TypeScript.",
  "Aportar proyectos en producción hechos con buenas prácticas.",
];

export default function About() {
  return (
    /* id="sobre-mi" es el destino del enlace #sobre-mi de la navbar */
    <section id="sobre-mi" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
      {/* Título de sección */}
      <h2 className="mb-10 font-mono text-sm uppercase tracking-widest text-accent">
        {"Sobre mí"}
      </h2>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Columna izquierda: descripción + objetivos */}
        <div>
          <p className="text-base leading-7 text-zinc-300">{site.summary}</p>

          {/* Qué estoy buscando */}
          <h3 className="mt-8 mb-3 text-sm font-semibold text-zinc-100">
            Qué busco
          </h3>
          <ul className="space-y-2">
            {GOALS.map((goal) => (
              <li key={goal} className="flex items-start gap-2 text-sm leading-6 text-zinc-400">
                {/* Indicador bullet con acento */}
                <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha: tecnologías */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-100">Tecnologías</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}