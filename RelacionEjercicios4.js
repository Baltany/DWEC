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
        // necesitamos el join para unirlo
        let reverse = [...reversedStr[i]].reverse().join("");
        // añadimos la palabra invertida al array
        reversedWords.push(reverse);
    }
    // devolvemos el array con las palabras invertidas, unidas por un espacio
    //  y otra vez invertido para que  nos lo devuelva como pide el ejercicio
    return reversedWords.reverse().join(" ");
}
console.log(invertirPalabras("Miguel Angel"));

