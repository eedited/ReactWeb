import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { AnyAction } from 'redux';
import BlueButton from '../../components/common/Button/BlueButton';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../modules/Video/video';
import useInputs, { inputType } from '../../lib/hooks/useInputs';
import './Upload.scss';
import { videoUploadFailureType } from '../../modules/Video/videoType';

interface fromReducerType{
    uploadError: videoUploadFailureType|null
}

const UploadContainer: React.FC = () => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        uploadError,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        uploadError: state.videoReducer.videoUploadError,
    }));
    const [inputState, onInputChange]: [inputType, (e: React.ChangeEvent<HTMLInputElement>)=> void] = useInputs({
        title: '',
        videoLink: '',
        thumbnailLink: '',
        currentTag: '',
        description: '',
    });
    const [tags, onTagsChange]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const uploadSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            videoAction.videoUpload(
                {
                    title: inputState.title,
                    discription: inputState.description,
                    url: inputState.videoLink,
                    thumbnail: inputState.thumbnailLink,
                },
            ),
        );
    };

    return (
        <div className="upload">
            <div className="upload__haeder">
                <div className="upload__header__title">업로드</div>
                <img alt="upload__haeder__img" src="/upload_temp.png" className="upload__haeder__img" />
            </div>
            <div className="upload__body">
                <form onSubmit={uploadSubmit} className="upload__form">
                    <div className="upload__info">
                        <div className="upload__info__item">
                            <div className="upload__info__title">제목</div>
                            <input
                                className="upload__info__title__input"
                                onChange={onInputChange}
                                name="title"
                                value={inputState.title}
                            />
                        </div>
                        <div className="upload__info__item">
                            <div className="upload__info__title">비디오 링크</div>
                            <input className="upload__info__title__input" onChange={onInputChange} name="videoLink" value={inputState.value} />
                        </div>
                        <div className="upload__info__item">
                            <div className="upload__info__title">썸네일 링크</div>
                            <input className="upload__info__title__input" onChange={onInputChange} name="thumbnailLink" value={inputState.value} />
                        </div>
                        {/*
                    <div className="upload__info__item">
                        <div className="upload__info__title">태그</div>
                        <input className="upload__info__title__input" onChange={onInputChange} name="currentTag" value={inputState.currentTag} />
                    </div>
                    */
                        }
                        <div className="upload__info__item">
                            <div className="upload__info__title">설명</div>
                            <input className="upload__info__description__input" name="description" onChange={onInputChange} value={inputState.description} />
                        </div>
                        <BlueButton type="submit" onClick={() => uploadSubmit} className="upload__submit">업로드하기</BlueButton>
                        {uploadError && <div>{uploadError.info}</div>}
                    </div>
                </form>
                <div className="upload__preview">
                    {ReactPlayer.canPlay(inputState.videoLink)
                        ? (
                            <>
                                <div className="upload__preview__wrapper">
                                    <ReactPlayer
                                        ref={youtubeRef}
                                        className="upload__preview__video"
                                        width="100%"
                                        height="100%"
                                        url={inputState.videoLink}
                                    />
                                </div>
                                <div className="upload__preview__title">
                                    {inputState.title}
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className="upload__preview__img__wrapper">
                                    <img className="upload__preview__img" src="/play-button.png" alt="play-button" />
                                </div>
                                <div className="upload__preview__img__title">이곳에 미리보기가 표시됩니다.</div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default UploadContainer;
