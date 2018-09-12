/* eslint-disable no-unused-vars */

import {
    CHART_RANGE,
    INTERVAL
} from '../constants'

export const chart_range = (range) =>  dispatch => {
    console.log("chart_range action", range);
    dispatch({
        type: 'CHART_RANGE',
        payload: range
    })
};
export const chart_timing = (timing) =>  dispatch => {
    console.log("interval", timing);
    dispatch({
        type: 'INTERVAL',
        payload: timing
    })
};
/* eslint-enable no-unused-vars */