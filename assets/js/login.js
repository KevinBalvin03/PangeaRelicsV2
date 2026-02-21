const botonLogin = document.getElementById('btn-login');

botonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');
    const correoValue = correoInput.value.trim();
    const contrasenaValue = contrasenaInput.value.trim();

    if (correoValue === "" || contrasenaValue === "") {
        alert("Por favor, completa todos los campos obligatorios.");

        if(correoValue === "") correoInput.style.borderColor = "red";
        if(contrasenaValue === "") contrasenaInput.style.borderColor = "red";
        return; 
    }

    correoInput.style.borderColor = "";
    contrasenaInput.style.borderColor = "";

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuariosGuardados.find(user => user.correo === correoValue);

    if (!usuarioEncontrado) {
        alert("Los datos ingresados no coinciden con ninguna cuenta. Por favor, verifica o regístrate.");
        return;
    }

    if (usuarioEncontrado.contrasena !== contrasenaValue) {
        alert("La contraseña es incorrecta. Inténtalo de nuevo.");
        return;
    }

    alert(`¡Bienvenido, ${usuarioEncontrado.nombre}!`);

    sessionStorage.setItem('usuarioSesion', JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo,
        telefono: usuarioEncontrado.telefono
    }));

    window.location.href = "/index.html";
});