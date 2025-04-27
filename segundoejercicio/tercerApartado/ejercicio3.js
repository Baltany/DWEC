// Crear una aplicación Web que pida en la misma el nombre, edad y salario base de una persona (no hace falta 
//     validar los datos), de modo que al final muestre un nuevo cuadro de texto denominado salario final, cuyo 
//     contenido se rellenará de acuerdo a los siguientes supuestos: 
//     a. Si el salario es superior a 2000 euros no se le hace ningún ajuste adicional. 
//     b. Si el salario está entre 1000 y 2000 euros y la persona es mayor de 50 años el salario final será el salario base 
//     incrementado en un 10%, pero si la persona cobra ese salario con edad inferior a 50 el salario base se 
//     incrementará solo en un 5%. 
//     c. Si el salario es menor de 1000 euros y la edad se encuentra entre 50 y 60 años, el salario base se verá 
//     incrementado en un 15%, mientras que si la persona es menor de 50 años, el salario base se incrementa 
//     solamente un 7,5%, y, si la persona tiene más de 60 años, el salario base se incrementará en un 20% 


let enviar = document.getElementById("enviar");

enviar.addEventListener("click", function(){
    // para no perder la información del formulario una vez se envia
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let edad = parseInt(document.getElementById("edad").value);
    let salario = parseInt(document.getElementById("salario").value);

    if(salario>2000){
        alert("No se realizo ningun ajuste adicional");
        
    }else if (salario>=1000 && salario<=2000 ){
        if(edad>50){
            salario += salario * 0.1;
            alert("Su salario ahora es de: " + salario);
        }else{
            salario += salario * 0.05;
            alert("Su salario ahora es de: " + salario);
        }
    }else if (salario<1000){
        if(edad>=50 && edad <= 60){
            salario += salario * 0.15; 
            alert("Su salario ahora es de: " + salario);

        }else if(edad>50){
            salario += salario * 0.075;
            alert("Su salario ahora es de: " + salario);

        } else if (edad > 60) {
            salario += salario * 0.20;
            alert("Su salario ahora es de: " + salario);

        }


    }

    //console.log(nombre,edad,salario);
})

