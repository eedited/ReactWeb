import React from 'react';
import { ReactComponent as Logo } from '../../../../images/followerCntIcon.svg';
import './FollowerButtonCount.scss';

export interface FollowerButtonStateType {
    FollowerCnt: number
}
interface Props {
    followerCnt: number
}
const FollowerButtonCount: React.FC<Props> = ({ followerCnt }: Props) => (
    <div className="followerbutton">
        <Logo className="followerbutton__img" />
        <div className="followerbutton__txt">{followerCnt}</div>
    </div>
);

export default FollowerButtonCount;
