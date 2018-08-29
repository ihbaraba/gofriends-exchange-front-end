import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/index'

export default function userState(state = {}, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            // TODO
            return {
                ...state,
                // user: {...state.user, request: "sent"},
                request: "sent",
            };

        case LOGIN_SUCCESS:
            // console.log("userState Reducer ==> ", action, state);
            localStorage.setItem('exchange_token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
            };

        case LOGIN_FAIL:
            // TODO
            return state;

        case LOGOUT_SUCCESS:
            // TODO
            return state;

        default:
            return state
    }
}