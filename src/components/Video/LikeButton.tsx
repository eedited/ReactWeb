import React from 'react';
import LoginOverlayContainer from '../../containers/auth/LoginOverlayContainer';
import './LikeButton.scss';

interface Props {
    onButtonClick: () => void
    toggle: boolean
    onBackgroundClick: () => void
    ModalTrigger: boolean
}

const LikeButton: React.FC<Props> = ({ onButtonClick, toggle, onBackgroundClick, ModalTrigger }: Props) => (
    <>
        <button className="likeButton" onClick={onButtonClick} type="button">
            {
                !toggle
                    ? <img className="likeButton__img" src="/icons/heart-icon2.png" alt="like" />
                    : <img className="likeButton__img" src="/icons/heart-icon--filled.png" alt="like" />
            }
        </button>
        {
            ModalTrigger && (
                <LoginOverlayContainer backgroundClicked={onBackgroundClick} title={(type: string) => (type === 'login' ? '좋아요를 누르기위해서는 로그인이 필요합니다.' : 'SIGNUP')} />
            )
        }
    </>
);

export default LikeButton;
