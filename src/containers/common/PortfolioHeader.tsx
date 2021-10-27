import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import './PortfolioHeader.scss';

interface Props {
    UserName: string
}

const PortfolioHeadeer: React.FC<Props> = ({ UserName }: Props) => (
    <nav className="portfolio__header">
        <Link to="/">
            <Logo className="portfolio__header__logo" />
        </Link>
        <div className="portfolio__header__name">
            { UserName }
        </div>
    </nav>
);

export default PortfolioHeadeer;
