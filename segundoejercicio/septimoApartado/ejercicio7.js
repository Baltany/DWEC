let div = document.getElementById("tablero");
// vamos a definir el tamanio del tablero
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

function sePuedeColocarBarco(tablero,filas,columnas,size,orientacion){
    for (let i = -1; i <= size; i++) {
        for (let j = -1; j <= 1; j++) {
            let f = filas + (orientacion ? j : i);
            let c = columnas + (orientacion ? i : j);

            if (f >= 0 && f < filas && c >= 0 && c < columnas) {
                if (tablero[f][c] !== 0) {
                    // Si hay un barco en la posición, no se puede colocar
                    return false; 
                }
            }
        }
    }
    return true;
}

function colocarBarco(tablero,size,cantidad){
    for (let n = 0; n < cantidad; n++) {
        let colocado = false;

        while (!colocado) {
            const orientacion = Math.random() < 0.5;
            const fila = Math.floor(Math.random() * (orientacion ? filas : filas - size + 1));
            const col = Math.floor(Math.random() * (orientacion ? columnas - size + 1 : columnas));

            if (sePuedeColocarBarco(tablero, fila, col, size, orientacion)) {
                for (let i = 0; i < size; i++) {
                    if (orientacion) {
                        tablero[fila][col + i] = size;
                    } else {
                        tablero[fila + i][col] = size;
                    }
                }
                colocado = true;
            }
        }
    }
    
}


function colocarFlota() {
    colocarBarco(tablero, 4, 1); 
    colocarBarco(tablero, 3, 2); 
    colocarBarco(tablero, 2, 3); 
    colocarBarco(tablero, 1, 2); 
}


colocarFlota();
pintarTablero(tablero);
