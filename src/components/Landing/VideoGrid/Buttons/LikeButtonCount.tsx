import React from 'react';
import './LikebuttonCount.scss';

export interface LikeButtonStateType {
    toggle: boolean,
    likeCnt: number
}
interface Props {
    likeButtonState: LikeButtonStateType
    onButtonClick: () => void
}

const LikeButtonCount: React.FC<Props> = ({ likeButtonState, onButtonClick }: Props) => (
    <button className="likebutton" onClick={onButtonClick} type="button">
        {
            !likeButtonState.toggle
                ? <img className="likebutton__img" src="/icons/heart-icon.png" alt="like" />
                : <img className="likebutton__img" src="/icons/heart-icon--filled.png" alt="like" />
        }
        {' '}
        <div className="likebutton__txt">{likeButtonState.likeCnt}</div>
    </button>
);

export default LikeButtonCount;
