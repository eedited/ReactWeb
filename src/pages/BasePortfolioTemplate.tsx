import React from 'react';
import PortfolioHeader from '../containers/common/PortfolioHeader';
import PortfolioFooter from '../containers/common/PortfolioFooter';
import './BasePortfolioTemplate.scss';

interface Props {
    children?: React.ReactNode,
    userName: string
}

const BasePortfolioTemplate: React.FC<Props> = ({ children, userName }: Props) => (
    <div className="base__portfolio">
        <PortfolioHeader UserName={userName} />
        <div className="base__portfolio__content">{children}</div>
        <PortfolioFooter />
    </div>
);

BasePortfolioTemplate.defaultProps = {
    children: '',
};

export default BasePortfolioTemplate;
