import { combineReducers } from 'redux';
import user from './user';
import interval from './interval';
import chartRange from './chartRange';
import pair from './pair'

export default combineReducers({
    user, //login request, login and so on
    interval, //5min, ..., 1hrs, ..., 1day intervals for chart
    chartRange,
    pair,
})