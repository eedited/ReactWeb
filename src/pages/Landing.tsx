import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import router from 'react-router-dom';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Hero/Hero';
import VideoGridContainer from '../containers/landing/VideoGridContainer';
import FilterContainer from '../containers/filter/FilterContainer';

interface MatchParams {
    criteria: string
}
interface Props {
    match: router.match<MatchParams>
}

const validMatch: string[] = ['thumbup', 'latest'];
const Landing: React.FC<Props> = ({ match }: Props) => {
    let criteria: string = '';

    if (match.params.criteria !== undefined && !validMatch.includes(match.params.criteria)) {
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
            <FilterContainer />
            <VideoGridContainer criteria={criteria} />
        </BaseTemplate>
    );
};

export default Landing;
