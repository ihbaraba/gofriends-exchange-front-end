import {
    CHANGE_CURRENT_PAGE,
    CHANGE_SUB_PAGE,
    BACK_TO_LAST_PAGE
} from '../constants/index'

export default function adminState(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case CHANGE_CURRENT_PAGE:
            return {
                ...payload
            };

        case CHANGE_SUB_PAGE:
            return {
                ...state,
                subLink: {
                    ...payload
                }
            };
        case BACK_TO_LAST_PAGE:
            delete state['subLink'];
            return {
                ...state,
            };


        default:
            return state
    }
}