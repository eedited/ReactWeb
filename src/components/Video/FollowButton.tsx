import React from 'react';
import LoginOverlayContainer from '../../containers/auth/LoginOverlayContainer';
import './FollowButton.scss';

interface Props {
    onButtonClick: () => void
    toggle: boolean
    onBackgroundClick: () => void
    ModalTrigger: boolean
}

const FollowButton: React.FC<Props> = ({ onButtonClick, toggle, onBackgroundClick, ModalTrigger }: Props) => (
    <>
        {
            !toggle
                ? (
                    <button className="FollowButton" onClick={onButtonClick} type="button">
                        <img className="FollowButton__default" src="/icons/follow-icon-big.png" alt="follow" />
                    </button>
                )
                : (
                    <button className="FollowingButton" onClick={onButtonClick} type="button">
                        <img className="FollowingButton__default" src="/icons/following-icon.png" alt="follow" />
                    </button>
                )
        }
        {
            ModalTrigger && (
                <LoginOverlayContainer backgroundClicked={onBackgroundClick} title={(type: string) => (type === 'login' ? 'follow하기 위해서는 로그인이 필요합니다.' : 'SIGNUP')} />
            )
        }
    </>
);

export default FollowButton;
