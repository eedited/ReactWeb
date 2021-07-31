import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import router from 'react-router-dom';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Description/Description';
import VideoGridContainer from '../containers/landing/VideoGridContainer';

interface matchParams{
    criteria: string
}
interface props{
    match: router.match<matchParams>
}
const validMatch: string[] = ['popular'];
const Landing: React.FC<props> = ({ match }: props) => {
    if (match.params.criteria !== undefined && !validMatch.includes(match.params.criteria)) {
        // 404로 보내버렷!
        <Redirect to={{
            pathname: '/404NotFound',
        }}
        />;
        console.log(`${match.params.criteria}:  not valid index`);
    }
    return (
        <BaseTemplate>
            <Description />
            <VideoGridContainer criteria={match.params.criteria} />
        </BaseTemplate>
    );
};

export default Landing;
