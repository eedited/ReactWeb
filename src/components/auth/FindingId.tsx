import React from 'react';

interface props{
    email: string
    isSubmit: boolean
    loading: string
    validationString: string
    onEmailSubmit: ()=> void
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}

const FindingId: React.FC<props> = ({
    onInputChange, email, onEmailSubmit, isSubmit, loading, validationString,
}: props) => (
    <div>
        <form>
            <h2>
                ID 찾기
            </h2>
            <h2>
                가입할 때 입력했던 e-mail을 입력하세요
            </h2>
            <input name="email" onChange={onInputChange} value={email} />
            <button
                type="button"
                onClick={onEmailSubmit}
            >
                제출
            </button>
            {(isSubmit && loading === 'success')
                ? (
                    <div>
                        id가 email로 전달되었습니다.
                    </div>
                )
                : (
                    <div>
                        {loading}
                    </div>
                )}
        </form>
    </div>
);

export default FindingId;
