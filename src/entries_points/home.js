// console.log('holo mundo')
//importar react
//react exactamente sirve ara crear los componentes
import React from 'react'
//react dom es para poner los componentes en algun lado
//import ReactDOM from 'react-dom'
//tambien se puede importar {render} de react dom para solo usar render 
import {render} from 'react-dom'
//importar componente playlist
// import Playlist from './src/playlist/componentes/playlist.js'
import Home from '../pages/containers/home'

//importar los datos de los videos, para lectura desde json(objetos)
//  import data from './../api.json'

// importar el centro de todas las cosas
// apply middleware para aplicar el middleware logger
import {createStore,applyMiddleware, compose}from 'redux'
// importar high order component: sirve de suscribe
// privider, poner data a la app
import {Provider}from 'react-redux'
// omportar reducer
import reducer from '../reducers/index'
// funcion mapas inmutables,(mapa as pmap) para que lo tome como funcion
import {Map as map} from 'immutable'
// funcion logger para saber que se está haciendo
import logger from 'redux-logger'
// usar multiples middlewares
import {composeWithDevTools} from 'redux-devtools-extension'
// importar thunk para funciones asincronas
import thunk from 'redux-thunk'


// middleware de redux para crear un feature extra
// hacer un logger, 
// recibe dispatch y getState
// function logger({getState,dispatch}){
//     // la primera funcion recibe metodo para despachar el siguiente middleware
//     return (next)=>{
//         // 
//         return(action)=>{
//             console.log('vamos a enviar la accio',{action})
//             // regresa la ejecucin
//             const value= next(action)
//             // despues de la aplicacion
//             console.log('este es mi nuevo estado',getState().toJS())
//             return value;
//         }
//     }
// }
// const logger=({getState,dispatch})=>next=>action=>{
//     console.log('vamos a enviar la accio',{action})
//             // regresa la ejecucin
//             const value= next(action)
//             // despues de la aplicacion
//             console.log('este es mi nuevo estado',getState().toJS())
//             return value;
// }

// el create store recibe 3 parametros:
    // reducer,initial state,enhancer
    // reducer, como llega la info,herramientas de desarrollo
const store =createStore(
    // reducer,
    reducer,
    // initial
    map(),
    composeWithDevTools(
        // enhancer
        // se va a usar con el middleware(logger)
        applyMiddleware(logger,thunk)
    )

    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

)
// console.log(store.getState())
// import Categorias from './src/categorias/categorias'
// importar html
const homeContainer=document.getElementById('home-container')

// en react
// render(<Home  data={data}/>,homeContainer)

// ya no se envia la data, solo envia store que ya la contiene
// componente de orden superior
//hoc: heredan cosas a los componentes hijos-decorador, reemplaza mixin de react
// pone el store
render(
    <Provider store={store}> 
        {/* <p>hola mundo</p> */}
        <Home  />
    </Provider>,homeContainer)


