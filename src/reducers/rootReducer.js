import { combineReducers } from 'redux';
import user from './user';
import pair from './exchange';
// import appendFake from './simpleReducer';
import interval from './interval';
import chartRange from './chartRange';

export default combineReducers({
    user, //login request, login and so on
    // exchange,
    pair,
    interval, //5min, ..., 1hrs, ..., 1day intervals for chart
    // appendFake,
    chartRange,
})