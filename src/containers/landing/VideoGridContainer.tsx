// TODO : 당장은 페이지를 내렸을 때 추가되는 코드가 없으나, 추가해야할 필요가 있음. 아마 스크롤이 충분히 내려왔을 때
// page의 값을 setPage로 1 증가시키면 될 것을 보임.

import React, {
    useEffect, useRef, useCallback,
} from 'react';
import { AnyAction } from 'redux';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';
import { videoAction } from '../../modules/Video/video';
import { videoListAPISuccessReturnProp } from '../../lib/api/video';
import { videoActionType } from '../../modules/Video/videoType';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface fromReducerType{
    videos: videoListAPISuccessReturnProp|null
}
interface props{
    criteria: string
}
const VideoGridContainer: React.FC<props> = ({ criteria }: props) => {
    const { videoClear, videoList }: videoActionType = videoAction;
    const page: React.MutableRefObject<number> = useRef(0);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        videos,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        videos: state.videoReducer.videoList,
    }));
    useEffect(() => {
        dispatch(videoClear());
    }, [dispatch, videoClear]);
    useEffect(() => {
        dispatch((videoList({
            criteria,
            page: page.current,
        })));
        page.current += 1;
    }, [criteria, dispatch, videoList]);

    const f: ()=> void = useCallback(() => {
        dispatch((videoList({
            criteria,
            page: page.current,
        })));
        page.current += 1;
    }, [dispatch, videoList, criteria]);

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
