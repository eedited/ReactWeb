import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.scss';

interface Props {
    type: string
    form: RDXAuthModule.SignupForm | Login
    error: string | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
interface TextMapType {
    [type: string]: string
}

const textMap: TextMapType = {
    login: '로그인',
    signup: '회원가입',
};

const AuthForm: React.FC<Props> = ({
    type, form, onChange, onSubmit, error,
}: Props) => (
    <div className="authForm">
        <div className="authForm__img">
            <img src="images/loginImg.png" alt="loginImg" />
        </div>
        <div className="authForm__main">
            <form onSubmit={onSubmit} className="authForm__inputs">
                <div className="authForm__input">
                    <h2 className="authForm__input__title">ID</h2>
                    <input
                        className="authForm__input__field"
                        placeholder="아이디"
                        name="userId"
                        value={form.userId}
                        onChange={onChange}
                    />
                </div>
                <div className="authForm__input">
                    <h2 className="authForm__input__title">Password</h2>
                    <input
                        className="authForm__input__field"
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                    />
                </div>
                {
                    type === 'signup'
                        && (
                            <>
                                <div className="authForm__input">
                                    <h2 className="authForm__input__title">passwd confirm:</h2>
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
                                    <h2 className="authForm__input__title">email:</h2>
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
                        )
                }
                {error && <div className="authForm__input__error" style={{ color: 'red' }}>{error}</div>}
                <button type="submit">{textMap[type]}</button>
            </form>
            {
                type === 'login'
                    ? (<Link to="/signup">회원가입</Link>)
                    : (<Link to="/login">로그인</Link>)
            }
            <br />
            {type === 'login' && (
                <>
                    <Link to="findid"> 아이디 찾기</Link>
                    <Link to="findpw"> 비밀번호 찾기</Link>
                </>
            )}
        </div>
    </div>
);

export default AuthForm;
