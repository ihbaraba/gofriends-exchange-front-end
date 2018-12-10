import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createLogger } from 'redux-logger'
import initialState from './initialState'

/*
https://github.com/zalmoxisus/redux-devtools-extension#usage
 */

export default function configureStore (initState = {}) {
    // console.log(initialState);
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // applyMiddleware(createLogger())
        // other store enhancers if any
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}