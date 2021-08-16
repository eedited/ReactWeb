import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../modules/Video/video';
import useInputs, { inputType } from '../../lib/hooks/useInputs';
import { videoUploadFailureType, videoUploadSuccessType } from '../../modules/Video/videoType';
import Upload from '../../components/upload/Upload';

interface fromReducerType{
    uploadError: videoUploadFailureType|null
    uploadSuccess: videoUploadSuccessType|null
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
    const [inputState, onInputChange]: [inputType, (e: React.ChangeEvent<HTMLInputElement>)=> void] = useInputs({
        title: '',
        videoLink: '',
        thumbnailLink: '',
        currentTag: '',
    });
    const [description, onDescriptionChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    // const [tags, onTagsChange]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [error, setError]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const uploadSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
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
                },
            ),
        );
    };
    useEffect(() => {
        if (uploadError) {
            setError(`회원가입 실패 ${uploadError.info}`);
        }
        if (uploadSuccess) {
            history.push('/');
        }
    }, [history, uploadError, uploadSuccess]);
    return (
        <Upload
            uploadSubmit={uploadSubmit}
            onInputChange={onInputChange}
            onDescriptionChange={onDescriptionChange}
            inputState={inputState}
            error={error}
            description={description}
            ref={youtubeRef}
        />
    );
};

export default withRouter(UploadContainer);
