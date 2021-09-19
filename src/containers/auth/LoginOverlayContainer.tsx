import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';
import { userAction } from '../../redux/user/user';
import AuthOverlay from '../../components/auth/AuthOverlay';

interface fromReducerType{
    form: LOGIN
    User: USER|null
    Auth?: authRouter.authSuccessResponse|null
    AuthError?: authModule.authFailureResponse|null
}
interface props extends RouteComponentProps{
    backgroundClicked: () => void
    title?: (type: string) => string
}

const LoginOverlayContainer: React.FC<props> = ({ history, backgroundClicked, title }: props) => {
    const { changeField, intializeForm, login }: authModule.ActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const [authType, setAuthType]: ['login'|'signup', React.Dispatch<React.SetStateAction<'login'|'signup'>>] = useState<'login'|'signup'>('login');
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, User,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        form: state.authReducer.login,
        User: state.userReducer.user,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
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
        if (User) {
            console.log(User);
            try {
                localStorage.setItem('user', JSON.stringify(User));
                backgroundClicked();
            }
            catch (err) {
                console.log('local storage not working');
            }
        }
    }, [history, User, backgroundClicked]);
    const setType: () => void = () => {
        if (authType === 'login') {
            setAuthType('signup');
        }
        else setAuthType('login');
    };
    return (
        <AuthOverlay
            title={title}
            type={authType}
            setType={setType}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            backgroundClicked={backgroundClicked}
        />
    );
};
LoginOverlayContainer.defaultProps = {
    title: (type: string) => type.toUpperCase(),
};
export default withRouter(LoginOverlayContainer);
