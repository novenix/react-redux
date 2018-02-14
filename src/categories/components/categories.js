//componente de categoria, el tonto
import React from 'react'
import Category from './category'
import './categories.css'
// importar formulario de busqueda
import Search from '../../widgets/containers/search'
// para la busqueda
import Media from '../../playlist/componentes/media'
function Categories(props){
    //lo que recibe categories es una lista de elementos, y se la envia a category que llama a playlist
    return (
        <div className='Categories' >
        {/* la busqueda se itera aca */}
        {/* recibe los elementos filtrados buscados */}
        {/* por cada elemento iterado retorna un componente media */}
        <Search/>
        {
            props.search.map((item)=>{
                // retorna ese item, debe pasarle key de cada item
                // to js para pasar a objeto a javascript
                return <Media openModal={props.handleOpenModal} {...item.toJS()} key={item.get('id')} />
            })
        }
        {
            // mapear categories, tiene el elemento de categoria y se lo manda a su respectiva funcion
            props.categories.map((category)=>{
                // cada iterador debe tener su key
                return (<Category 
                    key={category.get('id')} 
                    {...category.toJS()}
                    handleOpenModal={props.handleOpenModal}
                    
                    />)

            })
        }
        </div>
    )
}
export default Categories