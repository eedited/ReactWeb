/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/typedef */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './redux';

const sagaMiddleware = createSagaMiddleware();
const createStore = () => {
    const env = process.env.NODE_ENV;
    let store;
    if (env === 'development') {
        store = configureStore({
            reducer: rootReducer,
            middleware: [sagaMiddleware, logger],
            devTools: true,
        });
    }
    else {
        store = configureStore({
            reducer: rootReducer,
            middleware: [sagaMiddleware],
            devTools: false,
        });
    }
    sagaMiddleware.run(rootSaga);
    return store;
};
export default createStore;
