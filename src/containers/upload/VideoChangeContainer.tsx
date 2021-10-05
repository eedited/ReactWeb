import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import QueryString, { parse } from 'qs';
import { AxiosResponse } from 'axios';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/video';
import useInputs, { inputType } from '../../hooks/useInputs';
import Upload, { TagType } from '../../components/upload/Upload';
import { rgxId, rgxPath } from '../../services/regex';
import { thumbnailURL } from '../../services/youtube';
import { videoDelete } from '../../api/video';
import { filterAction } from '../../redux/filter/filter';

interface FromReducerType {
    modifyError: RDXVideoModule.VideoModifyFailureResponse | null
    modifySuccess: VideoRouter.VideoModifySuccessResponse | null
    Video: VideoRouter.VideoSuccessResponse | null
    uploadDDState: DropDownProp[]
}
interface Props extends RouteComponentProps {
    videoId: string
    user: User | null
}
interface VideoDeleteResponse {
    success: VideoRouter.VideoDeleteSuccessResponse | null
    failure: VideoRouter.VideoDeleteFailureResponse | null
}
const VideoChangeContainer: React.FC<Props> = ({ history, videoId, user }: Props) => {
    const { video, videoClear }: RDXVideoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        modifyError,
        modifySuccess,
        Video,
        uploadDDState,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        modifyError: state.videoReducer.videoModifyError,
        modifySuccess: state.videoReducer.videoModifySuccess,
        Video: state.videoReducer.video,
        uploadDDState: state.filterReducer.upload,
    }));
    const [videoDeleteResponse, setVideoDeleteResponse]: [VideoDeleteResponse, React.Dispatch<React.SetStateAction<VideoDeleteResponse>>] = useState<VideoDeleteResponse>({ success: null, failure: null });
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        title: '',
        videoLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [tags, onTagsChange]: [TagType[], React.Dispatch<React.SetStateAction<TagType[]>>] = useState([] as TagType[]);
    const tagId: React.MutableRefObject<number> = useRef(0);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(null);
    const [tagError, seTagError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(null);

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
            onDescriptionChange((prevState: string) => (Video.description));
            onTagsChange((prevState: TagType[]) => (Video.WhatVideoUploadTag.map((tag: { tagName: string }, idx: number) => ({ id: idx, tag: tag.tagName }))));
            setInput('title', Video.title);
            setInput('videoLink', Video.url);
            dispatch(filterAction.setUpload({ set: Video.category }));
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
        let id: string | null = (rgxPath.exec(parser.pathname) || [])[1] || null;
        if (id === null) {
            const { v }: QueryString.ParsedQs = query;
            id = (rgxId.exec(v as string) || [])[1] || null;
        }
        if (id === null) {
            setError('올바르지 못한 video Url 입니다');
            return;
        }
        const currentCategory: DropDownProp|undefined = uploadDDState.find((cur: DropDownProp) => cur.selected === true);
        if (currentCategory) {
            dispatch(
                videoAction.videoModify(
                    {
                        id: videoId,
                        title: inputState.title,
                        description,
                        url: inputState.videoLink,
                        thumbnail: thumbnailURL(id),
                        tags: tags.map((tag: TagType) => tag.tag),
                        category: currentCategory.set,
                    },
                ),
            );
        }
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
            if (tags.some((item: TagType) => item.tag === inputState.currentTag)) {
                seTagError('중복되는 태그가 있습니다.');
                return;
            }
            if (inputState.currentTag.length > 8) {
                seTagError('8글자 이내로 입력해 주세요!');
                return;
            }

            const tag: string = inputState.currentTag;
            const nextTag: TagType = {
                id: tagId.current,
                tag,
            };

            onTagsChange(() => tags.concat(nextTag));
            tagId.current += 1;
            setInput('currentTag', '');
        }
    }, [inputState.currentTag, setInput, tags]);

    const onTagRemove: (id: number) => void = useCallback((id: number) => {
        onTagsChange(tags.filter((tag: TagType) => tag.id !== id));
    }, [tags]);

    const onBlurTag: React.FocusEventHandler<HTMLInputElement> = useCallback(() => {
        if (inputState.currentTag.length > 8) {
            seTagError('8글자 이내로 입력해 주세요!');
            setInput('currentTag', '');
            return;
        }
        if (inputState.currentTag !== '' && !tags.some((item: TagType) => item.tag === inputState.currentTag)) {
            const tag: string = inputState.currentTag;
            const nextTag: TagType = {
                id: tagId.current,
                tag,
            };
            onTagsChange(() => tags.concat(nextTag));
            tagId.current += 1;
        }
        setInput('currentTag', '');
    }, [inputState.currentTag, setInput, tags]);

    const onInputChangeWithClearError: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e);
        seTagError('');
        setError('');
    };
    const onVideoDeleteClick: () => void = useCallback(() => {
        (async function f() {
            try {
                setVideoDeleteResponse({ success: null, failure: null });
                const response: AxiosResponse<VideoRouter.VideoDeleteSuccessResponse> = await videoDelete({ videoId });
                setVideoDeleteResponse({ success: response, failure: null });
                history.push('/');
            }
            catch (err) {
                setVideoDeleteResponse({ success: null, failure: { error: err as Error } });
            }
        }());
    }, [history, videoId]);
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
            onVideoDeleteClick={onVideoDeleteClick}
        />
    );
};

export default withRouter(VideoChangeContainer);
