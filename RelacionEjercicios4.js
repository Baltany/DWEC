// 1) Realizar una función javascript que invierta las palabras de una cadena de texto,  
// Ej: invertir(“Miguel Angel”) devolverá “legnA leugiM”.  
// Nota: Array.from(), split(), spread operator, for of

/* Función invertir cadena realizada con un fori */ 
function invertirPalabras(str){
    let reversedStr = str.split(" ");
    let reversedWords = [];
    /*recorremos la cadena con un fori para ir invirtiendo las palabras*/
    for (let i = 0;i < reversedStr.length; i++){  
        // nos creamos una variable con la cual vamos a invertir la palabra,
        // necesitamos el join para unirlo y usamos el spread operator para
        // crear una copia del array y convertirlo con reverse
        let reverse = [...reversedStr[i]].reverse().join("");
        // añadimos la palabra invertida al array
        reversedWords.push(reverse);
    }
    // devolvemos el array con las palabras invertidas, unidas por un espacio
    //  y otra vez invertido para que  nos lo devuelva como pide el ejercicio
    return reversedWords.reverse().join(" ");
}
console.log(invertirPalabras("Miguel Angel"));


// 2)  Realizar una función javascript con notación “Arrow function” para contar el número de veces que se 
// repite una subcadena en una cadena de  texto  
// Ej:  contarVecesCadenaEnTexto(“estoy”, "estoy en el parque porque estoy aburrido") devolverá 2.  
// Nota: indexOf(), y luego intentarlo con includes() 

const contarPalabrasRepetidas = (str,strSearch) =>{
    let cont = 0;
    for(let i =0; i < str.length; i++){
        if(str.includes(strSearch)){
            cont++;
        }
    }
    return cont;

}

console.log(contarPalabrasRepetidas("estoy en el parque porque estoy aburrido","estoy"));