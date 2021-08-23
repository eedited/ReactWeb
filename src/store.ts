/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/typedef */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware, logger],
        devTools: true,
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
export default createStore;
