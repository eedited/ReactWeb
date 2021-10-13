import React from 'react';
import AuthProtal from '../../../../containers/auth/AuthProtal';
import LoginOverlayContainer from '../../../../containers/auth/LoginOverlayContainer';
import './LikebuttonCount.scss';

export interface LikeButtonStateType {
    toggle: boolean,
    likeCnt: number
}
interface Props {
    likeButtonState: LikeButtonStateType
    onButtonClick: () => void
    onBackgroundClick: () => void
    ModalTrigger: boolean
}
const LikeButtonCount: React.FC<Props> = ({ likeButtonState, onButtonClick, onBackgroundClick, ModalTrigger }: Props) => (
    <>
        <button className="likebutton" onClick={onButtonClick} type="button">
            {!likeButtonState.toggle
                ? <img className="likebutton__img" src="/icons/heart-icon.png" alt="like" />
                : <img className="likebutton__img" src="/icons/heart-icon--filled.png" alt="like" />}
            {' '}
            <div className="likebutton__txt">{likeButtonState.likeCnt}</div>
        </button>
        {
            ModalTrigger && (
                <AuthProtal backgroundClicked={onBackgroundClick} type="login" title={(type: string) => (type === 'login' ? '좋아요를 누르기위해서는 로그인이 필요합니다.' : 'SIGNUP')} />
            )
        }
    </>
);

export default LikeButtonCount;
