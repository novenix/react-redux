// importar los datos normalizados para encontrar los datos mas facil
// normalizedData ahora es es data
import schema from '../schemas/index'
// form js: pasa cualquier objeto js a immutable
import {fromJS} from 'immutable';
// importa directamente las acciones de actionTypes
import {SEARCH_ENTITIES} from '../actionTypes/index'
// manejar el estado inicial dentro de cada reducer
// llama a from js de immutable
const initialState=fromJS({
    // puede obtener todos los datosy 
    // reducer 1
    
        // lo que corresponde a la api, lo que llega de la datra
        // ...data,
        // crear campos a los lugares para que sean usados
        // entidades de categoria y de media
        entities:schema.entities,
        categories:schema.result.categories,
        search:''
    
    
});





// reducers son funcion pura
// recibe estado y accion
function data(state=initialState,action){
    // se define segun el tipo  de accion, que es lo que se quiere hacer
    // type es parametro obligatorio en accion
    switch (action.type){
        // MANEJAR LA ACCION SEARCH VIDEO
        case SEARCH_ENTITIES:{            
            // como el metodo es inmutable
            // el query es el texto que está llegando de la busqueda
            //     // action.payload.query
            // devuelbe un nuevo mapa de inmutable
            return state.set('search',action.payload.query)
        }
        default:
        return state
    }
}
export default data;