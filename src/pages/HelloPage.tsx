import React from 'react';
import { RouteComponentProps } from 'react-router';
import BlueButton from '../components/common/button/BlueButton';
import BaseTemplate from './BaseTemplate';
import './HelloPage.scss';

type Props = RouteComponentProps
const HelloPage: React.FC<Props> = ({ history }: Props) => (
    <BaseTemplate>
        <div className="hello">
            <div className="hello__title">
                반가워요!
                <br />
                eedited에 오신걸 환영합니다!
            </div>
            <div className="hello__body">
                서비스에 가입해주셔서 감사합니다!
                <br />
                저희는 편집자 포트폴리오 관리서비스, eedited입니다.
                <br />

            </div>
            <BlueButton onClick={() => {
                history.push('/');
            }}
            >
                시작하기
            </BlueButton>
        </div>
    </BaseTemplate>
);

export default HelloPage;
