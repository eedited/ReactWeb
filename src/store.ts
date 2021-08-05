// 난 이거의 타입을 적을 자신이 없어
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
