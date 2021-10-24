import React from 'react';
import ReactGA from 'react-ga';
import { BrowserHistory, State } from 'history';

interface Props{
    centerHistory: BrowserHistory<State>
    childern?: React.ReactNode
}

const RouteChangeTracker: React.FC<Props> = ({ centerHistory, childern }: Props) => {
    React.useEffect(() => {
        console.log(centerHistory);
        // eslint-disable-next-line @typescript-eslint/typedef
        const unlisten = centerHistory.listen(({ location }) => {
            ReactGA.pageview(location.pathname + location.search);
            console.log(location);
        });
        return () => {
            unlisten();
        };
    }, [centerHistory]);
    return (
        <div>{childern}</div>
    );
};
RouteChangeTracker.defaultProps = {
    childern: '',
};
export default (RouteChangeTracker);
