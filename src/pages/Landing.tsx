import React from 'react';
import { RouteComponentProps } from 'react-router';
import router from 'react-router-dom';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Description/Description';
import VideoGridContainer from '../containers/landing/VideoGridContainer';

interface matchParams{
    sort: string
}
interface props{
    match: router.match<matchParams>
}
const validMatch: string[] = ['popular'];
const Landing: React.FC<props> = ({ match }: props) => {
    if (!validMatch.includes(match.params.sort)) {
        // 404로 보내버렷!
        console.log('not valid index');
    }
    return (
        <BaseTemplate>
            <Description />
            <VideoGridContainer />
        </BaseTemplate>
    );
};

export default Landing;
