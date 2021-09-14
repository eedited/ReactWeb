import React from 'react';
import Footer from '../components/common/Footer/Footer';
import NavbarContainer from '../containers/common/NavbarContainer';

interface Props {
    children?: React.ReactNode
}

const BaseTemplate: React.FC<Props> = ({ children }: Props) => (
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
