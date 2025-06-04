// apartado a
function verAveria() {
    const checkboxes = document.querySelectorAll('input[name="sintoma"]:checked');
    let sintoma = [];
    checkboxes.forEach((s) => sintoma.push(s.value));
    console.log(sintoma)
}

document
    .querySelectorAll('input[name="sintoma"]')
    .forEach((checkbox) => {
        checkbox.addEventListener('change', verAveria);
    });
verAveria();

// apartado b

document
    .getElementById("descripcion")
    .addEventListener("focus", function () {
        this.style.backgroundColor = "black";
        this.style.color = "white";
    });

// apartado c
document
    .getElementById("tipoReparacion")
    .addEventListener("change", function () {
        const valor = this.value;
        const contenedor = document.getElementById("contenedorMarcaModelo");
        contenedor.innerHTML = "";

        if (valor === "portatil") {
            const marca = document.createElement("input");
            marca.placeholder = "Marca";
            marca.name = "marca";

            const modelo = document.createElement("input");
            modelo.placeholder = "Modelo";
            modelo.name = "modelo";

            contenedor.appendChild(marca);
            contenedor.appendChild(modelo);
        }
    });

// apartado d
function validarFormulario() {
    const nombre = document
        .getElementById("nombre")
        .value;
    const apellidos = document
        .getElementById("apellidos")
        .value;
    const telefono = document
        .getElementById("telefono")
        .value;
    const serie = document
        .getElementById("serie")
        .value;
    const tipo = document
        .getElementById("tipoReparacion")
        .value;
    const sintomas = document.querySelectorAll('input[name="sintomas"]:checked');

    if (!nombre || !apellidos || !telefono || !serie || !tipo || sintomas.length === 0) {
        alert("Por favor, rellene todos los campos obligatorios.");
        return false;
    }
    return true;
}

// apartado e
function validarContrasena(pass) {
    const patron = /^_[0-9]{3}[A-Z][a-z]_$/
    return patron.test(pass);
}
