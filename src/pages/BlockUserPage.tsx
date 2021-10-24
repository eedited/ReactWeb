import React from 'react';
import { withRouter, RouterProps } from 'react-router';
import BlueButton from '../components/common/button/BlueButton';
import BaseTemplate from './BaseTemplate';

type Props = RouterProps;

const NotFound: React.FC<Props> = ({ history }: Props) => (
    <BaseTemplate>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '83px', marginBottom: '110px' }}>
            <div style={{ fontSize: '45px', fontFamily: 'Pretendard-Medium' }}>Oops!</div>
            <img src="/images/heros/problem.png" style={{ width: '342px', marginTop: '83px' }} alt="problem" />
            <div style={{ textAlign: 'center', fontSize: '17px', lineHeight: '28px', fontFamily: 'Pretendard-Medium', marginTop: '83px', marginBottom: '52px' }}>
                활동 불가
                <br />
                차단된 유저입니다.
            </div>
            <BlueButton onClick={() => {
                history.push('/AccountSetting/request');
            }}
            >
                건의하기
            </BlueButton>
            <br />
            <BlueButton onClick={() => {
                history.push('/');
            }}
            >
                메인 화면으로
            </BlueButton>
        </div>
    </BaseTemplate>
);

export default withRouter(NotFound);
