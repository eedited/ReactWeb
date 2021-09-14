import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
    history: RouteComponentProps['history'],
    children?: React.ReactNode
}

const ScrollTop: React.FC<Props> = ({ history, children }: Props) => {
    useEffect(() => {
        const unlisten: () => void = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);
    return <>{children}</>;
};

ScrollTop.defaultProps = {
    children: '',
};

export default withRouter(ScrollTop);
