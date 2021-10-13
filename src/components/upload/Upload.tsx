import React, { forwardRef } from 'react';
import ReactPlayer from 'react-player';
import BlueButton from '../common/button/BlueButton';
import { inputType } from '../../hooks/useInputs';
import './Upload.scss';
import WhiteButton from '../common/button/WhiteButton';
import UploadDropDown from '../../containers/upload/UploadDropDown';

export interface TagType {
    id: number,
    tag: string
}
export interface DropDownProp {
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string|null
}
interface Props {
    type: 'upload' | 'change';
    uploadSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDescriptionChange: React.Dispatch<React.SetStateAction<string>>
    inputState: inputType
    error: string | null
    tagError: string | null
    description: string
    onKeyPressTag: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onBlurTag: React.FocusEventHandler<HTMLInputElement>
    onTagRemove: (id: number) => void
    tags: TagType[]
    onVideoDeleteClick?: () => void
}

const Upload: React.ForwardRefExoticComponent<Props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, Props>(({
    type, uploadSubmit, onInputChange, inputState, error, description, onDescriptionChange, onKeyPressTag, tags, onTagRemove, onBlurTag, tagError, onVideoDeleteClick,
}: Props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    // const [tags, onTagsChange]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);
    <div className="upload">
        <div className="upload__haeder">
            <div className="upload__header__title">{type === 'change' ? '수정' : '업로드'}</div>
            <img alt="upload__haeder__img" src="/images/heros/uploadImg.png" className="upload__haeder__img" />
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
                            value={inputState.videoLink}
                            placeholder="youtube 링크를 입력하세요"
                        />
                    </div>
                    <div className="upload__info__item">
                        <div className="upload__info__title">카테고리</div>
                        <UploadDropDown />
                    </div>
                    <div className="upload__info__item">
                        <div className="upload__info__title">태그</div>
                        <div className="upload__info__tag">
                            {tags.map((tag: TagType) => (
                                <div className="upload__info__tag__element" key={tag.id}>
                                    {tag.tag}
                                    <button
                                        type="button"
                                        key={tag.id}
                                        onClick={() => {
                                            onTagRemove(tag.id);
                                        }}
                                    >
                                        <img
                                            className="upload__info__tag__element__delete"
                                            src="/icons/remove-icon.png"
                                            alt={tag.tag}
                                        />
                                    </button>
                                </div>
                            ))}
                            <input
                                className="upload__info__tag__input"
                                onChange={onInputChange}
                                name="currentTag"
                                value={inputState.currentTag}
                                onKeyPress={onKeyPressTag}
                                onBlur={onBlurTag}
                            />
                        </div>
                    </div>
                    <div className="upload__tag__error">{tagError}</div>
                    <div className="upload__info__item">
                        <div className="upload__info__title">설명</div>
                        <textarea
                            className="upload__info__description__input"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                onDescriptionChange(e.target.value);
                            }}
                            value={description}
                        />
                    </div>
                    <div className="upload__buttons">
                        <BlueButton type="submit" onClick={() => uploadSubmit} className="upload__submit">{type === 'change' ? '수정하기' : 'Upload'}</BlueButton>
                        {type === 'change' && (
                            <WhiteButton
                                onClick={() => {
                                    if (onVideoDeleteClick) {
                                        onVideoDeleteClick();
                                    }
                                }}
                                className="upload__submit"
                            >
                                삭제하기
                            </WhiteButton>
                        )}
                    </div>
                    {error && <div className="upload__info__error">{error}</div>}
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
                                <img className="upload__preview__img" src="/images/buttons/play-button.png" alt="play-button" />
                            </div>
                            <div className="upload__preview__img__title">이곳에 미리보기가 표시됩니다.</div>
                        </>
                    )}
            </div>
        </div>
    </div>
));
Upload.defaultProps = {
    onVideoDeleteClick: () => {},
};
export default React.memo(Upload);
