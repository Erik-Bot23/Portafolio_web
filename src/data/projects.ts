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
  details1?: string;
  details2?: string;
  tech: string[];
  github?: string;
  demo?: string;
  demo1?: string;
  demo2?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "system-sales",
    title: "ERP de ventas para tiendas (POS)",
    tagline: "Spring Boot + Angular + PostgreSQL (en Supabase) + Next.js",
    /*
      Describe qué hace, qué aprendiste y qué retos resolviste.
      Los reclutadores valoran "qué hace" más que la lista de tecnologías.
    */
    description:
      "Aplicación para gestionar ventas construida con una arquitectura MVC con Spring Boot en el backend, " +
      "una SPA en Angular como cliente para la administración de la tienda y PostgreSQL como base de datos alojada en Supabase. Implementé autenticación, CRUD y comunicación entre servicios por HTTP.",
    /**
     * Detalles de lo que se esta implementando en el proyecto.
     */
    details1: "Se esta implementando un frontend con Next.js para compras en línea enfocado al cliente, mientras que el frontend con Angular es para la administración de la tienda. " + 
    "Se usará el mismo backend con Spring Boot y la misma base de datos en Supabase para ambos frontends, habrá diferentes rutas apuntando a cada uno.",
    tech: ["Spring Boot", "Java", "Angular", "TypeScript", "PostgreSQL", "Docker", "Supabase", "Next.js"],
    // Reemplaza con tu repositorio y tu demo (si la tienes)
    github: "https://github.com/Erik-Bot23",
    demo1: "https://comprasangular.netlify.app",
    demo2: "https://comprasangular.netlify.app",
    featured: true,
  },
  {
    id: "pagina-novia",
    title: "Página Web para mi Novia",
    tagline: "Frontend · HTML + CSS + JavaScript",
    description:
      "Página web personal dedicada a mi novia hecha con JavaScript, HTML y CSS puro. Incluye animaciones, " +
      "detalles interactivos y diseño responsive. Me sirvió para practicar manipulación del DOM, animaciones con CSS y buenas prácticas de diseño web.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Erik-Bot23",
    demo: "https://tu-usuario.github.io/pagina-novia",
  },
  {
    id: "agenda-python",
    title: "Agenda con Python",
    tagline: "Python y postgreSQL",
    description:
      "Pequeño proyecto en Python para agendar contactos y eventos, con almacenamiento en una base de datos PostgreSQL. Incluye funcionalidades de agregar, editar, eliminar y listar contactos y eventos. Me ayudó a mejorar mis habilidades en Python y SQL.",
    tech: ["Python", "PostgreSQL"],
    github: "https://github.com/Erik-Bot23",
  },
  {
    id: "system-order",
    title: "ERP de ventas para establecimiento de comida (POS)",
    tagline: "Spring Boot + Angular + PostgreSQL (en Supabase) + Next.js",
    description:
      "Esta aplicación esta en proceso, se usará para gestionar ventas enfocadas a un establecimiento de comida y tomará como base el proyecto de ventas para tienda, " +
      "el cual se refactorizará para adaptarse a las necesidades de un restaurante; tanto el backend con Spring Boot como el frontend con Angular. Y se implementará un frontend con Next.js para compras en línea enfocado al cliente." +
      " mientras que el frontend con Angular seguirá siendo para la administración, en esta caso del restaurante.",

    details2: "Se esta implmentando un frontend con Next.js para compras en línea enfocado al cliente, mientras que el frontend con Angular es para la administración de la tienda. " + 
    "Se usará el mismo backend con Spring Boot y la misma base de datos en Supabase para ambos frontends, pero habrá diferentes rutas apuntando a cada uno.",
    tech: ["Spring Boot", "Java", "Angular", "TypeScript", "PostgreSQL", "Docker", "Supabase", "Next.js"],
    github: "https://github.com/Erik-Bot23",
    demo1: "https://comprasangular.netlify.app",
    demo2: "https://comprasangular.netlify.app",
    featured: true,
  }, 
];