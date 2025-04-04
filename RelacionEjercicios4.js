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

function calcularEdad(fecha){
    let fechaActual = new Date();
    fecha = new Date(fecha);
    let diferencia = fechaActual.getFullYear() - fecha.getFullYear();
    return diferencia;
}
console.log(calcularEdad("2000-01-01")); //  (25 anios)


// 6) Realizar una función que devuelva el número de vocales y consonantes de una cadena de texto pasada como parámetro 

function contarVocales(str){
    let contadorVocales = 0 ;
    let contadorConsonantes = 0;
    let consonantes = ["b","c","d","f","g","h","j","k","l","m","n","ñ","p","q","r","s","t","v","w","x","y"];
    let vocales = ["a","e","i","o","u"];
    strFinal = str.toLowerCase().split("").join("");
    for(let i =0; i < strFinal.length; i++){
        if(vocales.includes(strFinal[i])){
            contadorVocales++;
        }else if(consonantes.includes(strFinal[i])){
            contadorConsonantes++;
        }
    }
    return `Vocales: ${contadorVocales} Consonantes: ${contadorConsonantes}`;

}

console.log(contarVocales("Hola Mundo"));


// 7) Realizar una función javascript con notación “Arrow function” que dado un array como parámetro, 
// devuelva un array con el mayor y el menor número encontrados en el array pasado como parámetro. 


const devolverMayorMenor=(numeros)=>{
    // importante poner el spread ,sino nos devuelve NaN porque la funcion max y min no acepta arrays
    return "El numero menor es: " + Math.min(...numeros) + " y el numero mayor es: " + Math.max(...numeros);
}
let arrayNumeros = [1,9,10,456,1,23];
console.log(devolverMayorMenor(arrayNumeros));

// 8) Realizar una función que al pasarle un array de números como parámetro,  devuelva un objeto con 2 
// arrays,  
// en el primero almacena los números pares y en el segundo los impares, pe. 
// miFuncion([1,2,3,4,5,6,7,8,9,0]) devolverá {pares: [2,4,6,8,0], impares: [1,3,5,7,9]}.

const devolverParesImpares=(arrayX)=>{
    let pares = [];
    let impares = [];
    arrayX.forEach(element => {
        if(element % 2 == 0){
            pares.push(element);
        }else{
            impares.push(element);
        }
    });
    return "Array pares: " + pares + " y array impares:" + impares;
}
let arrayParesImpares = [1,2,3,4,5,6,7,8,9,0];
console.log(devolverParesImpares(arrayParesImpares));


// 9) Programa una función que dado un array de números devuelva un objeto con dos arrays, el primero 
// contendrá el contenido del array original ordenado en forma ascendente y el segundo, el contenido del 
// array original ordenado de forma descendiente. 
// Ej ascendenteDescendente(([3, 5,3,8,6]) devolverá { asc: [3,3,5,6,8], desc: [8,6,5,3,3] }. 

const devolverOrden=(array)=>{
    // nuevamente muy importante el uso de spread para crear una copia del array,si no lo usaramos nos devolveria
    // el mismo array original y no el ordenado.
    let arrayAscendente = [...array].sort();
    let arrayDescendente = [...array].sort().reverse();
    return "Array ascendente: " + arrayAscendente + " y array descendente: "+ arrayDescendente;

}

let arrayOrden = [3,5,3,8,6];
console.log(devolverOrden(arrayOrden));

// 10) Realizar en javascript una clase llamada Película con los siguientes datos: id de la película, titulo, 
// director, año de estreno, país o países de origen, género y calificación. Hay que comprobar lo siguiente:
//  -  que el id tenga 9 caracteres,
//  los primeros 2 sean letras y los 7 restantes números. -  que el título no supere los 100 caracteres.  
// -  que el año de estreno sea un número entero de 4 dígitos. 
//  -  que el país o países sea introducidos en forma de array. 
//  - que el género introducido esté entre los siguientes géneros válidos. los géneros sean introducidos en 
// forma de arreglo. - Valida que los géneros introducidos estén dentro de los géneros aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, Crime, Documentary ,Drama, Family, Fantasy, Film  Noir, Game-Show, History, Horror, Musical, Music, Mystery, News, Reality-TV, Romance, Sci-Fi, Short, Sport, Talk-Show, Thriller, War, Western*. 
// - Crea un método estático que devuelva los géneros 
// aceptados*.  
// Crear un método que devuelva toda la ficha técnica de la película.  - A partir de un array con la información de 3 películas genera 3 instancias de la clase de forma 
// automatizada e imprime la ficha técnica de cada película. 

class Pelicula{

    static generosValidos = [
        "Action", "Adult", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Film Noir", "Game-Show", "History", "Horror", "Musical", 
        "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", 
        "Thriller", "War", "Western"
    ];

    constructor(id,titulo,director,estreno,pais,genero,calificacion){
        this.validarId(id);
        this.validarTitulo(titulo);
        this.validarAnioEstreno(estreno);
        this.validarPais(pais);
        this.validarGenero(genero);
        
        // Una vez ya validamos los datos ahora si se crea el objeto Pelicula
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.estreno = estreno;
        this.pais = pais;
        this.genero = genero;
        this.calificacion = calificacion;
    }

    validarId(id){
        if (!/^[a-zA-Z]{2}\d{7}$/.test(id)) {
            throw new Error(`El ID "${id}" no es válido. Debe tener 2 letras seguidas de 7 números.`);
        }
    }

    validarTitulo(titulo){
        if (titulo.length > 100){
            throw new Error(`El título ${titulo} excede los 100 caracteres.`);
        }
    }

