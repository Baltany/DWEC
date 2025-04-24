function numAleatorio(){
    return Math.floor(Math.random() * 256);
}

window.onload = function() {
    // Generar color RGB aleatorio a partir de numAleatorio
    const r = numAleatorio();
    const g = numAleatorio();
    const b = numAleatorio();

    // Aplicar el color como fondo
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Pedir un numero al usuario
    const entrada = prompt("Introduce un numero: ");

    // Hacemos la comprobacion si es numero o no
    if (!isNaN(entrada) && entrada.trim() !== "") {
        alert("Has introducido un número válido.");
    } else {
    alert("Eso no es un número válido.");
    }
};