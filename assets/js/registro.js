const formularioRegistro = document.querySelector('.formulario-auth');

formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const confirma = document.getElementById('confirma').value;
    const terminos = document.getElementById('terminos').checked;

    if (!nombre || !correo || !telefono || !contrasena || !confirma) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (contrasena !== confirma) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!terminos) {
        alert("Debes aceptar los términos y condiciones.");
        return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const correoExiste = usuariosGuardados.find(user => user.correo === correo);
    if (correoExiste) {
        alert("Este correo ya está registrado.");
        return;
    }

    const nuevoUsuario = {
        nombre,
        correo,
        telefono,
        contrasena,
        id: Date.now()
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    localStorage.setItem('usuarioSesion', JSON.stringify({
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        loginAt: new Date().toLocaleString()
    }));

    alert("¡Registro e inicio de sesión exitoso!");
    window.location.href = "/index.html"; 
});