import React from 'react';
import { findPwResponseType } from '../../containers/auth/FindingPwContainer';

interface props{
    email: string
    id: string
    isSubmit: boolean
    loading: 'start'|'success'|'failure'
    validationString: string
    findPwResponse: findPwResponseType
    onEmailSubmit: ()=> void
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}

const FindingPw: React.FC<props> = ({
    onInputChange, id, email, onEmailSubmit, isSubmit, loading, validationString, findPwResponse,
}: props) => (
    <div>
        <form>
            <h2>
                PW 찾기
            </h2>
            <h2>
                가입할 때 입력했던 e-mail을 입력하세요
            </h2>
            <input name="email" onChange={onInputChange} value={email} />
            <h2>
                id를 입력하세요
            </h2>
            <input name="id" onChange={onInputChange} value={id} />
            <button
                type="button"
                onClick={onEmailSubmit}
            >
                제출
            </button>
            {(isSubmit && loading === 'success')
                ? (
                    <div>
                        새로운 비밀번호가 발송되었습니다.
                    </div>

                )
                : (
                    <div>
                        비밀번호 발송에 실패하였습니다.
                    </div>

                ) }
        </form>
    </div>
);

export default FindingPw;
