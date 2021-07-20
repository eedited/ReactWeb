import React from 'react';

import './App.scss';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import LoginPage from './components/LoginPage/LoginPage';
// import Landing from './pages/Landing';
import logo from './logo.svg';
import SignupPage from './components/SignupPage/SignupPage';

type AppType = ()=> JSX.Element;

const App: AppType = (): JSX.Element => (
    <div className="App">
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
    </div>

);
export default App;
