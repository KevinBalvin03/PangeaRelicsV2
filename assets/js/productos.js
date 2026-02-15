document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    inicializarFiltros();
    inicializarOrdenamiento();
    inicializarFavoritos();
});

function inicializarMenuMobile() {
    const botonMenu = document.getElementById('botonMenu');
    const navegacion = document.querySelector('.navegacion');

    if (botonMenu) {
        botonMenu.addEventListener('click', () => {
            navegacion.classList.toggle('activa');
            botonMenu.classList.toggle('activo');
        });
    }
}

function inicializarFiltros() {
    const checkboxesCategorias = document.querySelectorAll('input[name="categoria"]');
    const radioPrecio = document.querySelectorAll('input[name="precio"]');
    const checkboxDisponibilidad = document.querySelectorAll('input[name="disponibilidad"]');

    const aplicarFiltros = () => {
        const categorias = Array.from(checkboxesCategorias)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        const precio = Array.from(radioPrecio)
            .find(rb => rb.checked)?.value;
        
        const disponibilidad = Array.from(checkboxDisponibilidad)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        console.log('Filtros aplicados:', {
            categorias,
            precio,
            disponibilidad
        });
    };

    checkboxesCategorias.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    radioPrecio.forEach(rb => rb.addEventListener('change', aplicarFiltros));
    checkboxDisponibilidad.forEach(cb => cb.addEventListener('change', aplicarFiltros));
}

function inicializarOrdenamiento() {
    const selectOrdenar = document.querySelector('.ordenar-productos');

    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', (e) => {
            console.log('Orden seleccionado:', e.target.value);
        });
    }
}

function inicializarFavoritos() {
    const botonosFavorito = document.querySelectorAll('.boton-favorito');

    botonosFavorito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            boton.classList.toggle('agregado');
            boton.textContent = boton.classList.contains('agregado') ? '♥' : '♡';
        });
    });
}
