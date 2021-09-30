import React, { useMemo } from 'react';
import qs from 'qs';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import HeroDescription from '../containers/landing/HeroDescription';
import VideoGridContainer from '../containers/landing/VideoGridContainer';
import FilterContainer from '../containers/filter/FilterContainer';

type Props = RouteComponentProps
const paramValidmatch: string[][] = [['vlog', 'game', 'beauty'], ['youtube'], ['finalCutPro'], ['thumbup', 'latest']];
const Landing: React.FC<Props> = ({ location, history }: Props) => {
    const parameters: string[] = useMemo(() => {
        const query: qs.ParsedQs = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        Object.entries(query).forEach((x: [string, string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined]) => {
            if (!(['category', 'platform', 'program', 'sorting'].includes(x[0]))) {
                history.push('/404NotFound');
            }
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
            <HeroDescription />
            <FilterContainer
                params={parameters}
            />
            <VideoGridContainer params={parameters} />
        </BaseTemplate>
    );
};

export default withRouter(Landing);
