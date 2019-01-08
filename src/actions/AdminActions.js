/* eslint-disable no-unused-vars */

import {
    CHANGE_CURRENT_PAGE,
    CHANGE_SUB_PAGE,
    BACK_TO_LAST_PAGE
} from '../constants/index'


export const changePage = (page) => dispatch => {
    dispatch({
        type: CHANGE_CURRENT_PAGE,
        payload: page

    })
};

export const changeSubPage = (page) => dispatch => {
    dispatch({
        type: CHANGE_SUB_PAGE,
        payload: page
    })
};

export const lastPage = () => dispatch => {
    dispatch({
        type: BACK_TO_LAST_PAGE,
        payload: ''
    })
};