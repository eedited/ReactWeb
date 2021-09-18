import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import QueryString, { parse } from 'qs';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/video';
import useInputs, { inputType } from '../../hooks/useInputs';
import Upload, { TagType } from '../../components/upload/Upload';
import { rgxId, rgxPath } from '../../services/regex';
import { thumbnailURL } from '../../services/youtube';

interface FromReducerType {
    uploadError: RDXVideoModule.VideoUploadFailureResponse | null
    uploadSuccess: VideoRouter.VideoUploadSuccessResponse | null
}
interface Props {
    history: RouteComponentProps['history']
}

const UploadContainer: React.FC<Props> = ({ history }: Props) => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        uploadError,
        uploadSuccess,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        uploadError: state.videoReducer.videoUploadError,
        uploadSuccess: state.videoReducer.videoUploadSuccess,
    }));
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        title: '',
        videoLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [tags, onTagsChange]: [TagType[], React.Dispatch<React.SetStateAction<TagType[]>>] = useState([] as TagType[]);
    const tagId: React.MutableRefObject<number> = useRef(0);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const [tagError, seTagError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
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
        dispatch(
            videoAction.videoUpload(
                {
                    title: inputState.title,
                    discription: description,
                    url: inputState.videoLink,
                    thumbnail: thumbnailURL(id),
                    tags: tags.map((tag: TagType) => tag.tag),
                },
            ),
        );
    };

    useEffect(() => {
        if (uploadError) {
            setError(`업로드 실패 ${uploadError.info}`);
        }
        if (uploadSuccess) {
            history.push('/');
        }
    }, [history, uploadError, uploadSuccess]);

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

    return (
        <Upload
            type="upload"
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

export default withRouter(UploadContainer);
