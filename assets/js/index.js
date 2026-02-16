document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    inicializarAnimaciones();
});

function inicializarMenuMobile() {
    const botonMenu = document.getElementById('botonMenu');
    const navegacion = document.querySelector('.navegacion');

    if (botonMenu) {
        botonMenu.addEventListener('click', () => {
            navegacion.classList.toggle('activa');
            botonMenu.classList.toggle('activo');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.encabezado')) {
                navegacion.classList.remove('activa');
                botonMenu.classList.remove('activo');
            }
        });

        document.querySelectorAll('.enlace-nav').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navegacion.classList.remove('activa');
                botonMenu.classList.remove('activo');
            });
        });
    }
}

function inicializarAnimaciones() {
    const elementos = document.querySelectorAll('[data-animar]');
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animado');
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach(elemento => observador.observe(elemento));
}
