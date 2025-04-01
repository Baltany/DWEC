// 1) Realizar una función javascript que invierta las palabras de una cadena de texto,  
// Ej: invertir(“Miguel Angel”) devolverá “legnA leugiM”.  
// Nota: Array.from(), split(), spread operator, for of

function invertirPalabras(str){
    let reversedStr = str.split(" ");
    let reversedWords = [];
    for (let i = 0;i < reversedStr.length; i++){  
        let reverse = [...reversedStr[i]].reverse().join("");
        reversedWords.push(reverse);
    }
    return reversedWords.reverse().join(" ");
}
console.log(invertirPalabras("Miguel Angel"));

