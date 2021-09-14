import React from 'react';
import LoginForm from '../containers/auth/LoginForm';
import BaseTemplate from './BaseTemplate';

const LoginPage: React.FC = () => (
    <BaseTemplate>
        <LoginForm />
    </BaseTemplate>
);

export default LoginPage;
