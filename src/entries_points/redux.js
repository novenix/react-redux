// punto entrada de redux
import {createStore} from 'redux'
// console.log('hdolfsdo')
// TODO ESTA HECHO CON VAINILLA.JS
// manipular submit del formulario 

// $form, referencia a elemento del html, ahora es elemento del dom
const $form=document.getElementById('form')
// eventlistener(evento, lo que quiere hacer con evento)
$form.addEventListener('submit',handleSubmit)
// aqui es donde se deben actualizar los datos
function handleSubmit(event){
    // los formularios recargan normalmente la pagina,
    // aqui no vamos a recargar porque solo somos frontend
    event.preventDefault();
    // api del navegador que recibe un elemento del dom
    // lo que necesita es el elemento del dom
    // guarda los datos del formulkario para serializsar o enviar al server
    const data= new FormData($form);
    // obtener un name directamente, es decir, directamente lo que se esribió
    const title= data.get('title')
    // title tiene directamente el titulo que se escrribio en el html
    console.log(title)
    // store dispatch recibe objeto plano, ESTE ES EL ESTADO
    store.dispatch({
        type:"ADD_SONG",
        // enviamos objeto payload con titulo,es mejor enviar objeto 
        // envia title:title que es igual gracias a ecma a solo title
        // esto es un action
        payload:{
            title,
        }
    })
}
// initial state:puede ser cualquier tipo de objeto, una lista, un mapa, lo que sea
const initialState=[
    // lista de objetos
    {
        "title": "Despacito",
    },
    {
        "title": "one more time",
    },
    {"title":"Echame la culpa",}
]
// crear reducer
const reducer =function(state,action){
    // recibe estado y accion
    // el type es parametro obligatorio en una accion
    switch(action.type){
        // llega el addsong directamente de cuando se escribe
        case "ADD_SONG":
            // retornar nuevo estado
            // [estado anterior, nuevo objeto con datos que están llegando]
            // al retornar debe ser objeto, el payload ya es un objeto
            return [...state, action.payload]
        
        default:
            return state
    }

}
// crear store
// reducer es una funcion pura
// el store es el centro de la verdad
const store=createStore(
    // reducer: el reducer deberia retornar estado
    reducer,
    // initial state, modelado de datos inicial: el json con categorias, con id titulo, y una playlist
    // estado inicial arriba
    initialState,
    // para tener un enhancer se hace
    // se puede debugear con las devtools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
function render(){
    // hacer referencia al elemento playlist del html
    const $container = document.getElementById("playlist")
    // poner la playlist dentro de una constante
    const playlist = store.getState();
    // borrar lo que ya estaba y actualizar con la nueva lista
    $container.innerHTML='';
    // iterar la lista, desde map o foreach
    playlist.forEach((item)=>{
        // crear elemento html, diferente a react
        const template=document.createElement('p')
        // contenido al parrafo, nombre de cada cancio
        template.textContent=item.title;
        // imprimir dentro del container

        // añadir nuevos hihos, el nuevo hijo es el template
        $container.appendChild(template);
    })
}
render();
function handleChange(){
    // controlar el cambio 
    // llamar render cada vez que se actualiza la app
    render();
}
// subscribe es para mostrar en pantalla las acciones que tienen lugar en el stroe
// recibe un solo parametro que es una funcion
store.subscribe(handleChange)
// obtener el state para imporimirlo
console.log(store.getState())
