import React,{Component} from 'react'
import Search from '../components/search'
// con connect puede tener dispatch
import {connect} from 'react-redux'

import * as actions from '../../actions/index'
import { bindActionCreators } from 'redux';

class SearchContainer extends Component{
    state={
        value:'Luis Fonsi'
    }
    handleSubmit=event=>{
        // prevenir que la pagina recarge
        event.preventDefault();
        console.log(this.input.value,'submit')
        // crear la accion para buscar video
        // se le envia la accion, type por minimo
        this.props.actions.searchEntities(this.input.value)
    }
    // funcion que recibe el elemento html como parametro
    // lo maeja
    setInputRef =element =>{
        this.input=element;
    }
    // manejar cambio del input
    handleInputChange=event=>{
        // valor del target
        // para poner los - entre palabras (hola-pepe) replace(que reemplaza, a reemplazar)
        this.setState({
            value:event.target.value.replace(' ','-')
        })
    }
    render(){
        return (
            <Search
            // llammar la referencia del component
            setRef={this.setInputRef}
            // BUCADOR MANEJA EL HANDLE
            handleSubmit={this.handleSubmit}
            // manejar change del component(evento)
            handleChange={this.handleInputChange}
            // 
            value={this.state.value}
            />
        )
    }
}
// / recibe el parametro dispatch, retorna nuevas propiedades
// aqui esta el sipatch del store
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}
// conectar, por que es el que va a realizar una accion,
// como no vamos a pintar de propiedades del estado no se envia nada en connect
// *cada vez que es el componente el que va a realizar una accion
//  se exporta o se llama conect con programacion funcional
export default connect(null,mapDispatchToProps) (SearchContainer)