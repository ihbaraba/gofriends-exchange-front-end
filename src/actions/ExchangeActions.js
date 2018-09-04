/* eslint-disable no-unused-vars */

import {
    CHANGE_PAIR,
} from '../constants'


export const pair = (payload) =>  dispatch => {
    console.log("change pair action", payload);
    dispatch({
        type: 'CHANGE_PAIR',
        payload: payload
    })
};
/* eslint-enable no-unused-vars */