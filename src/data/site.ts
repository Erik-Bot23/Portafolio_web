/*
  src/data/site.ts
  ----------------
  Datos personales del portafolio centralizados en UN SOLO archivo.

  Esta es la forma recomendada en Next.js: en lugar de "hardcodear"
  tu nombre, correo o links en cada componente, los declaras aquí y
  los importas donde los necesites. Así, si cambias un link, solo
  tocas este archivo.

  IMPORTANTE: edita este archivo con tus datos reales.
*/

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
};

export const site: SiteConfig = {
  name: "Erik Jarquín Sánchez",

  role: "Desarrollador Junior Full Stack",

  // Frase corta que aparece justo debajo del nombre (Hero)
  tagline:
    "Backend con Spring Boot · Frontend con Angular y Next.js · Base de datos con PostgreSQL (Supabase) y migraciones con Flyway. " +
    "Construyo sistemas completos. Me interesa el detalle que casi nadie cuida: que los números de un negocio sean correctos.",


  // Párrafo "Sobre mí": quién eres y qué buscas.
  // Esto es lo que leen los reclutadores, así que sé concreto.
  summary:
    "Desarrollador junior full stack. Construyo sistemas completos con Spring Boot, Angular y PostgreSQL, desde la autenticación y el modelo de datos hasta la interfaz. " +
    "Mi proyecto principal es un punto de venta en producción con caja, inventario, compras y reportes, donde el reto no fue el CRUD sino que los números fueran ciertos: cobros idempotentes, costos congelados al momento de vender y márgenes que sirvan para decidir a quién renegociarle precio. " +
    "También trabajo con TypeScript, Next.js y Python. Busco demostrar mis habilidades como junior en backend o full stack, donde pueda seguir aprendiendo y aportar desde el primer día.",

  // Correo de contacto
  email: "erikjarquin20@gmail.com",

  // Links a tus redes (sustituye por los tuyos)
  github: "https://github.com/ErikSvardook",
  linkedin: "https://linkedin.com/in/erik-jarquín-sánchez-922726284",
};