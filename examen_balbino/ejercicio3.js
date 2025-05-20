//invertir texto
document.getElementById("invertir").addEventListener("click", function() {
    let parrafo = document.getElementById("parrafo");
    let palabras = parrafo.innerText.split(" ");
    let palabrasInvertidas = palabras.reverse().join(" ");
    parrafo.innerText = palabrasInvertidas;
});

//ocultar texto
document.getElementById("ocultar").addEventListener("click", function() {
    let parrafo = document.getElementById("parrafo");
    parrafo.style.display = "none";
});

//poner en mayusculad
document.getElementById("mayusculas").addEventListener("click", function() {
    let parrafo = document.getElementById("parrafo");
    parrafo.innerText = parrafo.innerText.toUpperCase();
});