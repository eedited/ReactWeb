import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import ReactGA from 'react-ga';

type Props = RouteComponentProps

const RouteChangeTracker: React.FC<Props> = ({ history }: Props) => {
    // eslint-disable-next-line @typescript-eslint/typedef
    history.listen(({ location, action }) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });
    return (
        <div />
    );
};

export default withRouter(RouteChangeTracker);
