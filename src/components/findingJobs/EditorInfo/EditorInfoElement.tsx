import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import './EditorInfoElement.scss';

const video: videoRouter.videoListSuccessResponse = {
    videos: [
        {
            id: '1',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
        {
            id: '2',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
        {
            id: '3',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
        {
            id: '4',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
        {
            id: '5',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
        {
            id: '6',
            url: 'https://www.youtube.com/watch?v=Nh27WsNdymo',
            uploader: 'minsu',
            title: 'IU',
            discription: 'IU 3시간',
            thumbnail: 'https://img.youtube.com/vi/Nh27WsNdymo/0.jpg',
            likeCnt: 1000,
            viewCnt: 1000,
            createdAt: (new Date()),
            updatedAt: (new Date()),
            deleted: null,
            nickname: '아이유 편집자',
        },
    ],
};

interface props{
    name: string,
    protag?: boolean,
    info?: string[],
    isFollowed?: boolean,
    videos?: string[] | null
}

const EditorInfoElement: React.FC<props> = ({ name, protag, info, isFollowed, videos }: props) => (
    <div className="jobProfile">
        <div className="jobProfile__header">
            <div className="jobProfile__title">
                <div className="jobProfile__title__name">
                    <div className="jobProfile__title__nickname">{name}</div>
                    { protag && <div className="jobProfile__title__protag">pro</div>}
                </div>
                <div className="jobProfile__title__info">
                    {
                        info
                && info.reduce((rlt: string, value: string) => `${rlt} \u00b7 ${value}`, '')
                    }
                </div>
            </div>
            <div className="jobProfile__title__buttons">
                <img className={`jobProfile__title__button ${isFollowed ? 'active' : ''}`} src="/icons/chat-icon.png" alt="folow" />
                <img className="jobProfile__title__button" src="/icons/chat-icon.png" alt="folow" />
            </div>
        </div>
        <div className="jobProfile__video">
            {
                video
                && video.videos.map((v: VIDEO) => <div className="jobProfile__video__videoElement"><VideoContainer videoInfo={v} /></div>)
            }
        </div>
    </div>
);

EditorInfoElement.defaultProps = {
    protag: false,
    info: [''],
    isFollowed: false,
    videos: null,
};

export default EditorInfoElement;
