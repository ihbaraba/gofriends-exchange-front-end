

export default (state = {}, action) => {
// console.log("simpleReducer ", action, state);
    switch (action.type) {

        case 'SIMPLE_ACTION':
            // TODO
            console.log("simpleReducer ==> SIMPLE_ACTION", action, state);
            return {
                // ...state,
                result: action.payload
            };

        default:
            // console.log("simpleReducer ==> default", action, state);
            return state
    }
}