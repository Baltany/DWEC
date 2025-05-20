// Crea una clase base llamada Vehículo en el que podremos establecer la marca, modelo y año de matriculacion, y en
// el crearemos un método mostrarInformacion que devuelva un string con el siguiente texto: El vehículo de marca
// XXXXXX y modelo XXXXXX fue matriculado en el año XXXXXX. Además, crear dos clases hijas que hereden
// de vehículo (auto, en el que se puedan añadir las puertas del mismo) y (moto, en el que se pueda incluir la cilindrada
// de la misma), además, crear en cada una de ellas también el método mostrarInformacion que devuelva un string con
// el texto “El vehículo de marca XXXXXX y modelo XXXXXX (tiene XXXX puertas/ de cilindrada XXXX) fue
// matriculado en el año XXXXXX”. Crear los objetos necesarios para que se prueban todos los métodos obteniendo la
// información por consola. (2 puntos)
class Vehiculo{
    constructor(marca, modelo, anio){
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }

    mostrarInformacion(){
        return `El vehiculo de marca ${this.marca} y modelo ${this.modelo} fue matriculado en el año ${this.anio}.`;
    }
}

class Auto extends Vehiculo{
    constructor(marca, modelo, anio, puertas){
        super(marca, modelo, anio);
        this.puertas = puertas;
    }

    mostrarInformacion(){
        return `El vehiculo de marca ${this.marca} y modelo ${this.modelo} (tiene ${this.puertas} puertas) fue matriculado en el año ${this.anio}.`;
    }
}
class Moto extends Vehiculo{
    constructor(marca, modelo, anio, cilindrada){
        super(marca, modelo, anio);
        this.cilindrada = cilindrada;
    }

    mostrarInformacion(){
        return `El vehiculo de marca ${this.marca} y modelo ${this.modelo} (de cilindrada ${this.cilindrada}) fue matriculado en el año ${this.anio}.`;
    }
}
// Creacion de objetos
const auto1 = new Auto("Toyota", "Yaris", 2020, 4);
const moto1 = new Moto("Honda", "Marquez", 2021, 689);
// Mostrando indforrmacion
console.log(auto1.mostrarInformacion());
console.log(moto1.mostrarInformacion());