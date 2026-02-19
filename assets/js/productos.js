document.addEventListener('DOMContentLoaded', () => {
    inicializarTienda();
    configurarFiltros();
});

const productosSemilla = [
    { id: 1, nombre: "Pintura Renacentista", precio: 185000, categoria: "Pinturas", img: "/assets/img/img-Products/ProductoPintura1.jpg", desc: "Óleo sobre lienzo del siglo XVI. Esta obra captura la esencia del humanismo europeo con técnicas de claroscuro magistrales." },
    { id: 2, nombre: "Reloj de Bolsillo Antiguo", precio: 42500, categoria: "Relojes", img: "/assets/img/img-Products/ProductoReloj1.jpg", desc: "Mecanismo suizo de precisión del siglo XIX. Una joya de la ingeniería mecánica con caja de oro grabada a mano." },
    { id: 3, nombre: "Collar Victoriano", precio: 128000, categoria: "Joyas", img: "/assets/img/img-Products/ProductoJoya1.jpg", desc: "Pieza de la era victoriana elaborada en oro de 18k y diamantes de talla antigua. Perteneció a la aristocracia londinense." },
    { id: 4, nombre: "Escultura Bronce S.XIX", precio: 95000, categoria: "Esculturas", img: "/assets/img/img-Products/ProductoEscultura1.jpg", desc: "Escultura de bronce fundido a la cera perdida. Representa la elegancia neoclásica del París de mediados del 1800." },
    { id: 5, nombre: "Libro Raro Primera Edición", precio: 38000, categoria: "Libros", img: "/assets/img/img-Products/ProductoLibro1.jpg", desc: "Ejemplar único de 1887 en excelente estado de conservación. Encuadernación original en cuero con detalles dorados." },
    { id: 6, nombre: "Porcelana China Ming", precio: 156000, categoria: "Porcelanas", img: "/assets/img/img-Products/ProductoPorcelana1.jpg", desc: "Vaso de porcelana azul y blanca auténtica. Una reliquia que sobrevivió siglos, mostrando la maestría de la dinastía Ming." }
];

function inicializarTienda() {
    if (!localStorage.getItem('productosInventario')) {
        localStorage.setItem('productosInventario', JSON.stringify(productosSemilla));
    }
    renderizarProductos('Todas');
}

window.renderizarProductos = function(categoriaFiltro) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    const productos = JSON.parse(localStorage.getItem('productosInventario'));
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    const esAdmin = usuarioSesion && usuarioSesion.rol === 'admin';

    const productosFiltrados = categoriaFiltro === 'Todas' 
        ? productos 
        : productos.filter(p => p.categoria === categoriaFiltro);

    contenedor.innerHTML = "";

    if (productosFiltrados.length === 0 && !esAdmin) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No se encontraron reliquias.</p>`;
        return;
    }

    // 1. Renderizar primero los productos existentes
    productosFiltrados.forEach(p => {
        const card = document.createElement('article');
        card.className = 'tarjeta-producto-pagina';
        card.innerHTML = `
            ${esAdmin ? `<button class="btn-eliminar-top" onclick="eliminarProducto(${p.id})">×</button>` : ''}
            <div class="imagen-producto-pagina">
                <img src="${p.img}" alt="${p.nombre}">
            </div>
            <div class="informacion-producto-pagina">
                <span class="categoria-badge">${p.categoria}</span>
                <h3>${p.nombre}</h3>
                <p class="precio-producto-pagina">$${Number(p.precio).toLocaleString()}</p>
                <div class="acciones-producto">
                    ${esAdmin ? 
                        `<button class="btn-editar-admin" style="width: 100%;" onclick="editarProducto(${p.id})">Editar Pieza</button>` : 
                        `<button class="boton-primario" onclick="verDetallesHistoricos(${p.id})">Ver detalle</button>
                         <button class="boton-compra" onclick="intentarCompra('${p.nombre}')">Comprar</button>`
                    }
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    // 2. Renderizar el botón de creación al FINAL solo si es admin
    if (esAdmin) {
        const cardNuevo = document.createElement('article');
        cardNuevo.className = 'tarjeta-producto-pagina tarjeta-nuevo-producto';
        cardNuevo.onclick = crearNuevoProducto;
        cardNuevo.innerHTML = `
            <div class="contenido-crear">
                <div class="icono-plus">+</div>
                <span>Añadir Nueva Reliquia</span>
            </div>
        `;
        contenedor.appendChild(cardNuevo);
    }
}

