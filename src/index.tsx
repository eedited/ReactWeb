import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './App';
import { userAction } from './redux/user/user';
import './index.css';
// eslint-disable-next-line @typescript-eslint/typedef
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;

(function loadUser() {
    try {
        const { setUser, check }: RDXUserModule.ActionType = userAction;
        const user: string|null = localStorage.getItem('user');
        if (!user) return;
        store.dispatch(setUser(JSON.parse(user)));
        store.dispatch(check());
    }
    catch (err) {
        console.log('local storage doesn\'t work');
    }
}());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
