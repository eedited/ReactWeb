import React from 'react';
import BlueButton from '../common/button/BlueButton';
import Spinner from '../common/spinner/Spinner';
import './FindingId.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FindIdSuccessType {}
export interface FindIdFailureType {
    info: number
    error: Error
}
export type FindIdResponseType = FindIdFailureType | FindIdSuccessType
export type LoadingState = string
interface Props {
    email: string;
    isSubmit: boolean;
    loading: string;
    validationString: string;
    findIdResponse: FindIdResponseType
    onEmailSubmit: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindingId: React.FC<Props> = ({ onInputChange, email, onEmailSubmit, isSubmit, loading, validationString, findIdResponse }: Props) => (
    <div>
        <Spinner loading={loading === 'start'} />
        <form className="findingId">
            <h2>ID를 잊어버리셨나요?</h2>
            <p>가입할 때 입력했던 이메일을 정확히 입력해주세요.</p>
            <p>이메일로 아이디를 보내드립니다.</p>
            <input name="email" onChange={onInputChange} value={email} placeholder="이메일을 정확히 입력해주세요" />
            <BlueButton type="button" onClick={onEmailSubmit}>아이디 찾기</BlueButton>
            {
                (isSubmit && loading === 'success')
                && <p>id가 email로 전달되었습니다.</p>
            }
            {
                (isSubmit && loading === 'failure')
                && (
                    <>
                        <p>{(findIdResponse as FindIdFailureType).info === 401 && '이메일을 확인해주세요'}</p>
                        <p>{(findIdResponse as FindIdFailureType).info === 403 && '로그인한 유저는 이용할 수 없는 서비스입니다. 로그아웃을 해주세요.'}</p>
                        <p>{(findIdResponse as FindIdFailureType).info === 500 && '서버에 에러가 있습니다.'}</p>
                    </>
                )
            }
        </form>
    </div>
);

export default FindingId;
