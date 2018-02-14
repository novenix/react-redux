// se puede tener una accion por cada reducer.
// regresa accion
// accion abrir modal
export function openModal (mediaId){
    return{
        type:'OPEN_MODAL',
        payload:{
             mediaId
        }
    }
}

export function closeModal (){
    return{
        type:'CLOSE_MODAL'
    }
}

export function searchEntities(query){
    return{
        type:'SEARCH_ENTITIES',
        payload:{
            query
        }
    }
}
