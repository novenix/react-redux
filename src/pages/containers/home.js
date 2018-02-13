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

// conectar datos en especifico del componente, solo esos datos
class Home extends Component{
    state = {
        modalVisible:false,
        
    }
    handleOpenModal=(media)=>{
        this.setState({
            modalVisible:true,
            // media:media
            media,
        })
    }
    handleCloseModalClick = (event)=>{
        
        // setear estado
        this.setState({
            // la visibilidad del estado es falso
            modalVisible:false,
        })
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
                        />
                    
                    
                    <Related/>
                    {/* reproductor de video */}
                    
                    {/* contenedor modal */}
                    {/* jsx condicionales */}
                    {
                        this.state.modalVisible &&                
                        <ModalContainer>
                            <Modal 
                                handleClick={this.handleCloseModalClick}
                            >
                                <VideoPlayer
                                    autoplay
                                    src={this.state.media.src}
                                    title={this.state.media.title}
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
    const categories =state.data.categories.map((categoryId)=>{
        // buscar el objeto en la categoria que esta dentro de la entitie
        return state.data.entities.categories[categoryId]
    })

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
        search:state.search
    }
   
}
// conectar datos al componente;
// funcion que recibe parametro que pone los parametros que necesita
// programacion funcional..
// pasar farametros(que componetne, funcion que necesita del estado)
// le envia una nueva propiedad al componente home, en este caso seria categories
export default connect(mapStateToProps) (Home)