window.crearNuevoProducto = () => {
    const modalHTML = `
        <div id="modal-crear-producto" class="overlay-detalle">
            <div class="tarjeta-historica-emergente" style="max-width: 500px;">
                <button class="boton-cerrar-modal" onclick="cerrarModalCrear()">&times;</button>
                <div class="info-detalle-contenedor">
                    <h2 style="color: var(--color-primario); margin-bottom: 20px; text-align: center;">Nueva Reliquia</h2>
                    
                    <form id="form-nueva-reliquia" style="display: flex; flex-direction: column; gap: 15px;">
                        <input type="text" id="nuevo-nombre" placeholder="Nombre de la pieza" required class="input-admin-custom">
                        
                        <input type="number" id="nuevo-precio" placeholder="Precio (solo números)" required class="input-admin-custom">
                        
                        <select id="nueva-categoria" required class="input-admin-custom">
                            <option value="">Seleccione Categoría</option>
                            <option value="Pinturas">Pinturas</option>
                            <option value="Relojes">Relojes</option>
                            <option value="Joyas">Joyas</option>
                            <option value="Esculturas">Esculturas</option>
                            <option value="Libros">Libros</option>
                            <option value="Porcelanas">Porcelanas</option>
                        </select>
                        
                        <textarea id="nueva-desc" placeholder="Historia de la pieza..." class="input-admin-custom" style="min-height: 80px;"></textarea>
                        
                        <div class="contenedor-upload-custom">
                            <label for="nuevo-archivo" class="label-archivo-custom" id="texto-archivo">
                                📷 Seleccionar Fotografía
                            </label>
                            <input type="file" id="nuevo-archivo" accept="image/*" required onchange="actualizarNombreArchivo(this)">
                        </div>

                        <button type="submit" class="boton-compra" style="width: 100%; margin-top: 10px; padding: 12px;">Guardar en Catálogo</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';

    document.getElementById('form-nueva-reliquia').onsubmit = function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('nuevo-archivo');
        const archivo = fileInput.files[0];

        const lector = new FileReader();
        lector.onload = function(event) {
            const contenidoImagen = event.target.result;
            const productos = JSON.parse(localStorage.getItem('productosInventario')) || [];

            const nuevoProducto = {
                id: Date.now(),
                nombre: document.getElementById('nuevo-nombre').value,
                precio: parseInt(document.getElementById('nuevo-precio').value),
                categoria: document.getElementById('nueva-categoria').value,
                img: contenidoImagen,
                desc: document.getElementById('nueva-desc').value || "Descripción histórica en proceso..."
            };

            productos.push(nuevoProducto);
            localStorage.setItem('productosInventario', JSON.stringify(productos));
            
            cerrarModalCrear();
            renderizarProductos('Todas');
            alert("¡Pieza catalogada con éxito!");
        };
        lector.readAsDataURL(archivo);
    };
};

// Función para mostrar que el archivo fue seleccionado
window.actualizarNombreArchivo = (input) => {
    const label = document.getElementById('texto-archivo');
    if (input.files && input.files.length > 0) {
        label.innerHTML = `✅ Imagen: ${input.files[0].name.substring(0, 20)}...`;
        label.style.borderColor = "var(--color-exito)";
        label.style.color = "var(--color-exito)";
    }
};

window.cerrarModalCrear = () => {
    const modal = document.getElementById('modal-crear-producto');
    if (modal) modal.remove();
    document.body.style.overflow = 'auto';
};

window.eliminarProducto = (id) => {
    if(confirm('¿Desea retirar esta pieza del Archivo Histórico permanentemente?')) {
        let productos = JSON.parse(localStorage.getItem('productosInventario'));
        productos = productos.filter(p => p.id !== id);
        localStorage.setItem('productosInventario', JSON.stringify(productos));
        renderizarProductos('Todas');
    }
};

window.editarProducto = (id) => {
    let productos = JSON.parse(localStorage.getItem('productosInventario'));
    const p = productos.find(prod => prod.id === id);
    
    const nuevoNombre = prompt("Nombre de la reliquia:", p.nombre);
    const nuevoPrecio = prompt("Valor de la pieza ($):", p.precio);
    
    if(nuevoNombre && nuevoPrecio) {
        p.nombre = nuevoNombre;
        p.precio = parseInt(nuevoPrecio);
        localStorage.setItem('productosInventario', JSON.stringify(productos));
        renderizarProductos('Todas');
    }
};

function verDetallesHistoricos(id) {
    const productos = JSON.parse(localStorage.getItem('productosInventario'));
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const modalHTML = `
        <div id="modal-detalle-reliquia" class="overlay-detalle">
            <div class="tarjeta-historica-emergente">
                <button class="boton-cerrar-modal" onclick="cerrarDetalle()">&times;</button>
                <div class="cuerpo-tarjeta-detalle">
                    <div class="imagen-detalle-contenedor">
                        <img src="${producto.img}" alt="${producto.nombre}">
                    </div>
                    <div class="info-detalle-contenedor">
                        <span class="sello-autenticidad">Archivo Histórico Pangea</span>
                        <h2>${producto.nombre}</h2>
                        <p class="epoca">Categoría: ${producto.categoria} | Estado: Auténtico</p>
                        <div class="separador-dorado"></div>
                        <p class="texto-historia">${producto.desc || "Descripción histórica en proceso de catalogación..."}</p>
                        <div class="pie-tarjeta-detalle">
                            <p class="precio-detalle">$${Number(producto.precio).toLocaleString()}</p>
                            <button class="boton-compra" onclick="intentarCompra('${producto.nombre}')">Adquirir ahora</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function cerrarDetalle() {
    const modal = document.getElementById('modal-detalle-reliquia');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function configurarFiltros() {
    const links = document.querySelectorAll('.filtro-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = e.target.getAttribute('data-categoria');
            links.forEach(l => l.style.color = "var(--color-texto-claro)");
            e.target.style.color = "var(--color-primario)";
            renderizarProductos(cat);
        });
    });
}

function intentarCompra(nombreArticulo) {
    const sesionActiva = localStorage.getItem('usuarioSesion');
    if (!sesionActiva) {
        alert(`Para adquirir "${nombreArticulo}", primero debes iniciar sesión.`);
        window.location.href = "/pages/login.html";
    } else {
        const datosUsuario = JSON.parse(sesionActiva);
        alert(`¡Excelente elección, ${datosUsuario.nombre}! El artículo "${nombreArticulo}" ha sido reservado para su evaluación.`);
    }
}