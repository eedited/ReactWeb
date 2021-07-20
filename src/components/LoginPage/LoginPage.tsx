import React from 'react';
import Navbar from '../common/Navbar/Navbar';

const LoginPage: React.FC = () => (
    <div>
        <Navbar />
        <div>
            <div>
                <h2>id:</h2>
                <input type="email" />
            </div>
            <div>
                <h2>passwd:</h2>
                <input type="password" />
            </div>
        </div>
    </div>
);

export default LoginPage;
