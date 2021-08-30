import React from 'react';
import UserMaybeLike from '../../components/Video/UserMaybeLike';

const UserMaybeLikeContainer: React.FC = () => {
    const videos: videoRouter.videoListSuccessResponse = {
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
                User: { nickname: '아이유 편집자' },

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
                User: { nickname: '아이유 편집자' },

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
                User: { nickname: '아이유 편집자' },

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
                User: { nickname: '아이유 편집자' },

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
                User: { nickname: '아이유 편집자' },

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
                User: { nickname: '아이유 편집자' },

            },
        ],
    };
    return (
        <UserMaybeLike videos={videos.videos} />
    );
};

export default UserMaybeLikeContainer;
