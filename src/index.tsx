import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { applyMiddleware, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer, { rootStateType, rootActionType, rootSaga } from './modules';
import { setUser } from './modules/user/user';
// eslint-disable-next-line @typescript-eslint/typedef
const sagaMiddleware = createSagaMiddleware();
const store: Store<rootStateType, rootActionType> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);
function loadUser() {
    try {
        const user: string|null = sessionStorage.getItem('user');
        if (!user) return;
        store.dispatch(setUser(JSON.parse(user)));
    }
    catch (err) {
        console.log('local session doesn\'t work');
    }
}
sagaMiddleware.run(rootSaga);
loadUser();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
