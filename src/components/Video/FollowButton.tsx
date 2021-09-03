import React from 'react';
import './FollowButton.scss';

interface Props{
    onButtonClick: () => void
    toggle: boolean
}
// const FollowButton: React.FC<Props> = ({ onButtonClick, toggle }: Props) => (
//     <button className="FollowButton" onClick={onButtonClick} type="button">
//         {!toggle
//             ? <img className="FollowButton__default" src="/icons/follow-icon-big.png" alt="follow" />
//             : <img className="FollowButton__changed" src="/icons/follow-icon-big.png" alt="follow" />}
//     </button>
// );
const FollowButton: React.FC<Props> = ({ onButtonClick, toggle }: Props) => (
    <>
        {!toggle
            ? (
                <button className="FollowButton" onClick={onButtonClick} type="button">
                    <img className="FollowButton__default" src="/icons/follow-icon-big.png" alt="follow" />
                </button>
            )
            : (
                <button className="FollowingButton" onClick={onButtonClick} type="button">
                    <img className="FollowingButton__default" src="/icons/following-icon.png" alt="follow" />
                </button>
            )}
    </>
);

export default FollowButton;
