/*
  components/Navbar.tsx
  ---------------------
  Barra de navegación fija en la parte superior.

  Usa anclas (href="#id") para saltar a las secciones de la misma
  página. El desplazamiento suave ya está activado en globals.css
  con `scroll-behavior: smooth`.

  Nota: este componente es "cliente" tan solo porque usa el hook
  useState. Lo marcamos con la directiva "use client".
*/
"use client";

import { useState } from "react";
import { site } from "@/data/site";
import Image from "next/image";

/* Lista de secciones a las que enlaza la barra (evita repetir HTML) */
const NAV_LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  /* Estado que controla si el menú (versión móvil) está abierto o cerrado */
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo / nombre del autor: hace scroll a la parte superior */}
        <a href="#inicio" className="relative block h-8 w-8">
          {/*{site.name.split(" ")[0]}.dev*/}
          <Image
            src="/icons/Designer.png"
            alt={`Logo de ${site.name}`}
            fill
            sizes="32px"
            className="rounded-md object-contain"
          />
        </a>

        {/* Menú de escritorio (oculto en pantallas pequeñas) */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón "hamburguesa" visible solo en móvil */}
        <button
          type="button"
          aria-label="Abrir o cerrar el menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden"
        >
          {/* Icono simple dibujado con CSS */}
          <span className="flex h-8 w-8 flex-col items-center justify-center gap-1.5">
            <span
              className={`h-0.5 w-5 bg-zinc-200 transition-transform ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-zinc-200 transition-transform ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Menú desplegable de la versión móvil */}
      {menuOpen && (
        <ul className="border-t border-border/60 bg-background/95 px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-zinc-300 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}