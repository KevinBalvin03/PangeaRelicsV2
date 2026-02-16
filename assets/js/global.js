document.addEventListener("DOMContentLoaded", function () {

    cargarComponente("header", "/components/header.html");
    cargarComponente("footer", "/components/footer.html");

});

function cargarComponente(id, ruta) {
    fetch(ruta)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error cargando " + ruta);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(error));
}