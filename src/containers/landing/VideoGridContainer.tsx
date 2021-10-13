import React, { useEffect, useRef, useCallback } from 'react';
import { AnyAction } from 'redux';
import VideoGrid from '../../components/landing/videoGrid/VideoGrid';
import { videoAction } from '../../redux/video/video';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface FromReducerType {
    videos: VideoRouter.VideoListSuccessResponse | null
    videoListFailure: VideoRouter.VideoFailureResponse | null
    user: User | null
    videoLoading: boolean
    endVideoList: boolean
}
interface Props {
    params: string[]
}
const VideoGridContainer: React.FC<Props> = ({ params }: Props) => {
    const { videoClear, videoList }: RDXVideoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const page: React.MutableRefObject<number> = useRef(1);
    const targetRef: React.RefObject<HTMLDivElement> = useRef(null);
    const {
        videos,
        videoLoading,
        endVideoList,
        user,
        videoListFailure,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        videos: state.videoReducer.videoList,
        endVideoList: state.videoReducer.endVideoList,
        videoLoading: state.loadingReducer['VIDEO/videoList'],
        user: state.userReducer.user,
        videoListFailure: state.videoReducer.getVideoError,
    }));

    useEffect(() => {
        dispatch(videoClear());
        page.current = 1;
    }, [videoClear, params, dispatch, user]);
    useEffect(() => {
        dispatch((videoList({
            category: params[0],
            platform: params[1],
            program: params[2],
            sorting: params[3],
            page: page.current,
        })));
        page.current += 1;
    }, [dispatch, videoList, page, params, user]);

    const f: () => void = useCallback(() => {
        if (!videos) return;
        if (endVideoList) return;
        dispatch((videoList({
            category: params[0],
            platform: params[1],
            program: params[2],
            sorting: params[3],
            page: page.current,
        }))); // 페이지의 끝에 도달했을때, 즉 더이상 불러올 페이지가 없을 때의 action은 redux에서 불러온 직후 처리.
        page.current += 1;
    }, [videos, endVideoList, dispatch, videoList, params]);

    useEffect(() => {
        if (!videos) return () => { };
        const onIntersect: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            // eslint-disable-next-line @typescript-eslint/typedef
            const [{ isIntersecting }]: IntersectionObserverEntry[] = entries;
            if (!videos) return; // 비디오가 없다면, 한번도 비디오를 불러오지 않은 것이므로, end와 start가 붙어있음
            if (!isIntersecting) return; // 아직 intersect하지 않았다면 불러올 필요가 없음.
            if (videoLoading) return; // 비디오가 로딩중이라면, 다른 비디오를 불러와서는 안된다.
            f(); // 비디오 불러오기
        };
        const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
            root: null, // target의 부모요소를 참조.
            rootMargin: '0px',
            threshold: 1.0, // 부모요소의 끝에 도달했을 때 data fetch
        });
        if (!targetRef.current) return () => { }; // 참조할 target이 없다면, return;
        const target: HTMLDivElement = targetRef.current;
        observer.observe(target); // target과 root를 계속 보며 체크
        if (endVideoList) observer.unobserve(target); // 더 이상 불러올 비디오가 없다면 unobserve.
        if (videoListFailure) observer.unobserve(target); // 더 이상 불러올 비디오가 없다면 unobserve.
        return () => {
            observer.unobserve(target); // cleanup할 때 unobserve
        };
    }, [f, videoLoading, videos, targetRef, endVideoList, videoListFailure]);

    return videos === null
        ? <div />
        : (
            <div>
                {videos.videos
                        && <VideoGrid videoList={videos.videos} />}
                <div ref={targetRef} />
            </div>
        );
};

export default React.memo(VideoGridContainer);
