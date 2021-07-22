import React from 'react';

import './App.scss';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
// import Landing from './pages/Landing';
import logo from './logo.svg';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';

type AppType = ()=> JSX.Element;

const App: AppType = (): JSX.Element => (
    <div className="App">
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
    </div>

);
export default App;
