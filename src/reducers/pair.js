import {
    CHANGE_PAIR
} from '../constants/index'

export default function pair(state = {}, action) {
    const { payload } = action;
    switch (action.type) {

        case CHANGE_PAIR:
            // console.log("CHANGE_PAIR Reducer ==> ", action, state);
            return {
                ...state,
                ...payload,
            };

        default:
            return state
    }
}