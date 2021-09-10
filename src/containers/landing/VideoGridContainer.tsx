// TODO : 당장은 페이지를 내렸을 때 추가되는 코드가 없으나, 추가해야할 필요가 있음. 아마 스크롤이 충분히 내려왔을 때
// page의 값을 setPage로 1 증가시키면 될 것을 보임.

import React, {
    useEffect, useRef, useCallback,
} from 'react';
import { AnyAction } from 'redux';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';
import { videoAction } from '../../redux/Video/video';

import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface fromReducerType{
    videos: videoRouter.videoListSuccessResponse|null
    videoLoading: boolean
    endVideoList: boolean
}
interface props{
    criteria: string
}
const VideoGridContainer: React.FC<props> = ({ criteria }: props) => {
    const { videoClear, videoList }: videoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const page: React.MutableRefObject<number> = useRef(1);
    const targetRef: React.RefObject<HTMLDivElement> = useRef(null);
    const {
        videos,
        videoLoading,
        endVideoList,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        videos: state.videoReducer.videoList,
        endVideoList: state.videoReducer.endVideoList,
        videoLoading: state.loadingReducer['VIDEO/videoList'],
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

    const f: () => void = useCallback(() => {
        if (!videos) return;
        if (endVideoList) return;
        dispatch((videoList({
            criteria,
            page: page.current,
        })));
        page.current += 1;
    }, [videos, endVideoList, dispatch, videoList, criteria]);

    useEffect(() => {
        if (!videos) return () => {};
        const onIntersect: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            // eslint-disable-next-line @typescript-eslint/typedef
            const [{ isIntersecting }]: IntersectionObserverEntry[] = entries;
            if (!videos) return;
            if (!isIntersecting) return;
            if (videoLoading) return;
            f();
        };
        const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
            root: null, // target의 부모요소를 참조.
            rootMargin: '0px',
            threshold: 1.0, // 부모요소의 끝에 도달했을 때 data fetch
        });
        if (!targetRef.current) return () => {};
        const target: HTMLDivElement = targetRef.current;
        observer.observe(target);
        if (endVideoList) observer.unobserve(target);
        return () => {
            observer.unobserve(target);
        };
    }, [f, videoLoading, videos, targetRef, endVideoList]);
    if (videos !== null) {
        return (
            <div>
                <VideoGrid videoInfos={videos.videos} />
                <div ref={targetRef} />
            </div>
        );
    }
    return <div />;
};

export default VideoGridContainer;
