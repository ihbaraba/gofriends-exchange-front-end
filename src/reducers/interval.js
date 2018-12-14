/**
* INTERVAL Reducer
**/

export default (state = {}, action) => {
// console.log("simpleReducer ", action, state);
    switch (action.type) {

        case 'INTERVAL':
            return action.payload;

        default:
            return state
    }
}