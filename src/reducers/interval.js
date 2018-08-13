

export default (state = {}, action) => {
// console.log("simpleReducer ", action, state);
    switch (action.type) {

        case 'INTRVAL':
            console.log("interval reducer ==> INTREVAL", action, state);
            return {
                // ...state,
                result: action.payload
            };

        default:
            // console.log("interval reducer ==> default", action, state);
            return state
    }
}