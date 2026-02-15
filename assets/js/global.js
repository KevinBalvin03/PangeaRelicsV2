document.addEventListener('DOMContentLoaded', () => {
    aplicarTemaGlobal();
});

function aplicarTemaGlobal() {
    const temaGuardado = localStorage.getItem('tema') || 'claro';
    aplicarTema(temaGuardado);
}

function aplicarTema(tema) {
    if (tema === 'oscuro') {
        document.documentElement.style.setProperty('--color-texto-principal', '#f0f0f0');
        document.documentElement.style.setProperty('--color-oscuro', '#0a0a0a');
    } else {
        document.documentElement.style.setProperty('--color-texto-principal', '#333');
        document.documentElement.style.setProperty('--color-oscuro', '#1a1a1a');
    }
    localStorage.setItem('tema', tema);
}

function rastrearEvento(evento, datos) {
    console.log('Evento:', evento, 'Datos:', datos);
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(precio);
}

function obtenerParametroURL(parametro) {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get(parametro);
}
