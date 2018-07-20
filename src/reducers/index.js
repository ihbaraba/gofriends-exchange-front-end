import { combineReducers } from 'redux'
import user from './user'
import exchange from './exchange'

export const rootReducer = combineReducers({
    user,
    exchange,
})