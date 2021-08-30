import React from 'react';
import './LikebuttonCount.scss';

export interface likeButtonStateType{
    toggle: boolean,
    likeCnt: number
}
interface props{
    likeButtonState: likeButtonStateType
    onButtonClick: () => void
}
const LikeButtonCount: React.FC<props> = ({ likeButtonState, onButtonClick }: props) => (
    <button className="likebutton" onClick={onButtonClick} type="button">
        {!likeButtonState.toggle
            ? <img className="likebutton__img" src="/icons/heart-icon.png" alt="like" />
            : <img className="likebutton__img" src="/icons/heart-icon--filled.png" alt="like" />}
        {' '}
        <div className="likebutton__txt">{likeButtonState.likeCnt}</div>
    </button>
);

export default LikeButtonCount;
