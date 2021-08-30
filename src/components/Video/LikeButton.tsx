import React from 'react';
import './LikeButton.scss';

interface Props{
    onButtonClick: () => void
    toggle: boolean
}
const LikeButton: React.FC<Props> = ({ onButtonClick, toggle }: Props) => (
    <button className="likeButton" onClick={onButtonClick} type="button">
        {!toggle
            ? <img className="likeButton__img" src="/icons/heart-icon2.png" alt="like" />
            : <img className="likeButton__img" src="/icons/heart-icon--filled.png" alt="like" />}
    </button>
);

export default LikeButton;
