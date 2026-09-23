/*
  src/data/projects.ts
  --------------------
  Datos de tus proyectos, también centralizados.

  Cada proyecto es un objeto con la forma de la interfaz `Project`.
  Esto permite que la sección "Proyectos" se renderice con un simple
  `projects.map(...)` sin repetir HTML por proyecto.

  IMPORTANTE: edita cada entrada con los datos reales de tus proyectos:
  título, descripción, tecnologías, link de GitHub y demo en vivo.

  - `github`: link al repositorio (déjalo como `undefined` si no quieres mostrarlo)
  - `demo`: link a la demo en vivo (puede ser vercel.app, github pages...)
  - `featured`: si es true, la card se destaca visualmente
*/

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "system-order",
    title: "Sistema de Pedidos (Microservicios)",
    tagline: "Full-stack · Spring Boot + Angular + PostgreSQL",
    /*
      Describe qué hace, qué aprendiste y qué retos resolviste.
      Los reclutadores valoran "qué hace" más que la lista de tecnologías.
    */
    description:
      "Aplicación full-stack para gestionar compras construida con una arquitectura MVC con Spring Boot en el backend, una SPA en Angular como cliente y PostgreSQL como base de datos. Implementé autenticación, CRUD y comunicación entre servicios por HTTP.",
    tech: ["Spring Boot", "Java", "Angular", "TypeScript", "PostgreSQL", "Docker"],
    // Reemplaza con tu repositorio y tu demo (si la tienes)
    github: "https://github.com/tu-usuario/sistema-pedidos",
    demo: undefined,
    featured: true,
  },
  {
    id: "pagina-novia",
    title: "Página Web para mi Novia",
    tagline: "Frontend · HTML + CSS + JavaScript",
    description:
      "Página web personal dedicada a mi novia hecha con JavaScript, HTML y CSS puro. Incluye animaciones, detalles interactivos y diseño responsive. Me sirvió para practicar manipulación del DOM, animaciones con CSS y buenas prácticas de diseño web.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/tu-usuario/pagina-novia",
    demo: "https://tu-usuario.github.io/pagina-novia",
  },
  {
    id: "script-python",
    title: "Automatización con Python",
    tagline: "Scripting · Python",
    description:
      "Pequeño proyecto en Python para automatizar una tarea repetitiva (procesamiento/organización de archivos y generación de reportes). Refuerza mi base en lógica, manejo de archivos y escritura de scripts limpios y reutilizables.",
    tech: ["Python"],
    github: "https://github.com/tu-usuario/script-python",
    demo: undefined,
  },
];