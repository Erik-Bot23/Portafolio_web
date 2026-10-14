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
        items: ["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
    {
        category: "Frontend",
        items: ["Angular", "Next.js", "TypeScript", "Tailwind"],
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
        items: ["HTML", "CSS", "JavaScript"],
    },
];