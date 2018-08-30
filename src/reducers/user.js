import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SAVE_USER_INFO,
    SAVE_USER_ORDERS
} from '../constants/index'

export default function userState(state = {}, action) {
    const { payload } = action;
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

        case SAVE_USER_INFO:
            const user= {...state, ...payload};
            // console.log("SAVE_USER_INFO Reducer ==> ", user, action, state);
            return { ...user };

        case SAVE_USER_ORDERS:
            const { orders } = state;
            (orders).add(payload);
            const newUser = {...state, orders};
            // console.log("SAVE_USER_ORDERS Reducer ==> ", payload, orders, newUser);
            return { ...newUser };

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