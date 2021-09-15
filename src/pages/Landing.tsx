import React, { useMemo } from 'react';
import qs from 'qs';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Hero/Hero';
import VideoGridContainer from '../containers/landing/VideoGridContainer';
import FilterContainer from '../containers/filter/FilterContainer';

type props = RouteComponentProps
const paramValidmatch: string[][] = [['vlog', 'game', 'beauty'], ['youtube'], ['finalCutPro'], ['thumbup', 'latest']];
const Landing: React.FC<props> = ({ location, history }: props) => {
    const parameters: string[] = useMemo(() => {
        const query: qs.ParsedQs = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });

        const { category, platform, program, sorting }: qs.ParsedQs = query;
        const paramArray: (string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined)[] = [category, platform, program, sorting];
        const params: string[] = paramArray.map((param: (string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined), idx: number) => {
            let ret: string;
            if (!param) {
                ret = 'all';
            }
            else if (typeof param === 'string') {
                if (paramValidmatch[idx].includes(param)) {
                    ret = param;
                }
                else ret = 'not';
            }
            else ret = 'not';
            return ret;
        });
        if (!sorting) {
            params[3] = 'latest';
        }
        if (params.includes('not')) {
            history.push('/404NotFound');
        }
        return params;
    }, [history, location.search]);
    return (
        <BaseTemplate>
            <Description />
            <FilterContainer
                params={parameters}
            />
            <VideoGridContainer params={parameters} />
        </BaseTemplate>
    );
};

export default withRouter(Landing);
