// reducers son funcion pura
// recibe estado y accion
function data(state,action){
    // se define segun el tipo  de accion, que es lo que se quiere hacer
    // type es parametro obligatorio en accion
    switch (action.type){
        // MANEJAR LA ACCION SEARCH VIDEO
        case 'SEARCH_VIDEO':{
            // para que no se traiga todo si no se le pone nada
            let results=[]
            if (action.payload.query){
                // el query es el texto que está llegando de la busqueda
                // action.payload.query
                // obtener una lista para hacer una busqueda pequeña
                
                const list=state.data.categories[2].playlist;
                // iterar la lista, filtrarla, aca compara en cada pos de la lista buscada si coincide
                results=list.filter((item)=>{
                    // filter devuelve verdadero o falso
                    // si retorna true, retorna todos los elementos de la lista
                    
                    // comparar nombre del autor
                    // luis vs lui =true
                    // comparar.includes(lo que llega)
                    return item.author.includes(action.payload.query);
                })
            }
            
            // DEVOLVER NUEVO ESTADO
            // como un objeto
            // retorna lo mismo que esta dentro del estado y le añade un nuevo key, data + la busqueda
            return {
                ...state,
                search:results
            }
        }
        default:
        return state
    }
}
export default data;