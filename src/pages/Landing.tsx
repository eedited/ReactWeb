import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import router from 'react-router-dom';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Hero/Hero';
import VideoGridContainer from '../containers/landing/VideoGridContainer';

interface matchParams{
    criteria: string
}
interface props{
    match: router.match<matchParams>
}
const validMatch: string[] = ['thumbup', 'latest'];
const Landing: React.FC<props> = ({ match }: props) => {
    let criteria: string = '';
    useEffect(() => {
        console.log(criteria);
    }, [criteria]);
    if (match.params.criteria !== undefined && !validMatch.includes(match.params.criteria)) {
        // 404로 보내버렷!``
        return (
            <Redirect to={{
                pathname: '/404NotFound',
            }}
            />
        );
    }
    if (match.params.criteria === undefined) criteria = 'latest';
    else criteria = match.params.criteria;

    return (
        <BaseTemplate>
            <Description />
            <a href="/videos/thumbup">thumbup</a>
            <br />
            <a href="/videos/latest">latest</a>
            <VideoGridContainer criteria={criteria} />
        </BaseTemplate>
    );
};

export default Landing;
