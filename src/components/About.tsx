import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

/* Lo que estás buscando laboralmente */
const GOALS = [
  "Experiencia como desarrollador junior backend o full stack.",
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
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-zinc-100">Tecnologías</h3>

            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-zinc-300"
                      >
                        {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}