import React from 'react';
import NavbarOnlyLogo from '../components/common/Navbar/NavbarOnlyLogo';
import SignupForm from '../containers/auth/SignupForm';

const SignupPage: React.FC = () => (
    <div>
        <NavbarOnlyLogo />
        <SignupForm />
    </div>
);

export default SignupPage;
