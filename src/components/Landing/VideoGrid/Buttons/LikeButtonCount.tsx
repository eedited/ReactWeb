import React from 'react';
import LoginOverlayContainer from '../../../../containers/auth/LoginOverlayContainer';
import './LikebuttonCount.scss';

export interface likeButtonStateType{
    toggle: boolean,
    likeCnt: number
}
interface props{
    likeButtonState: likeButtonStateType
    onButtonClick: () => void
    onBackgroundClick: () => void
    ModalTrigger: boolean
}
const LikeButtonCount: React.FC<props> = ({ likeButtonState, onButtonClick, onBackgroundClick, ModalTrigger }: props) => (
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
                <LoginOverlayContainer backgroundClicked={onBackgroundClick} title={(type: string) => (type === 'login' ? '좋아요를 누르기위해서는 로그인이 필요합니다.' : 'SIGNUP')} />
            )
        }
    </>
);

export default LikeButtonCount;
