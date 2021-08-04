// TODO : 당장은 페이지를 내렸을 때 추가되는 코드가 없으나, 추가해야할 필요가 있음. 아마 스크롤이 충분히 내려왔을 때
// page의 값을 setPage로 1 증가시키면 될 것을 보임.

import React, {
    useEffect, useRef, useState, useCallback,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';
import { rootActionType, rootStateType } from '../../modules';
import { videoClear, videoList } from '../../modules/Video/video';
import { VIDEO, videoListAPISuccessReturnProp } from '../../lib/api/video';

interface fromReducerType{
    videos: videoListAPISuccessReturnProp|null
}
interface props{
    criteria: string
}
const VideoGridContainer: React.FC<props> = ({ criteria }: props) => {
    const [videoInfo, setVideoInfo]: [VIDEO[], React.Dispatch<React.SetStateAction<VIDEO[]>>] = useState<VIDEO[]>([]);
    const page: React.MutableRefObject<number> = useRef(0);
    const dispatch: React.Dispatch<rootActionType> = useDispatch();
    const {
        videos,
    }: fromReducerType = useSelector(({ videoReducer }: rootStateType) => ({
        videos: videoReducer.videoList,
    }));
    useEffect(() => {
        dispatch(videoClear());
    }, [dispatch]);
    useEffect(() => {
        dispatch((videoList({
            criteria,
            page: page.current,
        })));
        page.current += 1;
    }, [criteria, dispatch]);

    const f: ()=> void = useCallback(() => {
        dispatch((videoList({
            criteria,
            page: page.current,
        })));
        page.current += 1;
    }, [dispatch, criteria]);

    if (videos !== null) {
        return (
            <div>
                <VideoGrid videoInfos={videos.videos} />
                <button onClick={f} type="button">클릭</button>
            </div>
        );
    }
    return <div />;
};

export default VideoGridContainer;
