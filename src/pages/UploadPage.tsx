import React from 'react';
import BaseTemplate from './BaseTemplate';
import UploadContainer from '../containers/upload/UploadContainer';

const UploadPage: React.FC = () => (
    <BaseTemplate>
        <UploadContainer />
    </BaseTemplate>
);

export default UploadPage;
