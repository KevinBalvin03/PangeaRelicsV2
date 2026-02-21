document.addEventListener("DOMContentLoaded", function () {
    cargarComponente("header", "/components/header.html");
    cargarComponente("footer", "/components/footer.html");
});

function cargarComponente(id, ruta) {
    fetch(ruta)
        .then(response => {
            if (!response.ok) throw new Error("Error cargando " + ruta);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === "header") {
                gestionarSesionEnHeader();
            }
        })
        .catch(error => console.error(error));
}

function gestionarSesionEnHeader() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    const usuarioSesion = JSON.parse(sessionStorage.getItem('usuarioSesion'));

    if (usuarioSesion) {
        authContainer.innerHTML = `
            <li class="enlace-nav nombre-usuario-saludo">
                Hola, ${usuarioSesion.nombre}
            </li>
            <li>
                <a href="#" id="cerrar-sesion" class="enlace-nav boton-logout">
                    Cerrar Sesión
                </a>
            </li>
        `;

        document.getElementById('cerrar-sesion').addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('usuarioSesion');
            window.location.href = "/index.html"; 
        });
    }
}