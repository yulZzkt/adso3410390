const menuBtn = document.querySelector("#menuBtn");
const menuPrincipal = document.querySelector("#menuPrincipal");
const menuFondo = document.querySelector(".menu-fondo");
const navbar = document.querySelector("#navbar");

if (menuBtn && menuPrincipal && menuFondo && navbar) {
    const estaAbierto = () => menuPrincipal.classList.contains("activo");

    const actualizarMenu = (abrir) => {
        menuPrincipal.classList.toggle("activo", abrir);
        menuFondo.classList.toggle("activo", abrir);
        navbar.classList.toggle("menu-abierto", abrir);

        menuBtn.setAttribute("aria-expanded", String(abrir));
        menuBtn.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
        menuPrincipal.setAttribute("aria-hidden", String(!abrir));
        menuFondo.setAttribute("aria-hidden", String(!abrir));
    };

    const alternarMenu = () => actualizarMenu(!estaAbierto());

    menuBtn.addEventListener("click", (evento) => {
        evento.stopPropagation();
        alternarMenu();
    });

    menuFondo.addEventListener("click", () => actualizarMenu(false));

    menuPrincipal.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => actualizarMenu(false));
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && estaAbierto()) {
            actualizarMenu(false);
            menuBtn.focus();
        }
    });

    document.addEventListener("click", (evento) => {
        if (
            estaAbierto() &&
            !menuPrincipal.contains(evento.target) &&
            !menuBtn.contains(evento.target)
        ) {
            actualizarMenu(false);
        }
    });
}
