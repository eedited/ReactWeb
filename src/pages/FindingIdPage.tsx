import React from 'react';
import FindingIdContainer from '../containers/auth/FindingIdContainer';
import BaseTemplate from './BaseTemplate';

const FindingIdPage: React.FC = () => (
    <div>
        <BaseTemplate>
            <FindingIdContainer />
        </BaseTemplate>
    </div>
);

export default FindingIdPage;
