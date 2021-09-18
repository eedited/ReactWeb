import React, { useEffect, useRef, useCallback } from 'react';
import { AnyAction } from 'redux';
import VideoGrid from '../../components/landing/videoGrid/VideoGrid';
import { videoAction } from '../../redux/video/video';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface FromReducerType {
    videos: VideoRouter.VideoListSuccessResponse | null
    videoLoading: boolean
    endVideoList: boolean
}
interface Props {
    criteria: string
}

const VideoGridContainer: React.FC<Props> = ({ criteria }: Props) => {
    const { videoClear, videoList }: RDXVideoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const page: React.MutableRefObject<number> = useRef(1);
    const targetRef: React.RefObject<HTMLDivElement> = useRef(null);
    const {
        videos,
        videoLoading,
        endVideoList,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
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

    return videos === null
        ? <div />
        : (
            <div>
                <VideoGrid videoInfos={videos.videos} />
                <div ref={targetRef} />
            </div>
        );
};

export default VideoGridContainer;
