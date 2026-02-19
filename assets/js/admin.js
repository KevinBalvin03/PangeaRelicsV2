function verificarCodigo() {
    const inputCodigo = document.getElementById('codigo-acceso');
    const codigoIngresado = inputCodigo.value;
    const errorMsg = document.getElementById('error-acceso');
    
    const CODIGO_CORRECTO = "1234"; 

    if (codigoIngresado === CODIGO_CORRECTO) {
        const usuarioAdmin = {
            nombre: "Administrador",
            rol: "admin",
            estaLogueado: true,
            fechaIngreso: new Date().toLocaleString()
        };

        localStorage.setItem('usuarioSesion', JSON.stringify(usuarioAdmin));

        window.location.href = "productos.html"; 
        
    } else {
        errorMsg.style.display = 'block';
        inputCodigo.value = '';
        inputCodigo.focus();

        const tarjeta = document.querySelector('.tarjeta-seguridad');
        if (tarjeta) {
            tarjeta.style.animation = 'none';
            setTimeout(() => {
                tarjeta.style.animation = 'vibrar 0.3s';
            }, 10);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputCodigo = document.getElementById('codigo-acceso');

    if (inputCodigo) {
        inputCodigo.focus();

        inputCodigo.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verificarCodigo();
            }
        });
    }
});