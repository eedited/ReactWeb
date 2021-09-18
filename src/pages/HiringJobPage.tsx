import React from 'react';
import { Link } from 'react-router-dom';

const HiringJobPage: React.FC = () => (
    <Link to="/">
        <img
            src="/ploaceholder_page/eedited-hiring.jpg"
            alt="hiring placeholder"
            style={{ width: '100%' }}
        />
    </Link>
);

export default HiringJobPage;
