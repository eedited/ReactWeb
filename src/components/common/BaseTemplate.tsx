import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

interface props{
    children?: React.ReactNode
}
const BaseTemplate: React.FC<props> = ({ children }: props) => (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
);
BaseTemplate.defaultProps = {
    children: '',
};
export default BaseTemplate;
