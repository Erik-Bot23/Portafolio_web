/**
 * Tecnologías agrupadas por categoría
 */

export type SkillGroup = {
    category: string;
    items: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        category: "Backend",
        items: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
    {
        category: "Frontend",
        items: ["Angular", "Next.js", "TypeScript", "Tailwind CSS", "CSS", "HTML"],
    },
    {
        category: "Datos",
        items: ["PostgreSQL", "Supabase", "MySQL"],
    },
    {
        category: "DevOps",
        items: ["Git Hub", "Docker", "Postman", "Git"],
    },
    {
        category: "Otros",
        items: ["Python", "JavaScript"],
    },
];