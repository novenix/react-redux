import React,{Component} from 'react'
//componente inteligente: container
import HomeLayout from '../components/home-layout'
//lamar las categoriasa mara mostrar en la ui
import Categories from '../../categories/components/categories'
import Related from '../components/related'
import ModalContainer from '../../widgets/containers/modal'
import Modal from '../../widgets/components/modal'
import HandleError from '../../errores/container/handleError'
import VideoPlayer from '../../player/container/video-player'
// para conectar los datos del store a un componente en especifico
import {connect} from 'react-redux'
// listas de inmutable
import {List as list} from 'immutable'
// importar todo lo de index
import * as actions from '../../actions/index'
// llamar bind action creator
import {bindActionCreators} from 'redux'

// conectar datos en especifico del componente, solo esos datos
class Home extends Component{
    // state = {
    //     modalVisible:false,
        
    // }
    handleOpenModal=(id)=>{
        this.props.actions.openModal(id)
        // this.setState({
        //     modalVisible:true,
        //     // media:media
        //     media,
        // })
    }
    handleCloseModalClick = (event)=>{
        this.props.actions.closeModal()
        // // setear estado
        // this.setState({
        //     // la visibilidad del estado es falso
        //     modalVisible:false,
        // })
    }
    
    render(){
        // manejar los errorres de todo el home layout
        
        return(
            <HandleError>
                <HomeLayout>
                    
                    {/* hijos del home */}
                    <Categories 
                        // sin enviar la propiedad con redux, solo react seria:
                        // categories={this.props.data.categories}
                        // gracias a mapStateToProps:
                        categories={this.props.categories}

                        // {/* pasamos el click */}
                        handleOpenModal={this.handleOpenModal}
                        // envia a las categories:
                        search={this.props.search}
                        isLoading={this.props.isLoading}
                        />
                    
                    
                    <Related/>
                    {/* reproductor de video */}
                    
                    {/* contenedor modal */}
                    {/* jsx condicionales */}
                    {
                        this.props.modal.get('visibility') &&                
                        <ModalContainer>
                            <Modal 
                                handleClick={this.handleCloseModalClick}
                            >
                                <VideoPlayer
                                    autoplay
                                    id={this.props.modal.get('mediaId')}
                                    // src={this.state.media.src}
                                    // title={this.state.media.title}
                                />
                                
                            </Modal>                    
                        </ModalContainer>
                    }
                </HomeLayout>
            </HandleError>
        )
    }
}
// lo que va a conectar, recibe estado y propiedades
// envia al render?
function mapStateToProps(state,props){
    // necesita objetos de categorias para retornarlos
    // revisar dentro de categories, es una lista de strigns con id's
    console.log(categories)
    // mapas inmutable,de redux immutable.get()
    const categories =state.get('data').get('categories').map((categoryId)=>{
        // buscar el objeto en la categoria que esta dentro de la entitie
        return state.get('data').get('entities').get('categories').get(categoryId)
    })
    // como es imutable, el array[] es una lista
    let searchResults=list();
    // const con el query
    const search=state.get('data').get('search');
    if (search){
        // dentro, iterar todos los elemetnos obteniendo key de media
        // devuelve una lista de elementos de media.
        const mediaList=state.get('data').get('entities').get('media')
        searchResults=mediaList.filter((item)=>{
            //  item es el elemento de media, pero con mapa de inmutalble
            // convertirlo a lista para trabajar con immutable
            return item.get('author').toLowerCase().includes(search.toLowerCase())
        }).toList();
    }
    // recibe el estado dfe redux
    // recube el inicial State
    // retorna que datos quiere enviar a componente home como nuevas propiedades
    return {
        // sin la data normalizada
        // categories: state.data.categories,
        // con data normalizada
        categories: categories,
        // tambien se puede traer search
        // empieza como un arreglo vacio
        search:searchResults,
        // traer datos del modal
        modal:state.get('modal'),
        // cargando busqueda
        isLoading:state.get('isLoading').get('active')
    }
   
}
// recibe el parametro dispatch, retorna nuevas propiedades
// aqui esta el sipatch del store
function mapDispatchToProps(dispatch){
    return{
        // actions: bindActionCreators(acciones,dispatch)
        actions: bindActionCreators(actions,dispatch)
    }
}
// conectar datos al componente;
// funcion que recibe parametro que pone los parametros que necesita
// programacion funcional..
// pasar farametros(que componetne, funcion que necesita del estado)
// le envia una nueva propiedad al componente home, en este caso seria categories
export default connect(mapStateToProps,mapDispatchToProps) (Home)