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
    params: string[]
}
const VideoGridContainer: React.FC<props> = ({ params }: props) => {
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
        page.current = 1;
    }, [videoClear, params, dispatch]);
    useEffect(() => {
        dispatch((videoList({
            category: params[0],
            platform: params[1],
            program: params[2],
            sorting: params[3],
            page: page.current,
        })));
        page.current += 1;
    }, [dispatch, videoList, page, params]);

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
        if (!videos) return () => {};
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
        if (!targetRef.current) return () => {}; // 참조할 target이 없다면, return;
        const target: HTMLDivElement = targetRef.current;
        observer.observe(target); // target과 root를 계속 보며 체크
        if (endVideoList) observer.unobserve(target); // 더 이상 불러올 비디오가 없다면 unobserve.
        return () => {
            observer.unobserve(target); // cleanup할 때 unobserve
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

export default React.memo(VideoGridContainer);
