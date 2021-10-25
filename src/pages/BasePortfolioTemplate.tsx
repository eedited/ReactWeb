import React from 'react';
import Footer from '../containers/common/Footer';
import PortfolioHeader from '../containers/common/PortfolioHeader';

interface Props {
    children?: React.ReactNode,
    userName: string
}

const BasePortfolioTemplate: React.FC<Props> = ({ children, userName }: Props) => (
    <>
        <PortfolioHeader UserName={userName} />
        {children}
        <Footer />
    </>
);

BasePortfolioTemplate.defaultProps = {
    children: '',
};

export default BasePortfolioTemplate;
