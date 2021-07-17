import React from 'react';
import Video from '../../atoms/Video';
import Image from '../../atoms/Image';
import TextBox from '../../atoms/TextBox';

interface props{
    videoId: string,
    videoName: string,
    videoTitle: string,
    videoLike: string,
    videoSrc: string
}
const VideoWithDescription: React.FC<props> = ({
    videoId, videoName, videoTitle, videoLike, videoSrc,
}: props) => (
    <div className="VideoItem">
        <Video videoId={videoId} />
        <Image src={videoSrc} />
        <TextBox size="small">{videoTitle}</TextBox>
        <TextBox size="small">{videoName}</TextBox>
        <TextBox size="small">{videoLike}</TextBox>
    </div>
);

export default VideoWithDescription;
