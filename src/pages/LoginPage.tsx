import React from 'react';
import NavbarOnlyLogo from '../components/common/Navbar/NavbarOnlyLogo';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage: React.FC = () => (
    <div>
        <NavbarOnlyLogo />
        <LoginForm />
    </div>
);

export default LoginPage;
