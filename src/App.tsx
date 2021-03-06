import React from 'react';
import './App.scss';
import { RouteComponentProps, withRouter } from 'react-router';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
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
import SignupSuccess from './pages/SignupSuccess';
import HelloPage from './pages/HelloPage';
import EmailValidate from './pages/EmailValidate';
import AccountSettingPage from './pages/AccountSettingPage';
import FindingPage from './pages/FindingPage';
import SnsAuthPage from './pages/SnsAuthPage';
import ServicePolicy from './pages/ServicePolicy';
import PrivateInformationPolicy from './pages/PrivateInformationPolicy';
import BlockUserPage from './pages/BlockUserPage';
import SharedPortfolio from './pages/SharedPortfolio';
import IntroductionPage from './pages/IntroductionPage';

type Props = RouteComponentProps;
const App: React.FC<Props> = ({ location }: Props) => {
    const path: string = location.pathname + location.search;
    React.useEffect(() => {
        ReactGA.set({ page: path });
        ReactGA.pageview(path);
    }, [path]);
    return (
        <div className="App">
            <ScrollTop>
                <Switch>
                    <Route path="/" component={IntroductionPage} exact />
                    <Route path="/video" component={Landing} />
                    <Route path="/videos" component={Landing} />
                    <Route path="/search" component={FindingPage} />
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
                    <Route path="/signupSuccess" component={SignupSuccess} />
                    <Route path="/hello" component={HelloPage} />
                    <Route path="/AccountSetting" component={AccountSettingPage} exact />
                    <Route path="/AccountSetting/:param" component={AccountSettingPage} />
                    <Route path="/emailValidation" component={EmailValidate} />
                    <Route path="/snsAuth" component={SnsAuthPage} />
                    <Route path="/servicePolicy" component={ServicePolicy} />
                    <Route path="/PrivateInformationPolicy" component={PrivateInformationPolicy} />
                    <Route path="/portfolio/:param" component={SharedPortfolio} />
                    <Route component={Page404} />
                </Switch>
            </ScrollTop>
        </div>
    );
};
export default withRouter(App);
