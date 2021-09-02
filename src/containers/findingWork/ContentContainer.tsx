import React, { useState } from 'react';
import EditorInfo from '../../components/findingJobs/EditorInfo/EditorInfo';
import './ContentContainer.scss';

const contentContainer: React.FC = () => (
    <div className="editors">
        <EditorInfo name="제임스" protag info={['서울 강남구', '파트타임', '브이로그']} />
        <EditorInfo name="제임스" protag info={['서울 강남구', '파트타임', '브이로그']} />
        <EditorInfo name="제임스" info={['서울 강남구', '파트타임', '브이로그']} />
    </div>
);

export default contentContainer;
