/*
  components/Footer.tsx
  ---------------------
  Pie de página: pequeño, discreto, con el año actual y enlaces
  rápidos a las redes sociales.
*/

import { site } from "@/data/site";

/* El año se calcula en el servidor para no tener que actualizarlo a mano.
   next/font y Date.now() corren en build time, así que se renderiza una vez. */
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-zinc-500">
          © {year} {site.name.split(" ")[0]}
          <span className="font-mono text-accent">~Portafolio web</span>
        </p>
      </div>
    </footer>
  );
}