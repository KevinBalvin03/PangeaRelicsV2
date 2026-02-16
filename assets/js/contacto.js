document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    inicializarFormulario();
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

function inicializarFormulario() {
    const formulario = document.getElementById('formularioContacto');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const datos = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                tema: document.getElementById('tema').value,
                mensaje: document.getElementById('mensaje').value
            };

            validarYEnviarFormulario(datos);
        });
    }
}

function validarYEnviarFormulario(datos) {
    if (!datos.nombre.trim()) {
        mostrarError('Por favor completa el nombre');
        return;
    }

    if (!datos.correo.trim() || !esEmailValido(datos.correo)) {
        mostrarError('Por favor ingresa un correo válido');
        return;
    }

    if (!datos.tema) {
        mostrarError('Por favor selecciona un tema');
        return;
    }

    if (!datos.mensaje.trim()) {
        mostrarError('Por favor escribe un mensaje');
        return;
    }

    enviarFormulario(datos);
}

function esEmailValido(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

function mostrarError(mensaje) {
    alert(mensaje);
}

function enviarFormulario(datos) {
    console.log('Formulario enviado:', datos);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    document.getElementById('formularioContacto').reset();
}
