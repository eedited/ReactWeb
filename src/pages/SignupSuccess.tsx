import { QuickSight } from 'aws-sdk';
import React, { useMemo } from 'react';
import qs from 'qs';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BlueButton from '../components/common/button/BlueButton';
import './SignupSuccess.scss';

type Props = RouteComponentProps
const SignupSuccess: React.FC<Props> = ({ history, location }: Props) => {
    const x: number = 5;
    const emailParam: string|undefined = useMemo(() => {
        const query: qs.ParsedQs = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        const { email }: qs.ParsedQs = query;
        if (typeof email === 'string') {
            return email;
        }
        return undefined;
    }, [location.search]);
    return (
        <div className="SignupSuccess">
            <div className="SignupSuccess__title">
                <div>
                    <b>인증메일</b>
                    을 보냈어요
                </div>
            </div>
            <div className="SignupSuccess__body">
                <div>
                    Hello!
                    {' '}
                    <b style={{ color: 'rgb(233, 144, 65)' }}>eedited</b>
                    에 오신걸 환영합니다
                </div>
                <div>아직 한 단계가 더 남았어요</div>
                <br />
                <div>
                    가입해주신 이메일(
                    {emailParam && `${emailParam}`}
                    )을 인증해주시면,
                    {' '}
                    <b style={{ color: 'rgb(233, 144, 65)' }}>eedited</b>
                    의 서비스를 마음껏 이용하실 수 있습니다 :)
                </div>
                <br />
                <div>가입해주셔서 감사합니다.</div>
            </div>
            <BlueButton onClick={() => {
                history.push('/');
            }}
            >
                메인으로
            </BlueButton>
        </div>
    );
};

export default SignupSuccess;
