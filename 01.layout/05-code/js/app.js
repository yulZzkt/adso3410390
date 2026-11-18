<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollBehavior = () => (prefersReducedMotion.matches ? 'auto' : 'smooth');

    /* ---------- Menú overlay ---------- */

    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('siteMenu');

    const isMenuOpen = () => menu.classList.contains('is-open');

    function openMenu() {
        document.body.classList.add('menu-open');
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Cerrar menú');

        // Reinicia el "sobresalto" del bombillo antes de desplegar el menú.
        menuBtn.classList.remove('is-jolting');
        void menuBtn.offsetWidth;
        menuBtn.classList.add('is-jolting');

        const firstLink = menu.querySelector('a');
        if (firstLink) {
            window.setTimeout(() => {
                if (isMenuOpen()) firstLink.focus({ preventScroll: true });
            }, prefersReducedMotion.matches ? 0 : 500);
        }
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir menú');

        if (menu.contains(document.activeElement)) {
            menuBtn.focus({ preventScroll: true });
        }
    }

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            isMenuOpen() ? closeMenu() : openMenu();
        });

        menuBtn.addEventListener('animationend', () => {
            menuBtn.classList.remove('is-jolting');
        });

        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeMenu();
                return;
            }
            if (event.target === menu) closeMenu();
        });

        document.addEventListener('click', (event) => {
            if (!isMenuOpen()) return;
            if (menuBtn.contains(event.target) || menu.contains(event.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen()) closeMenu();
        });
    }

    /* ---------- Carruseles con un solo botón "siguiente" ---------- */

    function setupCarousel(trackId, buttonId) {
        const track = document.getElementById(trackId);
        const button = document.getElementById(buttonId);
        if (!track || !button) return;

        button.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;

            // Si no hay nada que desplazar, no hace nada.
            if (maxScroll <= 1) return;

            const firstCard = track.firstElementChild;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap) || 0;
            const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : track.clientWidth;
            const step = cardWidth + gap;
            const isAtEnd = track.scrollLeft >= maxScroll - 8;

            // Solo avanza a la derecha; al llegar al final vuelve al inicio.
            track.scrollTo({
                left: isAtEnd ? 0 : Math.min(track.scrollLeft + step, maxScroll),
                behavior: scrollBehavior(),
            });
        });
    }

    setupCarousel('pistaPersonajes', 'nextbtn');
    setupCarousel('pistaLugares', 'flechaLugares');
});
>>>>>>> 25c00e4dd865636268b04a2fbda59bb1838fd72f
