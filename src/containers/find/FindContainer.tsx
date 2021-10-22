import { AxiosResponse } from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { search } from '../../api/search';
import UserDescription from '../../components/landing/userGrid/userDescription/UserDescription';
import VideoDescription1 from '../../components/landing/videoGrid/videoDescription/VideoDescription1';
import UserContainer from '../landing/UserContainer';
import VideoContainer from '../landing/VideoContainer';
import './Find.scss';

interface myVideo {
    video: Video
    type: 'Video'
}

interface myUser {
    user: User
    type: 'User'
}

type Combine = myVideo | myUser

interface NumElement{
    video: number
    user: number
}

interface Props extends RouteComponentProps{
    param: string
}
interface SearchResponse {
    success: SearchRouter.SearchSuccessResponse | null
    failure: SearchRouter.SearchFailureResponse | null
}

function isVideo(x: Combine): x is myVideo {
    return x.type === 'Video';
}

const FindContainer: React.FC<Props> = ({ param, history }: Props) => {
    const page: React.MutableRefObject<number> = useRef(1);
    const endPage: React.MutableRefObject<boolean> = useRef(false);
    const targetRef: React.RefObject<HTMLDivElement> = useRef(null);
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [searchResponse, setSearchResponse]: [SearchResponse, React.Dispatch<React.SetStateAction<SearchResponse>>] = useState<SearchResponse>({ success: null, failure: null });
    const [videos, setVideos]: [Video[], React.Dispatch<React.SetStateAction<Video[]>>] = useState<Video[]>([]);
    const [users, setUsers]: [User[], React.Dispatch<React.SetStateAction<User[]>> ] = useState<User[]>([]);
    const [combines, setCombines]: [Combine[], React.Dispatch<React.SetStateAction<Combine[]>> ] = useState<Combine[]>([]);
    const [numElements, setNumElements]: [NumElement, React.Dispatch<React.SetStateAction<NumElement>> ] = useState<NumElement>({ video: 0, user: 0 });
    const [searchInput, setSearchInput]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');
    const fetchFind: () => void = useCallback(() => {
        (async function f() {
            setSearchResponse({ success: null, failure: null });
            setLoading(true);
            try {
                const response: AxiosResponse<SearchRouter.SearchSuccessResponse> = await search({ page: page.current, toFind: param });
                setSearchResponse({ success: response.data, failure: null });
                if (response.data.videos.length < 20) {
                    endPage.current = true;
                }
            }
            catch (e) {
                setSearchResponse({ success: null, failure: { error: e as Error } });
            }
            setLoading(false);
        }());
    }, [param]);
    useEffect(() => {
        setVideos([]);
        setUsers([]);
        setCombines([]);
        setNumElements({ user: 0, video: 0 });
        endPage.current = false;
        page.current = 1;
    }, [param]);
    useEffect(() => {
        fetchFind();
        page.current += 1;
    }, [fetchFind, param]);
    useEffect(() => {
        setVideos((prevState: Video[]) => {
            if (searchResponse.success) {
                return [...(searchResponse.success.videos)];
            }
            return prevState;
        });
        setUsers((prevState: User[]) => {
            if (searchResponse.success) {
                return [...(searchResponse.success.users)];
            }
            return prevState;
        });
        if (searchResponse.success) {
            setNumElements(({ user: numElements.user + searchResponse.success.users.length, video: numElements.video + searchResponse.success.videos.length }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResponse.success]);
    useEffect(() => {
        setCombines((prevState: Combine[]) => {
            const myVideos: myVideo[] = videos.map((video: Video) => (
                { video, type: 'Video' }
            ));
            const myUsers: myUser[] = users.map((user: User) => (
                { user, type: 'User' }
            ));
            return [...prevState, ...myVideos, ...myUsers];
        });
    }, [videos, users]);
    const f: () => void = useCallback(() => {
        if (!endPage.current) {
            fetchFind();
            page.current += 1;
        }
    }, [fetchFind]);
    useEffect(() => {
        if (!videos && !users) return () => {};
        const onIntersect: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            // eslint-disable-next-line @typescript-eslint/typedef
            const [{ isIntersecting }]: IntersectionObserverEntry[] = entries;
            if (!videos && !users) return; // 비디오가 없다면, 한번도 비디오를 불러오지 않은 것이므로, end와 start가 붙어있음
            if (!isIntersecting) return; // 아직 intersect하지 않았다면 불러올 필요가 없음.
            if (loading) return; // 비디오가 로딩중이라면, 다른 비디오를 불러와서는 안된다.
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
        if (endPage.current) observer.unobserve(target); // 더 이상 불러올 비디오가 없다면 unobserve.
        if (searchResponse.failure) observer.unobserve(target); // 더 이상 불러올 비디오가 없다면 unobserve.
        return () => {
            observer.unobserve(target); // cleanup할 때 unobserve
        };
    }, [f, videos, targetRef, loading, searchResponse.failure, users]);
    const onKeyPressSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            history.push(`/search?q=${searchInput}`);
        }
    }, [history, searchInput]);
    const onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    return (
        <div className="find">
            <div className="find__background">
                Search
            </div>
            <div className="find__body">
                <div className="find__body__icon">
                    <img className="navbar__utility__findIcon" src="/icons/search-icon.png" alt="" />
                </div>
                <input
                    className="find__body__input"
                    value={searchInput}
                    onChange={onSearchChange}
                    onKeyPress={onKeyPressSearch}
                />
            </div>
            <div className="find__result">
                <div className="find__result__query">
                    {`'${param}'`}
                </div>
                <div className="find__result__text">
                    {`${numElements.video} 개의 동영상과 ${numElements.user}명의 유저가 검색되었습니다.`}
                    <br />
                    스크롤을 내리면 좀 더 많은 동영상들을 찾아볼 수 있습니다.
                </div>
            </div>
            <div className="find__videoGrid">

                {/* {
                    videos.map((video: Video, idx: number) => (
                        <div key={video.id}>
                            <VideoContainer videoInfo={video} />
                            <VideoDescription1 videoInfo={video} />
                        </div>
                    ))
                }
                {
                    users.map((user: User, idx: number) => (
                        <div key={user.userId}>
                            <UserContainer userInfo={user} />
                            <UserDescription userInfo={user} />
                        </div>
                    ))
                }
                 */}
                {
                    combines.map((combine: Combine, idx: number) => {
                        if (isVideo(combine)) {
                            return (
                                <div key={combine.video.id}>
                                    <VideoContainer videoInfo={combine.video} />
                                    <VideoDescription1 videoInfo={combine.video} />
                                </div>
                            );
                        }
                        return (
                            <div key={combine.user.userId}>
                                <UserContainer userInfo={combine.user} />
                                <UserDescription userInfo={combine.user} />
                            </div>
                        );
                    })
                }
                <div ref={targetRef} />
            </div>
        </div>
    );
};

export default withRouter(FindContainer);
