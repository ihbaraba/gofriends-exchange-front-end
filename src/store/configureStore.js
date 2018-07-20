import { createStore, applyMiddleware, compose } from 'redux'
import { default as thunkMiddleware } from 'redux-thunk';


import {createLogger} from 'redux-logger';
import { rootReducer } from '../reducers';

export default function configureStore(preloadedState) {

    // console.log("configureStore", preloadedState);

    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(createLogger())
    )(createStore)(rootReducer, preloadedState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').rootReducer;
            store.replaceReducer(nextRootReducer)
        });
    }

    return store
}