document.addEventListener('DOMContentLoaded', () => {
    mostrarProductosRecientes();
});

function mostrarProductosRecientes() {
    const contenedor = document.getElementById('contenedor-destacados');
    const productos = JSON.parse(localStorage.getItem('productosInventario')) || [];

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>Próximamente nuevas reliquias...</p>";
        return;
    }

    const recientes = [...productos].reverse().slice(0, 3);

    contenedor.innerHTML = recientes.map(p => `
        <article class="tarjeta-producto">
            <div class="imagen-producto">
                <img src="${p.img}" alt="${p.nombre}">
            </div>
            <div class="informacion-producto">
                <span class="estado-producto">Disponible</span>
                <span class="categoria-producto">${p.categoria}</span>
                <h3>${p.nombre}</h3>
                <p class="precio-producto">$${Number(p.precio).toLocaleString()}</p>
                <button class="enlace-detalles-btn" onclick="verDetallesDesdeIndex(${p.id})">Ver detalle</button>
            </div>
        </article>
    `).join('');
}

function verDetallesDesdeIndex(id) {
    window.location.href = `/pages/productos.html?id=${id}`;
}