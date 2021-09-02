import React from 'react';
import BaseTemplate from './BaseTemplate';
import Filter from '../components/findingJobs/FilterElement/Filter';
import HeroDescription from '../components/findingJobs/HeroDescription/HeroDescription';
import EditorInfo from '../components/findingJobs/EditorInfo/EditorInfo';

const FindingIdPage: React.FC = () => (
    <BaseTemplate>
        <HeroDescription />
        <div className="content" style={{ maxWidth: '1500px', marginLeft: 'auto', display: 'flex' }}>
            <Filter />
            <EditorInfo />
        </div>
    </BaseTemplate>
);

export default FindingIdPage;
