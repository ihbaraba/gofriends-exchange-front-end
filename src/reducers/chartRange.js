import {
    CHART_RANGE
} from '../constants/index'

export default function userState(state = {}, action) {

    switch (action.type) {

        case CHART_RANGE:
            console.log("CHART_RANGE Reducer ==> ", action, state);
            return action.payload;

        default:
            return state
    }
}