let enviar = document.getElementById("enviar");

enviar.addEventListener("click", function(){
    event.preventDefault();
    let numero = parseInt(document.getElementById("numero").value);
    console.log("El factorial del numero es: " + factorial(numero));
})

// 5 su factorial sería 5*4*3*2*1 = 120
function factorial(numero){
    // si el numero es 0 o 1 el factorial es 1
    if(numero === 0 || numero === 1){
        return 1;
    }else{
        // si el numero es mayor que 1 el factorial es el numero por el factorial del numero - 1
        return numero * factorial(numero - 1);
    }

}