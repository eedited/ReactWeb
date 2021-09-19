/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthOverlay.scss';

interface Props{
    type: 'login' | 'signup'
    backgroundClicked: () => void
    form: authModule.SIGNUPFORM | LOGIN
    error: string|null
    title?: (type: string) => string
    setType: () => void
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
const AuthOverlay: React.FC<Props> = ({ backgroundClicked, type, form, error, onChange, onSubmit, title, setType }: Props) => (
    <div
        className="AuthOverlayBox"
        onClick={backgroundClicked}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Escape') {
                backgroundClicked();
            }
        }}
        role="banner"
    >

        <div
            className="AuthOverlay"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            onKeyDown={() => { /**/ }}
            role="banner"
        >
            <div className="AuthOverlay__header">
                <div className="AuthOverlay__header__title">
                    {title && title(type)}
                </div>
                <div className="AuthOverlay__header__hero">
                    <div className="AuthOverlay__header__hero__description">
                        <div className="AuthOverlay__header__hero__title">
                            eedited
                        </div>
                        <div className="AuthOverlay__header__hero__body">
                            에디티드에서
                            <br />
                            능력자들의 포트폴리오를
                            <br />
                            {' '}
                            한눈에 살펴보고 소통하세요
                        </div>
                    </div>
                    <img className="AuthOverlay__header__hero__img" alt="" src="/images/loginImg.png" />
                </div>
            </div>
            <div className="authForm__main">
                <form onSubmit={onSubmit} className="authForm__inputs">
                    <div className="authForm__input">
                        <div className="authForm__input__title">
                            <h2 className="authForm__input__title__field">아이디</h2>
                            {type === 'login' && <Link to="/findId" className="authForm__input__title__find">아이디를 잊어버리셨나요?</Link>}
                        </div>
                        <input
                            className="authForm__input__field"
                            placeholder="아이디"
                            name="userId"
                            value={form.userId}
                            onChange={onChange}
                        />
                    </div>
                    <div className="authForm__input">
                        <div className="authForm__input__title">
                            <h2 className="authForm__input__title__field">비밀번호</h2>
                            {type === 'login' && <Link to="/findPW" className="authForm__input__title__find">비밀번호를 잊어버리셨나요?</Link>}
                        </div>
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
                    {type === 'login' && (
                        <div
                            className="authForm__toSignup"
                            onClick={setType}
                            onKeyDown={() => {
                                /**/
                            }}
                            role="directory"
                        >
                            이미 회원이신가요?
                        </div>
                    )}
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
            </div>
        </div>
    </div>
);
AuthOverlay.defaultProps = {
    title: (type: string) => type.toUpperCase(),
};
export default AuthOverlay;
