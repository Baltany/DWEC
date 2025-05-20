// Crear una matriz de 10X10 que se rellene con números aleatorios entre 10 y 80 y mostrarla en pantalla. Debajo mostrar
// otra idéntica pero en la que se invierta primero la primera fila con la última fila y después se invierta la primera columna
// con la última coluna (2 puntos)

const matriz = document.getElementById("matriz");

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

function crearMatriz(){
    for(let i = 0; i < 10 ;i++){
        const fila = document.createElement("tr");
        for(let j = 0;j < 10;j++){
            const celda = document.createElement("td");
            //celda.id = 
        }
    }
}