import React, { useEffect, useState } from 'react';
import { AnyAction, CombinedState } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import {
    responseSuccessType, responseFailureType, authStateType, authActionType,
} from '../../modules/auth/authType';
import { userStateType, userType } from '../../modules/user/userType';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { loadingStateType } from '../../modules/loading/loadingType';
import { videoStateType } from '../../modules/Video/videoType';
import { loginProp } from '../../lib/api/auth';
import { authAction } from '../../modules/auth/auth';
import { userAction } from '../../modules/user/user';

interface fromReducerType{
    form: loginProp
    User: userType|null
    Auth?: responseSuccessType|null
    AuthError?: responseFailureType|null
}
interface props{
    history: RouteComponentProps['history'],
}

const LoginForm: React.FC<props> = ({ history }: props) => {
    const { changeField, intializeForm, login }: authActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, User,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        form: state.authReducer.login,
        User: state.userReducer.user,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
    }));

    const onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, password }: {userId: string, password: string} = form;
        dispatch(login({
            userId,
            password,
        }));
    };
    useEffect(() => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);
    useEffect(() => {
        if (AuthError) {
            if (AuthError.info) setError(AuthError.info);
            else setError(AuthError.error.message);
        }
        if (Auth) {
            dispatch(userAction.setUser({ userId: form.userId }));
        }
    }, [Auth, AuthError, dispatch, form.userId]);
    useEffect(() => {
        if (User) {
            history.push('/');
            try {
                sessionStorage.setItem('user', JSON.stringify(User));
            }
            catch (err) {
                console.log('local session not working');
            }
        }
    }, [history, User]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
