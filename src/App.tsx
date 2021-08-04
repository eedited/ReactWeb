import React from 'react';

import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
// import Landing from './pages/Landing';
// import logo from './logo.svg';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import FindingIdPage from './pages/FindingIdPage';
import FindingPwPage from './pages/FindingPwPage';
import VideoPage from './pages/VideoPage';
import Page404 from './pages/NotFound';

type AppType = ()=> JSX.Element;

const App: AppType = (): JSX.Element => (
    <div className="App">
        <Switch>
            <Route path={['/', '/videos']} component={Landing} exact />
            <Route path="/videos/:criteria" component={Landing} />
            <Route path="/videoInfo" component={VideoPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/findId" component={FindingIdPage} />
            <Route path="/findPw" component={FindingPwPage} />
            <Route path="/404NotFound" component={Page404} />
            <Route component={Page404} />
        </Switch>
    </div>

);
export default App;
