let cifrar = document.getElementById("cifrar");

cifrar.addEventListener("click", function(){
    event.preventDefault();
    let msg = document.getElementById("mensaje").value;
    // posicion aleatorio que se va a desplazar 1-25 segun abecedario
    let desplazamiento = Math.floor(Math.random() * 25) + 1;
    let msgCifrado = cifrarMensaje(msg, desplazamiento);
    document.getElementById("resultadoCifrado").innerHTML = msgCifrado;


});

function cifrarMensaje(msg,desplazamiento){
    let resultado = "";
    // Primero recorremos el mensaje que nos llega
    for(let i=0; i<msg.length;i++){
        let c = msg[i];
        // Comprobamos que es una cadena,i significa ignoreCase
        if(c.match(/[a-z]/i)){
            let codigo = msg.charCodeAt(i);

            // Letras mayúsculas
            if (codigo >= 65 && codigo <= 90) {
            c = String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
            }
            // Letras minúsculas
            else if (codigo >= 97 && codigo <= 122) {
            c = String.fromCharCode(((codigo - 97 + desplazamiento) % 26) + 97);
            }
        }
        resultado += c;
        
    }
    return resultado;

}