import React from 'react';
import Navbar from '../common/Navbar/Navbar';

const SignupPage: React.FC = () => (
    <div>
        <Navbar />
        <div>
            <div>
                <h2>put email:</h2>
                <input type="email" />
            </div>
            <div>
                <h2>passwd:</h2>
                <input type="password" />
            </div>
        </div>
    </div>
);

export default SignupPage;
