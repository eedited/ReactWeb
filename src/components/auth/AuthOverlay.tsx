/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactGoogleLogin, { GoogleLogin } from 'react-google-login';
import Spinner from '../common/spinner/Spinner';
import './AuthOverlay.scss';

interface Props {
    type: 'login' | 'signup'
    backgroundClicked: () => void
    form: RDXAuthModule.SignupForm | Login
    error: string | null
    loading: boolean
    title?: (type: string) => string
    setType: (type: 'login'|'signup') => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    responseGoogle?: (res: ReactGoogleLogin.GoogleLoginResponse | ReactGoogleLogin.GoogleLoginResponseOffline) => Promise<void>
    responseGoogleFail?: () => void
}
interface textMapType {
    [type: string]: string
}
const textMap: textMapType = {
    login: '로그인',
    signup: '회원가입',
};
// const googleLogin: () => void = () => {
//     window.open(process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_PROD_API_URL}/auth/google` : `${process.env.REACT_APP_DEV_API_URL}/auth/google`);
//     window.location.href = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_PROD_API_URL}/auth/google` : `${process.env.REACT_APP_DEV_API_URL}/auth/google`;
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const AuthOverlay: React.FC<Props> = ({ backgroundClicked, type, form, error, onChange, onSubmit, title, setType, loading, responseGoogle, responseGoogleFail }: Props) => (
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
        <Spinner loading={loading} />
        <div
            className="AuthOverlay"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            onKeyDown={() => { /**/ }}
            role="banner"
        >
            <button className="AuthOverlay__close" onClick={backgroundClicked} type="button">
                <img src="/icons/remove-icon.png" alt="" />
            </button>
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
                    <img className="AuthOverlay__header__hero__img" alt="" src="/images/heros/loginImg.png" />
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
                        <>
                            <div
                                className="authForm__toSignup"
                                onClick={() => setType('signup')}
                                onKeyDown={() => {
                                    /**/
                                }}
                                role="directory"
                            >
                                아직 회원이 아니신가요?
                            </div>
                            <div className="authform__hrLine">
                                <div className="authForm__hrLine__title">SNS LOGIN</div>
                            </div>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleFail}
                                cookiePolicy="single_host_origin"
                            />
                        </>
                    )}
                    {type === 'signup' && (
                        <div className="authForm__agreement">
                            가입 시, eedited의
                            {' '}
                            <Link to="/servicePolicy" style={{ color: '#4B89DC' }}>이용약관</Link>
                            ,
                            {' '}
                            <Link to="/PrivateInformationPolicy" style={{ color: '#4B89DC' }}>개인정보 취급방침</Link>
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
    responseGoogle: async (res: ReactGoogleLogin.GoogleLoginResponse | ReactGoogleLogin.GoogleLoginResponseOffline) => {},
    responseGoogleFail: () => {},
};
export default AuthOverlay;
