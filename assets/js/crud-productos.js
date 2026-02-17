let productos = JSON.parse(localStorage.getItem('listaProductos')) || [];

function guardar() {
    localStorage.setItem('listaProductos', JSON.stringify(productos));
    mostrarProductos();
}

function crear(nombre, precio, categoria) {
    const producto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        categoria: categoria
    };
    productos.push(producto);
    guardar();
}

function leer() {
    return productos;
}

function actualizar(id, nombre, precio, categoria) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto.nombre = nombre;
        producto.precio = precio;
        producto.categoria = categoria;
        guardar();
    }
}

function eliminar(id) {
    productos = productos.filter(p => p.id !== id);
    guardar();
}

function mostrarProductos() {
    const contenedor = document.getElementById('contenedorProductos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const articulo = document.createElement('article');
        articulo.className = 'tarjeta-producto-pagina';
        articulo.innerHTML = `
            <div class="imagen-producto-pagina">
                <img src="/assets/img/img-Products/ProductoPintura1.jpg" alt="${producto.nombre}">
            </div>
            <div class="informacion-producto-pagina">
                <span class="categoria-badge">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p class="descripcion-corta">Producto de ${producto.categoria}</p>
                <p class="precio-producto-pagina">$${producto.precio}</p>
                <div class="acciones-producto">
                    <button class="boton boton-primario btn-editar" data-id="${producto.id}">Editar</button>
                    <button class="boton boton-secundario btn-eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(articulo);
    });

    agregarEventosProductos();
}

function agregarEventosProductos() {
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            if (producto) {
                const nuevoNombre = prompt('Nuevo nombre:', producto.nombre);
                if (nuevoNombre) {
                    const nuevoPrecio = prompt('Nuevo precio:', producto.precio);
                    if (nuevoPrecio) {
                        actualizar(id, nuevoNombre, nuevoPrecio, producto.categoria);
                    }
                }
            }
        });
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (confirm('Eliminar este producto?')) {
                eliminar(id);
            }
        });
    });
}

const formulario = document.getElementById('formProducto');
if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('inputNombre').value;
        const precio = document.getElementById('inputPrecio').value;
        const categoria = document.getElementById('inputCategoria').value;

        if (nombre && precio && categoria) {
            crear(nombre, precio, categoria);
            formulario.reset();
            alert('Producto creado');
        }
    });
}

mostrarProductos();
