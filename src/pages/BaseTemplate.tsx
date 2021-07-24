import React from 'react';
import Footer from '../components/common/Footer/Footer';
import NavbarContainer from '../containers/common/NavbarContainer';

interface props{
    children?: React.ReactNode
}

const BaseTemplate: React.FC<props> = ({ children }: props) => (
    <>
        <NavbarContainer />
        {children}
        <Footer />
    </>
);
BaseTemplate.defaultProps = {
    children: '',
};
export default BaseTemplate;
