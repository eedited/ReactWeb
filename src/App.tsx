import React from 'react';

import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
// import Landing from './pages/Landing';
// import logo from './logo.svg';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import FindingIdPage from './pages/FindingIdPage';
import FindingPwPage from './pages/FindingPwPage';
import VideoPage from './pages/VideoPage';
import Page404 from './pages/NotFound';
import ScrollTop from './components/common/ScrollTop';
import UploadPage from './pages/UploadPage';
import FindingJobPage from './pages/FindingJobPage';
import HiringJobPage from './pages/HiringJobPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import VideoChangePage from './pages/VideoChangePage';

type AppType = () => JSX.Element;

const App: AppType = (): JSX.Element => (
    <div className="App">
        <ScrollTop>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/video" component={Landing} />
                <Route path="/videos/:criteria" component={Landing} />
                <Route path="/videoInfo" component={VideoPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/findId" component={FindingIdPage} />
                <Route path="/findPw" component={FindingPwPage} />
                <Route path="/upload" component={UploadPage} exact />
                <Route path="/404NotFound" component={Page404} />
                <Route path="/finding" component={FindingJobPage} />
                <Route path="/hiring" component={HiringJobPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/chat" component={ChatPage} />
                <Route path="/change" component={VideoChangePage} />
                <Route component={Page404} />
            </Switch>
        </ScrollTop>
    </div>

);
export default App;
