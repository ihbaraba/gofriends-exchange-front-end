/**
* INTERVAL Reducer
**/

export default (state = {}, action) => {
// console.log("simpleReducer ", action, state);
    switch (action.type) {

        case 'INTERVAL':
            console.log("interval reducer ==> INTREVAL", action, state);
            return action.payload

        default:
            return state
    }
}