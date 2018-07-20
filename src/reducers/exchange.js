import {
    CHANGE_PAIR,
} from '../constants/'

const initialState = {
    pair:  {
        id: 1,
        name: "order_created_1",
        baseCurrency: "BTC",
        quoteCurrency: "ETH",
    }
};

export default function exchangeState(state = initialState, action) {
// console.log("exchangeState REDUCER ", action, state);
    switch (action.type) {

        case CHANGE_PAIR:
            // TODO
            return state

        default:
            return state
    }
}