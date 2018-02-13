// multiples shemas para mi app

// importa los datos de origen 
import api from '../api.json'
// importar normalizer
import {normalize,schema} from 'normalizr'

// crear shema para media
// cada archovo de media es una entidad
// parametros(key schema,definicion shcema(herencia),opciones para presonalizar(nombre que quiere tomar del elemento para ponerlo de key))
const media=new schema.Entity('media',{},{
    // si llegan 2 ids diferentes en un mismo elemento
    idAttribute: 'id',
    // heredar dato del padre(category) a media
    // (devuelve lo que quiere tomar del padre)
    // (valor elemento(titulo),padre de media y todos sus keys, key de elemento)
    processStrategy:(value,parent,key)=>(
        // traer todos los elementos por defecto de media
        // si ponemos{...value,category:'pepe'}  
        //                 key:'datos que quiere'     
        {...value, category:parent.id}
    )
});
// parametros(key schema,definicion shcema(herencia),opciones para presonalizar(nombre que quiere tomar del elemento para ponerlo de key))
// en par 2 hereda a media
// este es el result, extrae elementos de las categorias
const category = new schema.Entity('categories', {
    // hereda a media, lo que tenga dentro de playlist, lo transforma a media
    // cada elemento de la playlist pertenece a media, se pone Array porque la playlist viene como un array
    playlist: new schema.Array(media)
});
// en categorias retorna un objeto  para encontrar los datos mas facil
//                           new schema.Object(category) si vienne como objeto
const categories={categories:new schema.Array(category)}
// a normalize se le pasa lo que se quiere normalizar y se le pasa el shema que quiere
const normalizedData=normalize(api,categories);

export default normalizedData;