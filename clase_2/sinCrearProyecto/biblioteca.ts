// npm => necesita instalar las librerias para poder ejecutar
// npx => sin instalar carpetas o paquetes ejecuta librerias

// IIFE

let unNumero: number = 5
let texto: string = "hola"
let esValido: boolean = true

const unaLista = []

unNumero.toFixed()
texto.toUpperCase()

// como creamos una interfaz?

// para trabajar con variables boleanas usen is, has, isStudent, isAdmin, hasValidated

// 1) 
interface Libro {
    titulo: string;
    autor: string;
    precio: number;
    id: number;
    isCompleted: boolean;
    fecha?: Date;
    editorial?: string;
}

// vamos a crear un libro que cumpla con el contract

const elSenorDeLosAnillos: Libro = {
    titulo: 'el senor de lo anillos',
    autor: "felipe",
    id: 1000,
    precio: 1000,
    isCompleted: false
}

const listaLibros: Libro[] = [
    {
        titulo: 'el libro 1',
        autor: "felipe",
        id: 1,
        precio: 1000,
        isCompleted: true
    },
    {
        titulo: 'libro 2',
        autor: "felipe",
        id: 2,
        precio: 1000,
        isCompleted: false
    },
    {
        titulo: 'libro 3',
        autor: "felipe",
        id: 3,
        precio: 1000,
        isCompleted: true
    }
]

const mostrarLibrosDisponibles = (lista: Libro[]): Libro[] => {
    // Metodos para iterar los arrays
    // forEach: recorre la lista
    // for: recorre una lista
    // map: recorre una lista y devuelve una variable con esa lista
    // const newLista = lista.map(l => l)
    // filter: recorre una lista y devuelve los elementos que cumpla con la condicion
    const nuevaListaFiltrada = lista.filter(libro => libro.isCompleted === true)

    return nuevaListaFiltrada
}

const buscarIdEnListaDeLibros = (id: number, lista: Libro[]): Libro | undefined => {
    const buscarLibro = lista.find(libro => libro.id === id)

    return buscarLibro
}

console.log('vamos a buscar el libro con id 1', buscarIdEnListaDeLibros(1, listaLibros));
console.log('vamos a buscar el libro con id 1', buscarIdEnListaDeLibros(4, listaLibros));
const respuestaId4 = buscarIdEnListaDeLibros(4, listaLibros)

console.log('para que no estalle usamos el ?', respuestaId4?.id);

if (respuestaId4) {
    respuestaId4.id
}

respuestaId4?.fecha?.getDay()

// const prueba =() => {}
// prueba()

// (() => {})()