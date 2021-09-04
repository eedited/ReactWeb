import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import QueryString, { parse } from 'qs';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';
import useInputs, { inputType } from '../../library/hooks/useInputs';
import Upload, { tagType } from '../../components/upload/Upload';

const validPathname: RegExp = /^.*\/([a-zA-Z0-9_-]{11})$/;
const validId: RegExp = /^([a-zA-Z0-9_-]{11})$/;
interface fromReducerType{
    uploadError: videoModule.videoUploadFailureResponse|null
    uploadSuccess: videoRouter.videoUploadSuccessResponse|null
}
interface props{
    history: RouteComponentProps['history']
}

const UploadContainer: React.FC<props> = ({ history }: props) => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        uploadError,
        uploadSuccess,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        uploadError: state.videoReducer.videoUploadError,
        uploadSuccess: state.videoReducer.videoUploadSuccess,
    }));
    const [inputState, onInputChange, onInputClear]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string) => void] = useInputs({
        title: '',
        videoLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [tags, onTagsChange]: [tagType[], React.Dispatch<React.SetStateAction<tagType[]>>] = useState([] as tagType[]);
    const tagId: React.MutableRefObject<number> = useRef(0);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
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
        const thumbnailUrl: string = `https://img.youtube.com/vi/${id}/0.jpg`;
        dispatch(
            videoAction.videoUpload(
                {
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
            if (inputState.currentTag !== '') {
                const tag: string = inputState.currentTag;
                const nextTag: tagType = {
                    id: tagId.current,
                    tag,
                };
                onTagsChange(() => tags.concat(nextTag));
                tagId.current += 1;
                onInputClear('currentTag');
            }
        }
    }, [inputState.currentTag, onInputClear, tags]);
    const onTagRemove: (id: number) => void = useCallback((id: number) => {
        onTagsChange(tags.filter((tag: tagType) => tag.id !== id));
    }, [tags]);
    return (
        <Upload
            uploadSubmit={uploadSubmit}
            onInputChange={onInputChange}
            onDescriptionChange={onDescriptionChange}
            inputState={inputState}
            error={error}
            description={description}
            ref={youtubeRef}
            onKeyPressTag={onKeyPressTag}
            onTagRemove={onTagRemove}
            tags={tags}

        />
    );
};

export default withRouter(UploadContainer);
