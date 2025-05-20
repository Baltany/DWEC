// Crear una matriz de 10X10 que se rellene con números aleatorios entre 10 y 80 y mostrarla en pantalla. Debajo mostrar
// otra idéntica pero en la que se invierta primero la primera fila con la última fila y después se invierta la primera columna
// con la última coluna (2 puntos)


const matriz = document.getElementById("matrizOriginal");
const matrizInvertida = document.getElementById("matrizInvertida");
const filas = 10;
const columnas = 10;

const tablero = [];
for(let i = 0; i < filas; i++){
    tablero[i] = [];
    for(let j = 0; j < columnas; j++){
        tablero[i][j] = 0;
    }
}


// pintamos la matriz original
for(let i = 0; i < filas; i++){
    const fila = [];
    for(let j = 0; j < columnas; j++){
        fila.push(getRandomInt(10, 80));
    }
    tablero.push(fila);
}
console.log(tablero);

// pintamos la matriz invertida
for(let i = 0; i < filas; i++){
    const fila = [];
    for(let j = 0; j < columnas; j++){
        fila.push(tablero[filas - 1 - i][j]);
    }
    tablero.push(fila);
}
console.log(tablero);


// rellanar la matriz de numeros aleatorios entre el 10 y 80
function generarAleatorio(){
    const numeros = [];
    while(numeros.length < 11){
        const random = Math.floor(Math.random() * 80) + 10;
        numeros.push(random);
    }
    return numeros;
}

// Comproibando que el numero aleatorio da entre 10-80
console.log(generarAleatorio());

//rellenamos la matriz con numeros aleatorios
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// function crearMatriz(){
//     // yo he puesto que empiece en 10 pero pdría haber cogido un numeor aletaroio
//     let numero = 1;
//     for(let i = 0; i < 10 ;i++){
//         const fila = document.createElement("tr");
//         for(let j = 0;j < 10;j++){
//             const celda = document.createElement("td");
//             celda.id = "celda-" + numero;
//             fila.appendChild(celda);
//             numero++;
//         }
//     matriz.appendChild(fila);
//     }
// }

