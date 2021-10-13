import React from 'react';
import BlueButton from '../common/button/BlueButton';
import Spinner from '../common/spinner/Spinner';
import './FindingPw.scss';

interface FindPwSuccessType {
    password: string,
}
interface FindPwFailureType {
    info: number
    error: Error
}
export type FindPwResponseType = FindPwFailureType | FindPwSuccessType

interface props {
    email: string
    id: string
    isSubmit: boolean
    loading: 'start'|'success'|'failure'
    validationString: string
    findPwResponse: FindPwResponseType
    onEmailSubmit: () => void
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FindingPw: React.FC<props> = ({
    onInputChange, id, email, onEmailSubmit, isSubmit, loading, validationString, findPwResponse,
}: props) => (
    <div>
        <Spinner loading={loading === 'start'} />
        <form className="findingPw">
            <h2>
                비밀번호를 잊어버리셨나요?
            </h2>
            <div className="findingPw__text">
                <p>가입할 때 입력했던 아이디와 이메일을 정확히 입력해주세요.</p>
                <p>이메일로 임시 비밀번호를 보내드립니다.</p>
            </div>
            <h3>
                e-mail
            </h3>
            <input name="email" onChange={onInputChange} value={email} placeholder="이메일을 정확히 입력해주세요" />
            <h3>
                ID
            </h3>
            <input name="id" onChange={onInputChange} value={id} placeholder="아이디를 정확히 입력해주세요" />
            <BlueButton type="button" onClick={onEmailSubmit}>비밀번호 찾기</BlueButton>
            {
                (isSubmit && loading === 'success')
                && (<p>새로운 비밀번호가 발송되었습니다. 설정에서 비밀번호를 변경해주세요!</p>)
            }
            {(isSubmit && loading === 'failure')
            && (
                <p>
                    {(findPwResponse as FindPwFailureType).info === 401 && '아이디와 이메일을 확인해주세요!'}
                    { (findPwResponse as FindPwFailureType).info === 403 && '로그인된 유저는 이용할 수 없는 서비스입니다. 로그아웃 해주세요!'}
                    { (findPwResponse as FindPwFailureType).info === 500 && '서버에 에러가 있습니다.'}
                </p>
            )}
        </form>
    </div>
);

export default FindingPw;
