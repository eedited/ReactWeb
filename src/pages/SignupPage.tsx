import React from 'react';
import SignupForm from '../containers/auth/SignupForm';
import BaseTemplate from './BaseTemplate';

const SignupPage: React.FC = () => (
    <BaseTemplate>
        <SignupForm />
    </BaseTemplate>
);

export default SignupPage;
