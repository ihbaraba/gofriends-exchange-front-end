import {
    CHANGE_PAIR,
} from '../constants/'

export default function exchangeState(state = {}, action) {
// console.log("exchangeState REDUCER ", action, state);
    switch (action.type) {

        case CHANGE_PAIR:
            // TODO
            return state

        default:
            return state
    }
}