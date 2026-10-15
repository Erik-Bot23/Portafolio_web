/*
  Datos de tus proyectos, también centralizados.

  Cada proyecto es un objeto con la forma de la interfaz `Project`.
  Esto permite que la sección "Proyectos" se renderice con un simple
  projects.map(...) sin repetir HTML por proyecto.

  featured: si es true, la card se destaca visualmente
*/

export type Project = {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  tech: string[];
  github?: string;
  githubRepo1?: string;
  githubRepo2?: string;
  githubRepo3?: string;
  demo?: string;
  demo1?: string;
  demo2?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "system-sales",
    title: "ERP de ventas para tiendas (POS)",
    /*
      Describe qué hace, qué aprendiste y qué retos resolviste.
      Los reclutadores valoran "qué hace" más que la lista de tecnologías.
    */
    description:
      "Sistema completo de punto de venta para una tienda de despensa: caja, cobro, inventario, proveedores, compras y reportes. " + 
      "Lo construí de punta a punta: backend hecho con Spring Boot con 12 controladores y 73 endpoints REST y autencicación con JWT " +
      "; SPA en Angular para todo el diseño del frontend. PostgreSQL con 7 migraciones versionadas por flyway. Y se hicieron 301 pruebas automatizadas.",
    /**
     * Detalles de lo que se esta implementando en el proyecto.
     */
    highlights: ["Cobro idempotente: una clave única en la base de datos evita que un doble clic en el botón de cobrar genere dos ventas con el stock descontado dos veces.",
      "Utilidad real: cada renglón de venta congela el costo del producto al momento de vender, así que comprar más barato mañana no reescribe la ganancia de ayer.",
      "Inventario que no miente: una compra no suma stock hasta que se confirma, que es cuando la mercancía realmente llegó.",
      "Reporte de margen por producto ordenado de menor a mayor, que responde la pregunta con la que se decide una despensa: a quién hay que renegociarle el precio de compra.",
      "La API impide que un usuario se desactive a sí mismo y valida que ningún campo obligatorio se guarde vacío.",
      "Recuperación de contraseña por la API HTTPS de Resend, porque el hosting bloquea el SMTP saliente y el puerto 587 simplemente no responde."],

    tech: ["Spring Boot 4", "Java 21", "Angular 21", "TypeScript", "PostgreSQL", "Flyway", "Docker", "JWT"],

    // Reemplaza con tu repositorio y tu demo (si la tienes)
    githubRepo1: "https://github.com/ErikSvardook/Compras-Backend.git",
    githubRepo2: "https://github.com/ErikSvardook/Compras-Frontend-local.git",
    githubRepo3: "https://github.com/ErikSvardook/Compras-Docker.git",
    demo1: "https://comprasangular.netlify.app",
    featured: true,
  },
  {
    id: "pagina-novia",
    title: "Página Web personal",

    description:
      "Página web personal con animaciones, detalles interactivos y diseño responsive, hecho con JavaScript, HTML y CSS puro. " +
      "Me sirvió para practicar manipulación del DOM, animaciones con CSS y buenas prácticas de diseño web sin un framework.",

    tech: ["HTML", "CSS", "JavaScript"],

    github: "https://github.com/ErikSvardook/Pagina-de-novios.git",
    demo: "https://yanerik.netlify.app",
  },
  {
    id: "agenda-python",
    title: "Agenda con Python",

    description:
      "Proyecto en Python para administrar contactos y eventos, con almacenamiento en una base de datos PostgreSQL. Incluye funcionalidades de agregar, editar, eliminar y listar contactos y eventos. " + 
      "Me ayudó a mejorar mis habilidades en Python y SQL, modelando datos fuera de un framework.",

    tech: ["Python", "PostgreSQL"],

    github: "https://github.com/ErikSvardook/Agenda-Contactos.git",
  },
];