import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import QueryString, { parse } from 'qs';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';
import useInputs, { inputType } from '../../library/hooks/useInputs';
import Upload, { tagType } from '../../components/upload/Upload';

const validPathname: RegExp = /^.*\/([a-zA-Z0-9_-]{11})$/;
const validId: RegExp = /^([a-zA-Z0-9_-]{11})$/;
interface fromReducerType{
    modifyError: videoModule.videoModifyFailureResponse|null
    modifySuccess: videoRouter.videoModifySuccessResponse|null
    Video: videoRouter.videoSuccessResponse | null
}
interface props extends RouteComponentProps{
    videoId: string
    user: USER|null
}

const VideoChangeContainer: React.FC<props> = ({ history, videoId, user }: props) => {
    const { video, videoClear }: videoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        modifyError,
        modifySuccess,
        Video,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        modifyError: state.videoReducer.videoModifyError,
        modifySuccess: state.videoReducer.videoModifySuccess,
        Video: state.videoReducer.video,
    }));
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        title: '',
        videoLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [tags, onTagsChange]: [tagType[], React.Dispatch<React.SetStateAction<tagType[]>>] = useState([] as tagType[]);
    const tagId: React.MutableRefObject<number> = useRef(0);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const [tagError, seTagError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    useEffect(() => {
        dispatch(videoClear());
    }, [dispatch, videoClear]);
    useEffect(() => {
        dispatch(video({ videoId }));
    }, [dispatch, video, videoId]);
    useEffect(() => {
        if (user && Video && user.userId !== Video.uploader) {
            history.push('/404NotFound');
        }
    });
    useEffect(() => {
        if (Video) {
            onDescriptionChange((prevState: string) => (Video.discription));
            onTagsChange((prevState: tagType[]) => (Video.WhatVideoUploadTag.map((tag: {tagName: string}, idx: number) => ({ id: idx, tag: tag.tagName }))));
            setInput('title', Video.title);
            setInput('videoLink', Video.url);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Video]);

    const uploadSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([inputState.title, inputState.videoLink, description].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (tags.length === 0) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (!ReactPlayer.canPlay(inputState.videoLink)) {
            setError('올바르지 못한 video Url 입니다');
            return;
        }
        /* 썸네일 url 파싱  https://github.com/iktakahiro/youtube-url-parser/blob/master/src/parser.ts */
        const parser: HTMLAnchorElement = document.createElement('a');
        parser.href = inputState.videoLink;
        const query: QueryString.ParsedQs = parse(parser.search, { ignoreQueryPrefix: true });
        let id: string|null = (validPathname.exec(parser.pathname) || [])[1] || null;
        if (id === null) {
            const { v }: QueryString.ParsedQs = query;
            id = (validId.exec(v as string) || [])[1] || null;
        }
        if (id === null) {
            setError('올바르지 못한 video Url 입니다');
            return;
        }
        const thumbnailUrl: string = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
        dispatch(
            videoAction.videoModify(
                {
                    id: videoId,
                    title: inputState.title,
                    discription: description,
                    url: inputState.videoLink,
                    thumbnail: thumbnailUrl,
                    tags: tags.map((tag: tagType) => tag.tag),
                },
            ),
        );
    };
    useEffect(() => {
        if (modifyError) {
            setError(`업로드 실패 ${modifyError.info}`);
        }
        if (modifySuccess) {
            history.push('/');
        }
    }, [history, modifyError, modifySuccess]);

    const onKeyPressTag: (e: React.KeyboardEvent<HTMLInputElement>) => void = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!inputState.currentTag || inputState.currentTag === '') {
                seTagError('최소한 한글자 이상 입력해주세요.');
                return;
            }
            if (tags.some((item: tagType) => item.tag === inputState.currentTag)) {
                seTagError('중복되는 태그가 있습니다.');
                return;
            }
            if (inputState.currentTag.length > 8) {
                seTagError('8글자 이내로 입력해 주세요!');
                return;
            }
            const tag: string = inputState.currentTag;
            const nextTag: tagType = {
                id: tagId.current,
                tag,
            };
            onTagsChange(() => tags.concat(nextTag));
            tagId.current += 1;
            setInput('currentTag', '');
        }
    }, [inputState.currentTag, setInput, tags]);
    const onTagRemove: (id: number) => void = useCallback((id: number) => {
        onTagsChange(tags.filter((tag: tagType) => tag.id !== id));
    }, [tags]);
    const onBlurTag: React.FocusEventHandler<HTMLInputElement> = useCallback(() => {
        if (inputState.currentTag.length > 8) {
            seTagError('8글자 이내로 입력해 주세요!');
            setInput('currentTag', '');
            return;
        }
        if (inputState.currentTag !== '' && !tags.some((item: tagType) => item.tag === inputState.currentTag)) {
            const tag: string = inputState.currentTag;
            const nextTag: tagType = {
                id: tagId.current,
                tag,
            };
            onTagsChange(() => tags.concat(nextTag));
            tagId.current += 1;
        }
        setInput('currentTag', '');
    }, [inputState.currentTag, setInput, tags]);
    const onInputChangeWithClearError: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('들어는 오냐?');
        onInputChange(e);
        seTagError('');
        setError('');
    };
    return (
        <Upload
            type="change"
            uploadSubmit={uploadSubmit}
            onInputChange={onInputChangeWithClearError}
            onDescriptionChange={onDescriptionChange}
            inputState={inputState}
            error={error}
            description={description}
            ref={youtubeRef}
            onKeyPressTag={onKeyPressTag}
            onTagRemove={onTagRemove}
            tags={tags}
            onBlurTag={onBlurTag}
            tagError={tagError}
        />
    );
};

export default withRouter(VideoChangeContainer);
