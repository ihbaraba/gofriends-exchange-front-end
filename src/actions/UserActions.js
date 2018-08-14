/* eslint-disable no-unused-vars */

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants'

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    }
}
export const login_request = () =>  dispatch => {
    // console.log("login_request this.props", this.props);
    dispatch({
        type: 'LOGIN_REQUEST',
        payload: 'result_of_login_request'
    })
};
export const login_success = (token) =>  dispatch => {
    // console.log("login_success this.props", token,this.props);
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: token
    })
};
/* eslint-enable no-unused-vars */