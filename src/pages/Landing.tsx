import React from 'react';
import { Redirect } from 'react-router';
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
    let criteria: string;
    if (match.params.criteria !== undefined && !validMatch.includes(match.params.criteria)) {
        // 404로 보내버렷!
        return (
            <Redirect to={{
                pathname: '/404NotFound',
            }}
            />
        );
    }
    if (match.params.criteria === undefined) criteria = '';
    else criteria = match.params.criteria;
    return (
        <BaseTemplate>
            <Description />
            <VideoGridContainer criteria={criteria} />
        </BaseTemplate>
    );
};

export default Landing;
