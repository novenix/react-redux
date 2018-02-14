// se manejará la logica si hay un click dentro de media
// pasa id de media, y aca se encarga de pedir los datos completos de media
import React,{Component} from 'react'
// este es un hog
import Media from '../componentes/media'
// los datis que se le inviarán a media
import {connect}from 'react-redux'
import * as actions from '../../actions/index'
import {bindActionCreators} from 'redux'
class MediaContainer extends Component{
    // despachar una accion
    openModal=(id)=>{
        this.props.actions.openModal(id)
    }
    render(){
        // enviar funcion que abra el modal
        return( <Media openModal={this.openModal} {...this.props.data.toJS()}/>)
    }
}
// aque recibe estado y propiedades, mapea estado y lo convierte en propiedades para devolverlo al componente
function mapStateToProps(state,props){
    return {
        data:state.get('data').get('entities').get('media').get(props.id)
    }
}
// / recibe el parametro dispatch, retorna nuevas propiedades
// aqui esta el sipatch del store
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (MediaContainer)