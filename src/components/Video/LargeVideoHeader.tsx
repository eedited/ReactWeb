import React from 'react';
import './LargeVideoHeader.scss';
import { VIDEO } from '../../lib/api/video';

interface props {
    video: VIDEO
}

const LargeVideoDescription: React.FC<props> = ({ video }: props) => (
    <div className="LargeVideoHeader">
        <div className="LargeVideoHeader__main">
            <img className="LargeVideoHeader__main__profileIcon" src="../../../../public/sungPA.jpg" alt="profile" />
            <div className="LargeVideoHeader__main__rest">
                <div className="LargeVideoHeader__main__rest__title">{ video.title }</div>
                <div className="LargeVideoHeader__main__rest__nickname">{ video.uploader }</div>
            </div>
        </div>
        <div className="LargeVideoHeader__iconlist">
            <img className="LargeVideoHeader_iconlist__icon" src="/icons/follow-button.png" alt="" />
            <img className="LargeVideoHeader_iconlist__icon" src="/icons/chat-button.png" alt="" />
            <img className="LargeVideoHeader_iconlist__icon" src="/icons/like-button.png" alt="" />
        </div>
    </div>
);

export default LargeVideoDescription;
