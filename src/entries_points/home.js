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
 import data from './../api.json'
// importar el centro de todas las cosas
import {createStore}from 'redux'
// importar high order component: sirve de suscribe
// privider, poner data a la app
import {Provider}from 'react-redux'
// omportar reducer
import reducer from '../reducers/data'

// definir modelo de datos y como los va a consumir
const initialState={
    // puede obtener todos los datosy 
    data: {
        // lo que corresponde a la api, lo que llega de la datra
        ...data,
        // tambien está en el estado inicial la busqueda, se le añade en el reducers de data
        // para buscar
        search:[],
    }
};

// el create store recibe 3 parametros:
    // reducer,initial state,enhancer
    // reducer, como llega la info,herramientas de desarrollo
const store =createStore(
    // reducer,
    reducer,
    // initial
    initialState,
    // enhancer
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

)
console.log(store.getState())
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


