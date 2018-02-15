// importar para datos unmutables
// fromJS :cualquier cosa de js a inmutable
import {fromJS} from 'immutable';
import{OPEN_MODAL,CLOSE_MODAL}from '../actionTypes/index'
// reducer 2, recibe el estado inicial
// llama a from js de immutable 
const initialState=fromJS({   
    // tambien está en el estado inicial la busqueda, se le añade en el reducers de data
        // para buscar
    // el  modal recibe media,   
        visibility:false,
        mediaId:null   
});


// reducer funcion pura
// recibe 2 parametros, state, action
function Modal (state=initialState,action){
    // acciones para manejar el estado
    
    switch(action.type){
        case OPEN_MODAL:
            // con set solo se puede modificar 1 cosa,
            // /usar merge
            return state.merge({
                visibility:true,
                mediaId:action.payload.mediaId,
            });
        case CLOSE_MODAL:
            return state.set('visibility',false);
        default:
            return state
    
        }
}
export default Modal;