    validarGenero(genero){

        // vemos si lo que recibimos es un array o no
        if(!Array.isArray(genero) || genero.length === 0){
            throw new Error("El género debe ser un array de géneros");
        }


        // una vez recibido el array lo recorremos y vemos si coincide con alguno de los generos validos
        for (let i = 0; i < genero.length; i++) {
            if (!Pelicula.generosValidos.includes(genero[i])) {
                throw new Error(`El género "${genero[i]}" no es válido.`);
            }
        }
        

    }

    validarAnioEstreno(estreno){
        if (!/^\d{4}$/.test(estreno) || estreno > new Date().getFullYear()) {
            throw new Error(`El año "${estreno}" no es válido. Debe ser un número de 4 dígitos.`);
        }
    }

    validarPais(pais){
        if(!Array.isArray(pais) || pais.length === 0){
            throw new Error("El país debe ser un array de países");
        }
    }



    static mostrarGenerosValidos() {
        return `Generos validos: ${this.generosValidos.join(", ")}`;
    }

    mostrarPelicula(){
        return `
        Pelicula: ${this.titulo}
        ID: ${this.id}
        Director: ${this.director}
        Anio: ${this.anio}
        Paises: ${this.pais.join(", ")}
        Generos: ${this.genero.join(", ")}
        Calificacion: ${this.calificacion}/10
        `;
    }



}

// Nos creamos varios objeto de pelicula y lo mostramos en pantalla
const peliculas = [
    new Pelicula("AB1234567", "Spiderman", "director1", 2010, ["USA", "Spain"], ["Sci-Fi", "Thriller"], 8.8),
    new Pelicula("CD9876543", "Batman", "director2", 2019, ["South Korea"], ["Drama", "Thriller"], 9.0),
    new Pelicula("EF4567891", "Pelicula3", "director3", 1972, ["USA"], ["Crime", "Drama"], 9.2)
];

// tenemos que recorrerlo con un forEach
peliculas.forEach(pelicula => console.log(pelicula.mostrarPelicula()));

console.log(Pelicula.mostrarGenerosValidos());




// 10) Crear el siguiente ejercicio de herencia en Orientación a objetos en javascript. 
// Crear la clase habitación con los siguientes atributos: 
// - número : número de habitación 
// - capacidad: número de personas que la habitarán (1,2,3,4,5) 
// - servicios: número de servicios disponibles en la habitación 
// Crear los siguientes métodos: - 
// calcularPrecio(capacidad,servicios) que calcule el precio de cada habitación, sabiendo que 
// por cada persona se pagarían 24 € y adicionalmente por cada servicio 3€ 
// Crear la clase habitacionHotel que calcule el precio de una habitación en un hotel determinado, que 
// herede de habitación los atributos capacidad y servicios y que además contenga: - 
// director: director del hotel - - - 
// categoría: número de estrellas del hotel 
// numHabsEstandar: número habitaciones estándar del hotel, sabiendo que estas habitaciones 
// tienen capacidad para 2 personas y con 2 servicios básicos. 
// numHabsSuite: número de habitaciones suite del hotel, sabiendo que estas habitaciones 
// tienen capacidad para 2 personas con los 5 servicios básicos. 
// Crear los siguientes métodos: - 
// calcularPrecio(capacidad,servicios,categoría) que calcule el precio de esa habitación en ese 
// hotel concreto sabiendo que además del precio de la habitación por capacidad y servicios se 
// incrementará un 5 % por cada estrella a partir de la primera, es decir, en un hotel de 2 estrellas 
// el precio sería el de la habitación + 10% de ese precio. - 
// calcularRecaudacionHotel que calcule el total que recaudaría el hotel si tuviese todas las 
// habitaciones estándar y suites ocupadas



class Habitacion {
    constructor(numero, capacidad, servicios) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.servicios = servicios;
    }
    calcularPrecio() {
        // precio inicial por persona
        let precio = 24;
        // precio por servicio
        let precioServicio = 3;
        // precio por capacidad + servicio
        return (precio * this.capacidad) + (this.servicios * precioServicio)
    }

}

class HabitacionHotel extends Habitacion{
    // heredamos el constructor
    constructor(numero, capacidad, servicios, director, categoria, numHabsEstandar, numHabsSuite) {
        super(numero,capacidad,servicios);
        this.director = director;
        this.categoria = categoria;
        this.numHabsEstandar = numHabsEstandar;
        this.numHabsSuite = numHabsSuite;
    }
    calcularPrecio() {
        let precio = super.calcularPrecio();
        let porcentaje = (this.categoria - 1) * 0.5;
        return precio + (precio * porcentaje);
    }
    calcularRecaudacion() {
        // Habitaciones estándar (capacidad: 2, servicios: 2) Ejemplo
        let habEstandar = new Habitacion(0, 2, 2);
        let precioEstandar = habEstandar.calcularPrecio();
        let totalEstandar = this.numHabsEstandar * precioEstandar;

        // Habitaciones suite (capacidad: 2, servicios: 5) Ejemplo
        let habSuite = new Habitacion(0, 2, 5);
        let precioSuite = habSuite.calcularPrecio();
        let totalSuite = this.numHabsSuite * precioSuite;

        return totalEstandar + totalSuite;
    }
}

const hotel = new HabitacionHotel(101, 2, 3, "Balbino", 3, 10, 5);

console.log("Precio de una habitacion en el hotel:", hotel.calcularPrecio());
console.log("Recaudacion total del hotel:", hotel.calcularRecaudacion());