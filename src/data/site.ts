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
  // Tu nombre (módificalo)
  name: "Erik Jarquín Sánchez",

  // Rol que buscas / que defines como junior
  role: "Desarrollador Junior Full Stack",

  // Frase corta que aparece justo debajo de tu nombre (Hero)
  tagline:
    "Backend con Spring Boot · Frontend con Angular y React · Base de datos PostgreSQL",

  // Párrafo "Sobre mí": quién eres y qué buscas.
  // Esto es lo que leen los reclutadores, así que sé concreto.
  summary:
    "Soy un desarrollador junior apasionado por construir aplicaciones completas, del backend al frontend. Terminé un proyecto full-stack con Spring Boot, Angular y PostgreSQL trabajando con arquitectura orientada a usar en un futuro microservicios. Busco mi primera oportunidad como junior en backend o full stack, donde pueda seguir aprendiendo y aportando desde el día uno.",

  // Correo de contacto
  email: "erikjarquin20@gmail.com",

  // Links a tus redes (sustituye por los tuyos)
  github: "https://github.com/tu-usuario",
  linkedin: "https://www.linkedin.com/in/tu-usuario",
};