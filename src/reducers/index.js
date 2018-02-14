// este reducer agrupa todos los reducers
import data from './data'
import modal from './modal'
// combine reducers permite unir reducers
// import {combineReducers}from 'redux'
// tenemos state.data.(metodo inmutableJS)...
// hacer el reducer principañ inmmutable y ademas unir los reducers
import {combineReducers}from 'redux-immutable'

const rootReducer=combineReducers({
    data:data,
    modal
})
export default rootReducer;