import React from 'react';
import BaseTemplate from './BaseTemplate';
import HeroContainer from '../containers/findingWork/HeroContainer';
import FilterContainer from '../containers/findingWork/FilterContainer';
import ContentContainer from '../containers/findingWork/ContentContainer';
import './FindingWorkPage.scss';

const FindingIdPage: React.FC = () => (
    <BaseTemplate>
        <HeroContainer />
        <div className="content">
            <FilterContainer />
            <ContentContainer />
        </div>
    </BaseTemplate>
);

export default FindingIdPage;
