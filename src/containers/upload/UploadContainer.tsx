import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';
import useInputs, { inputType } from '../../library/hooks/useInputs';
import Upload, { tagType } from '../../components/upload/Upload';

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
        thumbnailLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [tags, onTagsChange]: [tagType[], React.Dispatch<React.SetStateAction<tagType[]>>] = useState([] as tagType[]);
    const tagId: React.MutableRefObject<number> = useRef(0);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const uploadSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([inputState.title, inputState.videoLink, inputState.thumbnailLink, description].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (!ReactPlayer.canPlay(inputState.videoLink)) {
            setError('올바르지 못한 video Url 입니다');
            return;
        }
        dispatch(
            videoAction.videoUpload(
                {
                    title: inputState.title,
                    discription: description,
                    url: inputState.videoLink,
                    thumbnail: inputState.thumbnailLink,
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
