const primitiva = document.getElementById("primitiva");


// creamos la vista del usuario,la tabla
function crearTabla(){
    // inicializamos la tabla que empieza en uno y acaba en 49
    // y la tabla tiene 7 filas y 7 columnas
    let numero = 1;
    for (let i = 0; i < 7; i++) {
        const fila = document.createElement("tr");
        for(let j = 0;j < 7 && numero <= 49;j++){
            const celda = document.createElement("td");
            celda.id = "celda-" + numero;
            fila.appendChild(celda);
            numero++;

        }
        primitiva.appendChild(fila);
    }
}

// funcion que genera numero aleatorios
function generarAleatorio(){
    const numeros = [];
    while(numeros.length < 6){
        // generamos un numero aleatorio entre 1 y 49
        const random = Math.floor(Math.random() * 49) + 1;
        numeros.push(random);
    }
    return numeros;
}

// para volver a jugar limpiamos la tabla
function limpiarTabla(){
    //limpiamos celda a celda
    for(let i=1;i<=49;i++){
        const celda = document.getElementById("celda-" + i);
        celda.textContent = i;
    }
}

function apostar(){
    limpiarTabla();
    const apuesta = generarAleatorio();
    for(const numero of apuesta){
        const celda = document.getElementById("celda-" + numero);
        celda.classList.add("apuesta");
        celda.textContent = "X";

    }
}


crearTabla();