let div = document.getElementById("tablero");
// vamos a definir el tamaño del tablero
let filas = 10;
let columnas = 10;
// creamos con array que es el tablero lleno de 0 con el fill bidimensional
const tablero = Array.from({length:filas},() => Array(columnas).fill(0));



function pintarTablero(tablero){
    div.innerHTML = "";
    const tabla = document.createElement("table");

    for (let i = 0; i < filas; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columnas; j++) {
            const td = document.createElement("td");
            // mostramos barco
            td.textContent = tablero[i][j] !== 0 ? "■" : "";
            td.style.width = "30px";
            td.style.height = "30px";
            td.style.border = "1px solid black";
            td.style.textAlign = "center";
            tr.appendChild(td);
        }
    tabla.appendChild(tr);
    }
    div.appendChild(tabla);

}