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
