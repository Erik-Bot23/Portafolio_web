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
        items: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
    {
        category: "Datos",
        items: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
    {
        category: "Devops",
        items: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
    {
        category: "Otros",
        items: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "Flyway"],
    },
];