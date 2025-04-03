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
    // Como estamos contando una palabra las veces que se repite 
    // si es que esta cadena que buscamos se repite de ahí el -1,sino encunetra nada retorna 0
    let cont = 0;
    let index = str.indexOf(strSearch);
    while(index != -1){
        cont++;
        index = str.indexOf(strSearch,index + 1);
    }
    return cont;

}

console.log(contarPalabrasRepetidas("estoy en el parque porque estoy aburrido","estoy"));


// 3) Realizar una función javascript que elimine una subcadena de texto de un texto dado 
// Ej:eliminarSubcadena("xyz1, xyz2, xyz3, xyz4 y xyz5", "xyz") devolverá "1, 2, 3, 4 y 5” . 
// Nota: replace()
let str = "xyz1, xyz2, xyz3, xyz4 y xyz5";
//la g en el regex lo que hace es que busque todas las coincidencias consecutivas
let regex = /xyz/g;
function eliminarSubcadena(str,subCadena){
    return str.replace(subCadena,"");
}
console.log(eliminarSubcadena(str,regex));



// 4) Realizar una  función javascript que reciba un número y compruebe si es capicúa o no
function esCapicua(num){
    // Importante pasar los numeros a cadena para poder darle la vuelta
    // y compararlos, si no lo hacemos no nos funcionara
    let strNum = num.toString();
    //Importante suar split para separarlos,reverse para darle la vuelta y join para unirlos de nuevo
    if (strNum.split('').reverse().join('') === strNum){
        return true;
    } else{
        return false;
    }
}

console.log(esCapicua(12321)); // true
console.log(esCapicua(12345)); // false


// 5) Realizar una función javascript que dada una fecha, devuelva cuantos años han pasado hasta la fecha actual 

