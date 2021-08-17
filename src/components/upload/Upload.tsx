import React, { forwardRef, useRef } from 'react';
import ReactPlayer from 'react-player';
import BlueButton from '../../components/common/Button/BlueButton';
import VideoContainer from '../../containers/landing/VideoContainer';
import { inputType } from '../../library/hooks/useInputs';
import './Upload.scss';

interface props{
    uploadSubmit: (e: React.FormEvent<HTMLFormElement>)=> void
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
    onDescriptionChange: React.Dispatch<React.SetStateAction<string>>
    inputState: inputType
    error: string|null
    description: string
}
const Upload: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    uploadSubmit, onInputChange, inputState, error, description, onDescriptionChange,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    // const [tags, onTagsChange]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);
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
                            placeholder="제목"
                        />
                    </div>
                    <div className="upload__info__item">
                        <div className="upload__info__title">비디오 링크</div>
                        <input
                            className="upload__info__title__input"
                            onChange={onInputChange}
                            name="videoLink"
                            value={inputState.value}
                            placeholder="youtube 또는 Viemo링크를 입력하세요"
                        />
                    </div>
                    <div className="upload__info__item">
                        <div className="upload__info__title">썸네일 링크</div>
                        <input
                            className="upload__info__title__input"
                            onChange={onInputChange}
                            name="thumbnailLink"
                            value={inputState.value}
                            placeholder="https://img.youtube.com/vi/{videoId}/0.jpg"
                        />
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
                        <textarea
                            className="upload__info__description__input"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                onDescriptionChange(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={description}
                        />
                    </div>
                    <BlueButton type="submit" onClick={() => uploadSubmit} className="upload__submit">업로드하기</BlueButton>
                    {error && <div>{error}</div>}
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
));

export default (Upload);
