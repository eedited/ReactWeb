import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './App';
import { userAction } from './modules/user/user';
// eslint-disable-next-line @typescript-eslint/typedef
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;

function loadUser() {
    try {
        const user: string|null = sessionStorage.getItem('user');
        if (!user) return;
        store.dispatch(userAction.setUser(JSON.parse(user)));
    }
    catch (err) {
        console.log('local session doesn\'t work');
    }
}

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
