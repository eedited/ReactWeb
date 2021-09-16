import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.scss';

interface props{
    type: string
    form: authModule.SIGNUPFORM | LOGIN
    error: string|null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
interface textMapType{
    [type: string]: string
}
const textMap: textMapType = {
    login: '로그인',
    signup: '회원가입',
};
const AuthForm: React.FC<props> = ({
    type, form, onChange, onSubmit, error,
}: props) => (
    <div className="authForm">
        <div className="authForm__img">
            <img src="images/loginImg.png" alt="loginImg" />
        </div>
        <div className="authForm__main">
            <div className="authForm__main__title">{textMap[type]}</div>
            <form onSubmit={onSubmit} className="authForm__inputs">
                <div className="authForm__input">
                    <h2 className="authForm__input__title">아이디</h2>
                    <input
                        className="authForm__input__field"
                        placeholder="아이디"
                        name="userId"
                        value={form.userId}
                        onChange={onChange}
                    />
                </div>
                <div className="authForm__input">
                    <h2 className="authForm__input__title">비밀번호</h2>
                    <input
                        className="authForm__input__field"
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                    />
                </div>
                {type === 'signup' && (
                    <>
                        <div className="authForm__input">
                            <h2 className="authForm__input__title">비밀번호 확인</h2>
                            <input
                                className="authForm__input__field"
                                type="password"
                                placeholder="비밀번호 확인"
                                name="passwordConfirm"
                                value={form.passwordConfirm}
                                onChange={onChange}
                            />
                        </div>
                        <div className="authForm__input">
                            <h2 className="authForm__input__title">이메일</h2>
                            <input
                                className="authForm__input__field"
                                type="email"
                                placeholder="이메일"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="authForm__input">
                            <h2 className="authForm__input__title">닉네임</h2>
                            <input
                                className="authForm__input__field"
                                type="nickname"
                                placeholder="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={onChange}
                            />
                        </div>
                    </>
                )}
                {error && <div className="authForm__input__error" style={{ color: 'red' }}>{error}</div>}
                <button className="authForm__input__button" type="submit">{textMap[type]}</button>
                {type === 'signup' && (
                    <div className="authForm__agreement">
                        가입 시, eedited의
                        {' '}
                        <Link to="/" style={{ color: '#4B89DC' }}>이용약관</Link>
                        ,
                        {' '}
                        <Link to="/" style={{ color: '#4B89DC' }}>개인정보 취급방침</Link>
                        에 동의합니다.
                    </div>
                )}
            </form>
            <br />
            {type === 'login'
        && (
            <>
                <Link to="findid"> 아이디 찾기</Link>
                <Link to="findpw"> 비밀번호 찾기</Link>
            </>
        )}
        </div>
    </div>
);

export default AuthForm;
