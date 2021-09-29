import React, { useMemo } from 'react';
import qs from 'qs';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import VideoGridContainer from '../containers/landing/VideoGridContainer';
import FilterContainer from '../containers/filter/FilterContainer';
import FindContainer from '../containers/find/FindContainer';

type Props = RouteComponentProps
const paramValidmatch: string[][] = [['vlog', 'game', 'beauty'], ['youtube'], ['finalCutPro'], ['thumbup', 'latest']];
const FindingPage: React.FC<Props> = ({ location, history }: Props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const parameters: string[] = useMemo(() => {
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
    }, [history, query]);
    const queryParam: string = useMemo(() => {
        const { q }: qs.ParsedQs = query;
        let ret: string;
        if (typeof q === 'undefined') {
            ret = '';
        }
        else if (typeof q !== 'string') {
            history.push('/'); ret = '';
        }
        else {
            ret = q;
        }
        return ret;
    }, [history, query]);

    return (
        <BaseTemplate>
            <FindContainer param={queryParam} />
        </BaseTemplate>
    );
};

export default withRouter(FindingPage);
