// TODO : api 서버에 갯수 줄 수 있게 만들어서 동영상 가장 최신꺼 4개만 받아와서 video 배열 구성한 후, coponent에 배열 만들어둔걸로 넘기기.

import React from 'react';
import { videoListAPISuccessReturnProp } from '../../lib/api/video';
import MoreByUser from '../../components/Video/MoreByUser';

const MoreByUserContainer: React.FC = () => {
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
        ],
    };
    return <MoreByUser videos={videos.videos} />;
};

export default MoreByUserContainer;
