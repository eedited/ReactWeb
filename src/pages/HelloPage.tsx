import React from 'react';
import { RouteComponentProps } from 'react-router';
import BlueButton from '../components/common/Button/BlueButton';
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
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
                서비스 소개글
                <br />
            </div>
            <BlueButton onClick={() => {
                history.push('/Profile/minsu');
            }}
            >
                마이페이지
            </BlueButton>
        </div>
    </BaseTemplate>
);

export default HelloPage;
