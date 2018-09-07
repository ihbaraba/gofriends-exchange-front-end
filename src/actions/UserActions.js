/* eslint-disable no-unused-vars */

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_USER_INFO,
} from '../constants'

export const logOut = () => dispatch => {
    // console.log("logOut this.props", this.props);
    dispatch({
        type: 'LOGOUT',
        payload: 'logOut'
    })
};
export const login_request = () => dispatch => {
    // console.log("login_request this.props", this.props);
    dispatch({
        type: 'LOGIN_REQUEST',
        payload: 'result_of_login_request'
    })
};
export const login_success = (token) => dispatch => {
    // console.log("login_success this.props", token,this.props);
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: token
    })
};
export const save_user_info = (info) => dispatch => {
    // console.log("save_user_info", info);
    dispatch({
        type: 'SAVE_USER_INFO',
        payload: info
    })
};
export const save_user_orders = (orders) => dispatch => {
    // console.log("save_user_orders", orders);
    dispatch({
        type: 'SAVE_USER_ORDERS',
        payload: orders
    })
};
/* eslint-enable no-unused-vars */