function intentarCompra() {
    const sesionActiva = localStorage.getItem('usuarioSesion');

    if (!sesionActiva) {
        alert("Para realizar una compra, primero debes iniciar sesión.");
        window.location.href = "/pages/login.html";
    } else {
        const datosUsuario = JSON.parse(sesionActiva);
        alert(`¡Gracias por tu interés, ${datosUsuario.nombre}! Redirigiéndote al checkout...`);
    }
}