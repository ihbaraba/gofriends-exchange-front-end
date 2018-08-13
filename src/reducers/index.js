import { combineReducers } from 'redux'
import user from './user'
import exchange from './exchange'

export default combineReducers({
    user,
    pair: exchange,
})