document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    inicializarAnimacionesScroll();
});

function inicializarMenuMobile() {
    const botonMenu = document.getElementById('botonMenu');
    const navegacion = document.querySelector('.navegacion');

    if (botonMenu) {
        botonMenu.addEventListener('click', () => {
            navegacion.classList.toggle('activa');
            botonMenu.classList.toggle('activo');
        });

        document.querySelectorAll('.enlace-nav').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navegacion.classList.remove('activa');
                botonMenu.classList.remove('activo');
            });
        });
    }
}

function inicializarAnimacionesScroll() {
    const elementos = document.querySelectorAll('.tarjeta-mision-vision, .tarjeta-valor, .tarjeta-miembro, .evento-timeline');
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(elemento);
    });
}
