import React from 'react';
import { RouterProps, withRouter } from 'react-router';
import BlueButton from '../components/common/button/BlueButton';
import BaseTemplate from './BaseTemplate';
import './IntroductionPage.scss';

type Props = RouterProps
const IntroductionPage: React.FC<Props> = ({ history }: Props) => (
    <BaseTemplate>
        <ul className="introductionpage">
            <li>
                <section>
                    <h2>
                        편집자만을 위한
                        <br />
                        포트폴리오 관리 서비스
                    </h2>
                    <p>
                        eedited는 현재 ~~명의 유저가 포트폴리오를 관리하고 있어요
                        <br />
                        영상 편집에 집중할 수 있게 포트폴리오 관리를 해드립니다!
                        <br />
                        <br />
                        편집자의 더 나은 대우와 더 편리한 구인구직,
                        <br />
                        하나의 링크가 완벽한 포트폴리오가 되는 날을 위해 노력합니다.
                    </p>
                </section>

                <img src="/images/Introduction/landing.png" alt="landing" />

            </li>
            <div style={{ height: '64px' }} />
            <li>
                <section>
                    <h2>
                        편집했던 여러 유튜버의 동영상을
                        <br />
                        한곳에 모아보세요!
                    </h2>
                    <p>
                        eedited에서는 우리가 편집했던 동영상을 한곳에 모아
                        <br />
                        한눈에 보여줄 수 있어요.
                        <br />
                        <br />
                        eedited에 동영상 링크만 추가하면 손쉽게
                        <br />
                        한눈에 들어오는 포트폴리오가 완성할 수 있을거에요 :)
                        <br />
                    </p>
                </section>
                <img src="/images/Introduction/portfolio.png" alt="portfolio" />
            </li>
            <div style={{ height: '64px' }} />
            <li>
                <section>
                    <h2>
                        다양한 그래프를 통해
                        <br />
                        자신을 효율적으로 알려보세요!
                    </h2>
                    <p>
                        eedited를 통해 자신이 어떤 성향의 영상을 편집했는지
                        <br />
                        효율적으로 보여줄 수 있습니다.
                        <br />
                    </p>
                </section>
                <div className="landing__li__graphs">
                    <img className="landing__li__graph" src="/images/Introduction/graph1.png" alt="graph1" />
                    <img className="landing__li__graph" src="/images/Introduction/graph2.png" alt="graph2" />
                </div>
            </li>
            <div style={{ height: '64px' }} />
            <li>
                <section>
                    <p>
                        eedited에 관심이 생기셨나요? :)
                        <br />
                        관심이 생기셨다면, eedited에서 포트폴리오 관리를 시작해보세요
                        <br />
                        <br />
                        <BlueButton
                            type="button"
                            onClick={() => {
                                history.push('/video');
                            }}
                        >
                            시작하기
                        </BlueButton>
                    </p>
                </section>
            </li>
        </ul>
    </BaseTemplate>
);

export default withRouter(IntroductionPage);
