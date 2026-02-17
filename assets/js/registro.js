const formulario = document.querySelector('.formulario-auth');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirma = document.getElementById('confirma').value;

    if (contrasena !== confirma) {
        alert('Las contraseñas no son iguales');
        return;
    }

    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('correoUsuario', correo);
    localStorage.setItem('telefonoUsuario', telefono);
    localStorage.setItem('contrasenaUsuario', contrasena);

    alert('Cuenta creada exitosamente');

    formulario.reset();
});
