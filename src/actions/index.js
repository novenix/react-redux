// importa todas las acciones de actionTypes
import{OPEN_MODAL,CLOSE_MODAL,SEARCH_ENTITIES,SEARCH_ASYNC_ENTITIES,IS_LOADING}from'../actionTypes/index'
// se puede tener una accion por cada reducer.
// regresa accion
// accion abrir modal
export function openModal (mediaId){
    return{
        type:OPEN_MODAL,
        payload:{
             mediaId
        }
    }
}

export function closeModal (){
    return{
        type:CLOSE_MODAL
    }
}

export function searchEntities(query){
    return {
        type:SEARCH_ENTITIES,
        payload:{
            query,
        }
    }
}
export function searchAsyncEntities(query){
    // por redux thunk retornamos una funcion con parametro dispatch
    return (dispatch =>{
        // fetch()
        // // xhttprequest
        // para hacer peticiones,(node) reales
        // fetch().then(()=>{dispatch(searchEntities(query))})
        // XHR
        // trae
        // poner el boton de carga en la ui
        dispatch(isLoading(true))
        setTimeout(()=>{
            dispatch(isLoading(false))
            dispatch(searchEntities(query))
            },5000)
        })

   
}
export function isLoading(value){
    return {
        type: IS_LOADING,
        payload:{
            value
        }
    }
}
