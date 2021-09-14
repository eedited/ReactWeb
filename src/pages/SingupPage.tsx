import React from 'react';
import SignupForm from '../containers/auth/SignupForm';
import BaseTemplate from './BaseTemplate';
// navbar 지움.
const SignupPage: React.FC = () => (
    <BaseTemplate>
        <SignupForm />
    </BaseTemplate>
);

export default SignupPage;
