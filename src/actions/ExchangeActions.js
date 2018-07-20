/* eslint-disable no-unused-vars */

import {
    CHANGE_PAIR,
} from '../constants'

export function changePair(payload) {
    console.log("changePair action", payload);
    // TODO
    return {
        type: CHANGE_PAIR
    }
}

/* eslint-enable no-unused-vars */