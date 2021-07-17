import React from 'react';

import './App.scss';
import { Route } from 'react-router-dom';
import Landing from './pages/Landing';
import logo from './logo.svg';

type AppType = ()=> JSX.Element;

const App: AppType = (): JSX.Element => (
    <div className="App">
        <Route path="/" component={Landing} exact />
    </div>

);
export default App;
