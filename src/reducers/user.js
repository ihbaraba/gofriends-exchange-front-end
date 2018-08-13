import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/index'


export default function userState(state = {}, action) {
    // console.log("userState Reducer ==> ", action.type, state);

    switch (action.type) {

        case LOGIN_REQUEST:
            // TODO
            return {
                ...state,
                // user: {...state.user, request: "sent"},
                request: "sent",
            };

        case LOGIN_SUCCESS:
            // TODO
            return state

        case LOGIN_FAIL:
            // TODO
            return state

        case LOGOUT_SUCCESS:
            // TODO
            return state

        default:
            return state
    }
}