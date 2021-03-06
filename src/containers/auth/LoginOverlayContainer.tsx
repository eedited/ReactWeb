import React, { useEffect, useCallback, useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { googleLogin } from '../../api/auth';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';
import { userAction } from '../../redux/user/user';
import AuthOverlay from '../../components/auth/AuthOverlay';
import { LoadingStateType } from '../../redux/loading/loading';

interface fromReducerType{
    form: Login
    User: AuthRouter.CheckSuccessResponse|null
    Auth?: AuthRouter.AuthSuccessResponse|null
    AuthError?: RDXAuthModule.AuthFailureResponse|null
    loading: LoadingStateType
}
interface props extends RouteComponentProps{
    backgroundClicked: () => void
    title?: (type: string) => string
    setType: (type: 'login'|'signup') => void
}
interface GoogleLoginResponseInterface {
    success: AuthRouter.GoogleLoginSuccessResponse | null
    failure: AuthRouter.GoogleLoginFailureResponse | null
}
// eslint-disable-next-line @typescript-eslint/typedef
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const LoginOverlayContainer: React.FC<props> = ({ history, backgroundClicked, title, setType }: props) => {
    const { changeField, intializeForm, login }: RDXAuthModule.ActionType = authAction;
    const { check }: RDXUserModule.ActionType = userAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const [googleLoginResponse, setGoogleLoginResponse]: [GoogleLoginResponseInterface, React.Dispatch<React.SetStateAction<GoogleLoginResponseInterface>>] = useState<GoogleLoginResponseInterface>({ success: null, failure: null });
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, User, loading,
    }: fromReducerType = useAppSelector((state: SelectorStateType) => ({
        form: state.authReducer.login,
        User: state.userReducer.user,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
        loading: state.loadingReducer,
    }));

    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, password }: {userId: string, password: string} = form;
        dispatch(login({
            userId,
            password,
        }));
    };
    useEffect(() => () => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);
    useEffect(() => {
        if (AuthError) {
            if (AuthError.info) setError(AuthError.info);
            else setError(AuthError.error.message);
        }
        if (Auth) {
            dispatch(userAction.check());
        }
    }, [Auth, AuthError, dispatch]);
    useEffect(() => {
        if (googleLoginResponse.success) {
            dispatch(
                userAction.check(),
            );
        }
        if (googleLoginResponse.failure) {
            setError(googleLoginResponse.failure.info);
        }
    }, [dispatch, googleLoginResponse.failure, googleLoginResponse.success]);
    useEffect(() => {
        if (User) {
            try {
                localStorage.setItem('user', JSON.stringify(User));
                backgroundClicked();
            }
            catch (err) {
                console.log('local storage not working');
            }
        }
    }, [history, User, backgroundClicked]);
    const responseGoogle: (res: (GoogleLoginResponseOffline | GoogleLoginResponse)) => Promise<void> = useCallback(async (res: (GoogleLoginResponseOffline | GoogleLoginResponse)) => {
        setGoogleLoginResponse({ success: null, failure: null });
        try {
            if ('tokenId' in res) {
                const response: AxiosResponse<AuthRouter.GoogleLoginSuccessResponse> = await googleLogin({ tokenId: res.tokenId, googleId: res.googleId });
                setGoogleLoginResponse({ success: response, failure: null });
            }
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    setGoogleLoginResponse({ success: null, failure: e.response.data });
                }
            }
        }
    }, []);
    const responseGoogleFail: () => void = () => {
        history.push('/');
    };
    return (
        <AuthOverlay
            title={title}
            type="login"
            setType={setType}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            backgroundClicked={() => {
                if (!loading['AUTH/login']) {
                    backgroundClicked();
                }
            }}
            loading={loading['AUTH/login']}
            responseGoogle={responseGoogle}
            responseGoogleFail={responseGoogleFail}
        />
    );
};
LoginOverlayContainer.defaultProps = {
    title: (type: string) => type.toUpperCase(),
};
export default withRouter(LoginOverlayContainer);
