import React from 'react';
import { videoListAPISuccessReturnProp } from '../../lib/api/video';
import UserMaybeLike from '../../components/Video/UserMaybeLike';

const UserMaybeLikeContainer: React.FC = () => {
    const videos: videoListAPISuccessReturnProp = {
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
            },
        ],
    };
    return (
        <UserMaybeLike videos={videos.videos} />
    );
};

export default UserMaybeLikeContainer;
